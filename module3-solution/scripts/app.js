(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'found-items.html'
        };

        return ddo;

    };

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var list = this;

        list.searchTerm = '';
        list.found = '';
        list.nothingFound = false;

        list.narrowItDownForMe = function() {
            MenuSearchService.getMatchedMenuItems(list.searchTerm).then(
                function(result) {
                    if (result.length > 0 && list.searchTerm.length > 0) {
                        list.found = result;
                        list.nothingFound = false;
                        // console.log(list.found)
                    } else {
                        list.found = '';
                        list.nothingFound = true;
                    }
                }
            )
        };

        list.removeItem = function (itemIndex) {
          list.found.splice(itemIndex, 1);
        };
    };

    MenuSearchService.$inject = ['$http']

    function MenuSearchService($http) {
        var service = this;

        this.getMatchedMenuItems = function(searchTerm) {
            var foundItems = [];

            var response = $http({
                method: 'GET',
                url: 'http://davids-restaurant.herokuapp.com/menu_items.json'
            }).then(function(result) {
                for (var i = 0; i < result.data.menu_items.length; i++) {
                    if (result.data.menu_items[i].description.indexOf(searchTerm) >= 0) {
                        foundItems.push(result.data.menu_items[i]);
                        // console.log(result.data.menu_items[i]);
                    };
                };
                // console.log(foundItems);
                return foundItems;
            });

            return response;
        };


    };


})();
