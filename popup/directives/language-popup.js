(function(window, angular) {
    'use strict';
    var app = angular.module('basicApp');
    var available_language = [];
    app.directive('languagePopup', function($rootScope, $timeout, $translate, growl) {
        return {
            templateUrl: 'views/language-popup.html',
            link: function (scope, element) {
                scope.languages = languages.filter(checkAvailable);
                function checkAvailable(lang) {
                    return translations.hasOwnProperty(lang.code);
                }
                
                $timeout(function() {
                    var options = {
                        data: scope.languages,
                        getValue: "name",
                        list: {
                            match: {
                                enabled: true
                            },
                            maxNumberOfElements: 11,
                            onClickEvent: function(e) {
                                var language = $("#languages-flags").getSelectedItemData();
                                checkLanguage(language);
                            }
                        },
                        template: {
                            type: "custom",
                            method: function (value, item) {
                                return "<span class='flag customClick flag-" + (item.code).toLowerCase() + "' name='"+item.name+"'  style='background-image: url(../../flags/32/"+(item.code).toLowerCase()+".png)'></span>" + value;
                            }
                        },
                        theme: "round"
                    };

                    $("#languages-flags").easyAutocomplete(options);
                    $(".protected_footGlobalIcon").click(function(){
                        $(".easy-autocomplete-container ul li").css('display','block');
                    });

                    scope.changeLang = function (language) {
                        checkLanguage(language);
                    };

                    $(".flagHolder").bind("keyup change", function(e) {
                        $(".languageText").hide();
                    });
                    function checkLanguage(language) {
                        $(".loaderOut").fadeIn();
                        setTimeout(function() {
                            $(".loaderOut").fadeOut();
                            $(".lenguage_select_popOpen").removeClass("open_popup");
                        }, 2000);
                        if(!translations.hasOwnProperty(language.code)){
                            growl.error( 'Language not available', {});
                            return false;
                        }
                        setLanguage(language);
                    }
                    function setLanguage(language) {
                        if($rootScope.current_language !== undefined ){
                            if($rootScope.current_language.name !== language.name){
                                $rootScope.current_language = language;
                                $translate.use(language.code);
                                SDK.setLanguage(language)
                            }
                        }else{
                            $rootScope.current_language = language;
                            $translate.use(language.code);
                            SDK.setLanguage(language)
                        }
                    }
                })
            }
        };
    });

})(window, window.angular);