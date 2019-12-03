var _config = {};

_config.default = {
    application: {
        id: 'basic-ext-id',
        name: 'basic-extension',
        version: chrome.runtime.getManifest().version,
        dotVersion: Number(chrome.runtime.getManifest().version.replace(/\.([0-9]+)$/, '$1')),
        applicationId: chrome.runtime.id
    },
    baseUrl: "http://basicapp.com:8080",
    apiUrl: "http://basicapp.com:8080/1/plain/",
    installUrl: "http://basicapp.com/?install",
    uninstallUrl: "http://basicapp.com/?uninstall"
};


var host_list  = [];
var host_proxy_list  = {};
var curr_status   ;
var current_host;
var current_tab_id;
var current_language;
var current_flag;
var guid ;
var proxy_status = true;
var ext_disabled = true;
var logged_in  = false;
var ext_disabled_log = false;
function showMessage(msg) {
    alert(msg);
}
checkStatus(function (err, data) {
    if(err) console.log(err);
    else{
        if (data.status === 'success') {
            logged_in  = true;
        }else{
            ext_disabled_log = true;
            clearProxy();
            setActionBgColor('#cf2e2e');
            setActionText('off');
            logged_in  = false;
        }
    }

});
function disableOtherProxy() {
    var enableExtention = function enableExtention(id, enable) {
        return new Promise(function (resolve, reject) {
            chrome.management.setEnabled(id, false, function () {
                resolve();
            });
        });
    };

    var retrieveExtensionInfos = function retrieveExtensionInfos() {
        return new Promise(function (resolve, reject) {
            chrome.management.getAll(function (extensionInfos) {
                resolve(extensionInfos);
            });
        });
    };

    retrieveExtensionInfos().then(function (extensionInfos) {
        var extensionsIds = [];
        var currentExtensionId = chrome.runtime.id;

        for (var k in extensionInfos) {
            var extensionInfo = extensionInfos[k];
            if (extensionInfo.id === currentExtensionId) {
                continue;
            }

            if (!extensionInfo.enabled) {
                continue;
            }

            if (extensionInfo.permissions.indexOf('proxy') === -1) {
                continue;
            }

            extensionsIds.push(extensionInfo.id);

        }
        return Promise.all(extensionsIds.map(function (extensionId) {
            return enableExtention(extensionId, false);
        })).then(function () {
            return;
        });
    });
}

chrome.proxy.settings.onChange.addListener(checkConfig);
chrome.proxy.settings.get({'incognito': false},checkConfig);
function checkConfig(config) {
    if(config.levelOfControl === 'controlled_by_other_extensions') {
        changeProxyOther();
    }else if(config.levelOfControl === 'controlled_by_this_extension'){
        changeProxyThis();
    }

}

function changeProxyOther() {
    proxy_status = false;
    chrome.browserAction.setIcon({
        path : "disabled.png"
    });
}
function changeProxyThis() {
    proxy_status = true;
    chrome.browserAction.setIcon({
        path : "16.png"
    });
}

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        chrome.runtime.setUninstallURL(_config.default.uninstallUrl);
        useToken(userid);
    } else {
        userid = uuid4();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }

    function useToken(userid) {
        guid = userid;
        clearProxy();
    }
});
chrome.storage.sync.get('language', function(items) {
    current_language = items.language
});

function setLanguage(language) {
    chrome.storage.sync.set({language: language}, function() {
        current_language = language;
    });
}

function onOff(status) {
    ext_disabled = status;
    if(ext_disabled){
        setActionBgColor('#cf2e2e');
        setActionText('off');
    }
    else{
        ext_disabled_log = false;
        setActionText('');
    }
    changeProxy()
}

function clearProxy() {
    var config = {
        mode: "pac_script",
        pacScript: {
            data: "function FindProxyForURL(url, host) {\n" +
            "  return 'DIRECT';\n" +
            "}"
        }
    };
    chrome.proxy.settings.set(
        {value: config, scope: 'regular'},
        function() {
            if(current_tab_id && host_proxy_list.hasOwnProperty(current_host)) chrome.tabs.reload(current_tab_id);
        });
}
chrome.proxy.onProxyError.addListener(function (details){
    console.log(details);
})
function changeProxy() {
    if(host_proxy_list.length<1) return false;
    if(ext_disabled){
        clearProxy();
        return false;
    }
    console.log(current_host, host_list,host_proxy_list );
    var config = {
        mode: "pac_script",
        pacScript: {
            data: "function FindProxyForURL(url, host) {\n" +
            "var host_proxy_list ="+JSON.stringify(host_proxy_list)+";\n" +
            " if (host_proxy_list.hasOwnProperty(host))\n" +
            "    return  'PROXY '+host_proxy_list[host].IP+':'+host_proxy_list[host].PORT;\n" +
            " return 'DIRECT';\n" +
            "}"
        }
    };
    chrome.proxy.settings.set(
        {value: config, scope: 'regular'},
        function() {
            if(current_tab_id) chrome.tabs.reload(current_tab_id);
        });
}


