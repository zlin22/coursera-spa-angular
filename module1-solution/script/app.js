(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope', '$filter'];

    function LunchCheckController($scope, $filter) {
        $scope.foods = '';
        $scope.message = '';

        $scope.check = function () {
            if ($scope.foods == '') {
                $scope.message = "Please enter data first"
            } else {
                var arrayOfFoods = $scope.foods.split(",");
                console.log(arrayOfFoods);
                if (arrayOfFoods.length <= 3) {
                    $scope.message = 'Enjoy!'
                } else {
                    $scope.message = 'Too much!'
                }
            }
        };

        $scope.upper = function () {
            $scope.name = $filter('uppercase')($scope.name);
        };
    };
})();
