angular
  .module('EatRight')
  .controller('FoodsIndexController', FoodsIndexController);

  // var endpoint = "https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=285dc9c7&appKey=ecd9dbdbeb3528353f71335e422e8653";
  // var endpoint = "https://api.nutritionix.com/v1_1/search";

FoodsIndexController.$inject = ['FoodService'];
function FoodsIndexController (FoodService) {
  var vm = this;
  //exports
  vm.foodList = [];
  vm.helloWorld = 'hello world';
  vm.search = search;
  vm.searchTerm = "";

  //initialization
  console.log(vm.helloWorld);

  //implementations
  function search() {
    console.log('search called');
    console.log("Search term = ", vm.searchTerm);
    FoodService.query(vm.searchTerm).then(function (foods) {
      console.log('foods from the controller', foods);
      vm.foodList = foods;
    });
  }

  function clear() {
      vm.foodList = "";
    }
  

}