function addProxy(proxy) {
    if(current_host){
        host_proxy_list[current_host] = proxy;
    }
    changeProxy()
}

function removeProxy() {
    delete  host_proxy_list[current_host];
}
function apiCall() {
    var body = 'guid=' + encodeURIComponent(guid);
    sendRequest('api', body).then(function (result) {
        alert(result)
    }).catch(function (e) {
        console.log(e)
    });
}
function getProxy(country, cb) {
    var body = 'guid=' + encodeURIComponent(guid)+
        '&country_name=' + encodeURIComponent(country.name)+
        '&country_code=' + encodeURIComponent(country.code);
    sendRequest('proxy', body).then(function (result) {
        cb(null,JSON.parse(result))
    }).catch(function (e) {
        cb(e)
    });
}
function checkStatus(cb) {
    var body = 'guid=' + encodeURIComponent(guid);
    sendRequest('status', body).then(function (result) {
        cb(null, JSON.parse(result));
    }).catch(function (e) {
        cb(e)
    });
}

function signIn(data, cb) {
    var body = 'email=' + encodeURIComponent(data.email)+'&password=' + encodeURIComponent(data.password);
    sendRequest('signin', body).then(function (result) {
        cb(null, JSON.parse(result));
    }).catch(function (e) {
        cb(e);
    });
}

function signUp(data, cb) {
    var body = 'email=' + encodeURIComponent(data.email)+'&password=' + encodeURIComponent(data.password);
    sendRequest('signup', body).then(function (result) {
        cb(null, JSON.parse(result));
    }).catch(function (e) {
        cb(e);
    });
}
function logout(cb) {
    var body = 'guid=' + encodeURIComponent(guid);
    sendRequest('logout', body).then(function (result) {
       // if(!ext_disabled){
            ext_disabled_log = true;
           // clearProxy();
            setActionBgColor('#cf2e2e');
            setActionText('off');
       // }
        cb(null, JSON.parse(result));
    }).catch(function (e) {
        cb(e)
    });
}

function sendRequest( urlPrefix, body) {
    var lng = current_language ? current_language.code : 'en';
    body = body +'&lng=' + encodeURIComponent(lng);

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', _config.default.apiUrl + urlPrefix, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // JSON.parse does not evaluate the attacker's scripts.
                //var resp = JSON.parse(xhr.responseText);
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function () {
            reject(xhr.status);
        };
        xhr.send(body);

    })

}


function getHostForURL(url) {
    var l = document.createElement('a');
    l.href = url;
    return l.hostname;
}
function checkInHostList(cb) {
    chrome.tabs.getSelected(null,function(tab) {//get current tab without any selectors
        current_flag = null;
        if(tab.id<1) return false;
        current_host = getHostForURL(tab.url);  //get tab value 'url'
        if(_config.default.apiUrl.indexOf(current_host)>-1) return false;
        current_tab_id  = tab.id;
        curr_status = host_proxy_list.hasOwnProperty(current_host);
        if(!curr_status || ext_disabled  || ext_disabled_log) {
            setActionIcon("16.png");
        }
        else{
            var code = host_proxy_list[current_host].COUNTRY_CODE.toLowerCase();
            current_flag = code;
            chrome.runtime.sendMessage({action: 'proxy change', data: current_flag});
            setActionIcon("flags/16/"+code+".png");

        }
        if(cb) cb(curr_status);
    });
}
function setActionIcon(path) {
    chrome.browserAction.setIcon({
        path : path
    });
}
function setActionText(text) {
    chrome.browserAction.setBadgeText({
        text : text
    });
}
function setActionBgColor(color) {
    chrome.browserAction.setBadgeBackgroundColor({
        color : color
    });
}

// A universally unique identifier (UUID).  RFC4122v4 :
function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
}
chrome.tabs.onSelectionChanged.addListener(function(tabId) {
    console.log(tabId)
    updatedTab();
});
chrome.tabs.onUpdated.addListener(function (tabId,changeInfo, tab){
    console.log(tabId)
    if (changeInfo.status == "complete" ) {
        updatedTab();
    }
});
chrome.windows.onRemoved.addListener(function (winId){
    updatedTab();
})
function updatedTab() {
    chrome.proxy.settings.get({'incognito': false},checkConfig);
    if(proxy_status){
        checkInHostList();
    }
}
