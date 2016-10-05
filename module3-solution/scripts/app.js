(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
              items: '<',
              onRemove: '&'
            }
        };

        return ddo;

    };

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var foundList = this;

        foundList.searchTerm = '';
        foundList.found = '';
        foundList.nothingFound = false;

        foundList.narrowItDownForMe = function() {
            MenuSearchService.getMatchedMenuItems(foundList.searchTerm).then(
                function(result) {
                    if (result.length > 0 && foundList.searchTerm.length > 0) {
                        foundList.found = result;
                        foundList.nothingFound = false;
                        // console.log(list.found)
                    } else {
                        foundList.found = '';
                        foundList.nothingFound = true;
                    }
                }
            )
        };

        foundList.removeItem = function(itemIndex) {
            foundList.found.splice(itemIndex, 1);
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
