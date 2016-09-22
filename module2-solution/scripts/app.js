(function() {
    'use strict;'

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService']

    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.toBuyItems;

        toBuyList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
            // console.log("bought")
        };

    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.boughtItems;

    };

    function ShoppingListCheckOffService() {
        var service = this;

        service.toBuyItems = [{
            name: "cookies",
            quantity: 10
        }, {
            name: "milk",
            quantity: 5
        }, {
            name: "chips",
            quantity: 3
        }, {
            name: "water",
            quantity: 15
        }, {
            name: "seltzer",
            quantity: 100
        }];

        service.boughtItems = [];

        service.buyItem = function(itemIndex) {
            var boughtItem = service.toBuyItems.splice(itemIndex, 1);
            service.boughtItems.push(boughtItem[0]);
            // console.log(service.boughtItems);
        }

    };

})();
