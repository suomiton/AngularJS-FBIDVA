(function(angular) {
    
    var app = angular.module('business-id-validation', []);

    app.directive('businessId', [function() {

        var regex = \d{7}-\d{1},
            multipliers = [7, 9, 10, 5, 8, 4, 2];

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                if(regex.test(viewValue)) {

                    var sum = 0;
                    for(var i = 0; i < 7; i++) {
                        var number = viewValue[i];
                        sum += number*multipliers[i];
                    }

                    sum %= 11;

                    if(sum === viewValue[viewValue.length-1]) {
                        ctrl.$setValidity('businessId', true);
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