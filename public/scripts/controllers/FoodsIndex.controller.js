FoodsIndexController.$inject = ['FoodService'];
function FoodsIndexController (FoodService) {
  var vm = this;
  //exports
  vm.foodList = [];
  vm.helloWorld = 'hello world';
  vm.search = search;
  vm.searchTerm = "";
  vm.add = add;

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

  function add (food) {
    console.log("add food clicked", food);
    var item_name = food.fields.item_name;
    var brand_name = food.fields.brand_name;
    var calories = food.fields.nf_calories;
    var fat = food.fields.nf_total_fat;
    console.log('item_name', item_name);
    FoodService.create({
      item_name: item_name,
      brand_name: brand_name,
      calories: calories,
      fat: fat
    })
      .then(function(data) {
      console.log('adding food to db', data);
      vm.food = data;
    });
  }
}
