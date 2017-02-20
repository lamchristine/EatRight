// FoodsIndexController.$inject = ['FoodService'];
// function FoodsIndexController (FoodService) {
//   var vm = this;
//   //exports
//   vm.foodList = [];
//   vm.helloWorld = 'hello world';
//   vm.search = search;
//   vm.searchTerm = {};
//
//   //initialization
//   console.log(vm.helloWorld);
//
//   //implementations
//   function search() {
//     console.log('search called.....');
//     console.log("Search term = ", vm.searchTerm);
//     FoodService.query(vm.searchTerm).then(function (foods) {
//       console.log('foods from the controller', foods);
//       vm.foodList = foods;
//     });
//   }
// }
