(function(angular) {
    
    var app = angular.module('business-id-validation', []);

    app.directive('businessId', [function() {

        var regex = \d{7}-\d{1},
            multipliers = [7, 9, 10, 5, 8, 4, 2];

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                if(viewValue === ''){
                    ctrl.$setValidity('businessId', true);
                    return viewValue;
                }
                
                if(regex.test(viewValue)) {

                    var sum = 0;
                    for(var i = 0; i < 7; i++) {
                        var number = viewValue[i];
                        sum += number*multipliers[i];
                    }

                    sum %= 11;
                    var checkNumber = parseInt(viewValue[viewValue.length-1]);

                    if(sum === 0) {
                        ctrl.$setValidity('businessId', true);
                        return viewValue;

                    } else if(sum !== 1 && checkNumber === (11-sum)) {
                        ctrl.$setValidity('businessId', true);
                        return viewValue;
                    }

                }

                ctrl.$setValidity('businessId', false);
                return undefined;
            });
        }

        return {
            require: 'ngModel',
            link: link
        };
    }]);

})(angular);