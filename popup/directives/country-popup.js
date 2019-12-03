(function(window, angular) {
    'use strict';
    var app = angular.module('basicApp');
    app.directive('countryPopup', function($rootScope, $timeout, growl) {
        return {
            templateUrl: 'views/country-popup.html',
            link: function (scope, element) {
                scope.countries = countries;
                $timeout(function() {
                    var options = {
                        data: scope.countries,
                        getValue: "name",
                        list: {
                            match: {
                                enabled: true
                            },
                            maxNumberOfElements: 11,
                            onClickEvent: function(e) {
                                var country = $("#countries-flags").getSelectedItemData();
                                checkCountry(country);
                            }
                        },
                        template: {
                            type: "custom",

                            method: function (value, item) {
                                return "<span class='flag customClick flag-" + (item.code).toLowerCase() + "'  style='background-image: url(../../flags/32/"+(item.code).toLowerCase()+".png)'></span>" + value;
                            }
                        },
                        theme: "round"

                    };

                    element.find('#countries-flags').easyAutocomplete(options).bind('focus', function () {
                        element.find('#countries-flags').trigger('click')
                    });
                    element.find(".focus").bind("keyup change", function (e) {
                        $(".manuallFlags").hide();
                    });

                    scope.changeCountry = function (country) {
                        checkCountry(country);
                    };

                    function checkCountry(country) {

                        $(".loaderOut").fadeIn();
                        SDK.getProxy(country, function (err, data) {
                            $(".loaderOut").fadeOut();
                            $(".country_select_popOpen").removeClass("open_popup");
                            console.log(data)
                            if(err){
                                console.log(err)
                            }else{
                                if(data.status === 'success'){
                                    SDK.addProxy(data.proxy);
                                }else{
                                    switch (data.error_code){
                                        case 1:
                                            growl.error( data.message, {});
                                            break;
                                        case 2:
                                            scope.vpn_tooltip_error = data.message;
                                            scope.$apply();
                                            errorReset();
                                            break;
                                    }
                                }
                            }
                        });

                    }

                    function errorReset() {
                        setTimeout(function () {
                            scope.vpn_tooltip_error = null;
                            scope.$apply();
                        },5000)
                    }
                })

            }

        };
    });

})(window, window.angular);