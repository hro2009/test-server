window.SDK  = chrome.extension.getBackgroundPage();

var app = angular.module("basicApp", ["pascalprecht.translate", "ngSanitize", "ngRoute", "ngMessages", "angular-growl", 'ngAnimate']);
app.config(function($translateProvider, $routeProvider, growlProvider) {

    $translateProvider.translations('en', translations.en);
    $translateProvider.translations('de', translations.de);
    $translateProvider.fallbackLanguage('en');
    if(SDK.current_language === undefined){
        $translateProvider.preferredLanguage('en');
    }else{
        $translateProvider.preferredLanguage(SDK.current_language.code);
    }
    $translateProvider.useSanitizeValueStrategy(null);
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalDisableCountDown(true);
    $routeProvider
        .when("/", {
            templateUrl : "views/index.html"
         })
        .when("/signin", {
            templateUrl : "views/signin.html",
            controller : "signInCtrl",
            restricted : true
        })
        .when("/signup", {
            templateUrl : "views/signup.html",
            controller : "signUpCtrl",
            restricted : true
        })
        .when("/home", {
            templateUrl : "views/home.html",
            controller : "homeCtrl"
        })
        .when("/email-confirm", {
            templateUrl : "views/email-confirm.html"
        })

});
var APP = {};
angular.element(document).ready(function () {
    APP.body = angular.element( document.querySelector( 'body' ) );
    APP.loader = angular.element( document.querySelector( '#loader' ) );
});

var current_social_window_id = null;
var socialResURL = SDK._config.default.baseUrl+'/social/auth/';
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Inject script into chosen tab after it is loaded completely
    if (tab.windowId == current_social_window_id && tab.url.indexOf(socialResURL) > -1 && changeInfo.status == "complete" ) {
        chrome.windows.remove(current_social_window_id, function() { });
        window.location = chrome.extension.getURL("popup/popup.html#!");
    }
});

app.run(function($rootScope, $location, $route) {
    $rootScope.current_language = SDK.current_language;
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var restricted  = next.$$route.restricted;
        if(restricted === true) return;
        SDK.checkStatus(function (err, data) {
            if (data.status === 'success') {
                //User is Authenticated
                $rootScope.userdata  = data.user;
                if(data.user.confirmed === 0){
                     $location.url('/email-confirm');
                }else{
                    if(!$rootScope.ext_disabled && SDK.ext_disabled_log) SDK.onOff(false);
                    $location.url('/home');
                    /*if(SDK.proxy_status){
                        $location.url('/available');
                     }else{
                        $location.url('/unavailable');
                    }*/
                }
            } else {
                //User is not Authenticated
                $location.url('/signin');
            }
            $rootScope.$apply();
            APP.loader.fadeOut();
        });
    });
    chrome.extension.onMessage.addListener(function(message, messageSender, sendResponse) {
        if(message.action === 'proxy change'){
            $rootScope.country_flag = message.data;
            $rootScope.$apply();
            angular.element(document.querySelector( '.country-curr-flag' ) ).attr('src', "../flags/32/"+message.data+".png");
        }
    });
});

/**
 * Controllers
 */

app.controller('globalCtrl', function($scope, $rootScope, $location, $translate) {
    $scope.fbSignIn = function () {
        chrome.windows.create({
            url:  SDK._config.default.apiUrl+"auth/facebook",
            type: "popup"
        }, function(win) {
            current_social_window_id = win.id;
        });
    };
    $scope.twSignIn = function () {
        chrome.windows.create({
            url:   SDK._config.default.apiUrl+"auth/twitter",
            type: "popup"
        }, function(win) {
            current_social_window_id = win.id;
        });
    };
    $scope.ggSignIn = function () {
        chrome.windows.create({
            url:   SDK._config.default.apiUrl+"auth/google",
            type: "popup"
        }, function(win) {
            current_social_window_id = win.id;
        });
    };
    $scope.logout = function () {
        SDK.logout(function (err, data) {
            if(err) console.log(err);
            else {
               // if(!$rootScope.ext_disabled) SDK.onOff(true);
                $rootScope.userdata  = null;
                $location.url('/signin');
                $rootScope.$apply();
            }
        })
    };
    $rootScope.ext_disabled = SDK.ext_disabled;
    $scope.onOff = function () {
        $rootScope.ext_disabled = !$rootScope.ext_disabled;
        SDK.onOff($rootScope.ext_disabled);
    }
});
app.controller('homeCtrl', function($scope, $rootScope, $location, $translate) {
    if(SDK.current_flag){
        $rootScope.country_flag = SDK.current_flag;
        angular.element(document).ready(function () {
            angular.element(document.querySelector( '.country-curr-flag' ) ).attr('src', "../flags/32/"+$rootScope.country_flag+".png");
         })

    }
    $scope.goVpn = function(){
        window.open(SDK._config.default.installUrl);
    };
});

app.controller("unavailableCtrl", function ($scope) {
    $scope.disableExt = function() {
        SDK.disableOtherProxy();
        window.close();
    }
});
app.controller("signInCtrl", function ($scope, $location, $rootScope, growl) {
    $scope.signIn = function (isValid) {
        if(isValid){
            APP.loader.fadeIn();
            SDK.signIn($scope.user, function (err, data) {
                if(err) console.log(err);
                else{
                    if(data.status === 'success'){
                        if(!SDK.ext_disabled) SDK.onOff(false);
                        $rootScope.userdata  = data.user;
                        $location.url('/');
                        $rootScope.$apply();
                    }else if (data.status === 'error'){
                        $scope.errorMessage = data.errorMessage[0];
                        growl.error( $scope.errorMessage, {});
                    }
                    console.log(data);
                }
                APP.loader.fadeOut();
            });
        } else{
            if(SDK.current_language === undefined) {
                $scope.errorMessage = translations['en']['ERROR_INVALID_FIELDS'];
            }else{
                $scope.errorMessage = translations[SDK.current_language.code]['ERROR_INVALID_FIELDS'];
            }
            growl.error( $scope.errorMessage, {});
            angular.forEach($scope.signInForm.$error, function (field) {
                angular.forEach(field, function(errorField){
                    errorField.$setTouched();
                })
            });
        }
    }
});

app.controller("signUpCtrl", function ($scope, $rootScope, $location, growl) {
    $scope.signUp = function(isValid) {
        if (isValid) {
            APP.loader.fadeIn();
            SDK.signUp($scope.user, function (err, data) {
                if(err) console.log(err);
                else{
                    if(data.status === 'success'){
                        if(!SDK.ext_disabled) SDK.onOff(false);
                        $rootScope.userdata  = data.user;
                        $location.url('/email-confirm');
                        $rootScope.$apply();

                    }else if (data.status === 'error'){
                        $scope.errorMessage = data.errorMessage[0];
                        growl.error( $scope.errorMessage, {});
                    }
                }
                APP.loader.fadeOut();
            });
        } else {
            if(SDK.current_language === undefined) {
                $scope.errorMessage = translations['en']['ERROR_INVALID_FIELDS'];
            }else {
                $scope.errorMessage = translations[SDK.current_language.code]['ERROR_INVALID_FIELDS'];
            }
            growl.error( $scope.errorMessage, {});
            angular.forEach($scope.signUpForm.$error, function (field) {
                angular.forEach(field, function(errorField){
                    errorField.$setTouched();
                })
            });
        }
    };
});


/**
 * Directives
 */

app.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
    };
});

