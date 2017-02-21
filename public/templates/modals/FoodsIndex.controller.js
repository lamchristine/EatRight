FoodsIndexController.$inject = ['FoodService', '$location', '$scope', 'type', '$uibModalInstance'];
function FoodsIndexController (FoodService, $location, $scope, type, $uibModalInstance) {
  var vm = this;
  //exports
  // vm.foodList = [];
  vm.helloWorld = 'hello world';
  // vm.search = search;
  // vm.searchTerm = "";
  // vm.add = add;
  $scope.numberOfPages = numberOfPages;
  $scope.type = type;

  $scope.closeModal = function() {
    $uibModalInstance.close();
  }
  $scope.itemClicked = function($index) {
    $scope.selectedIndex = $index;
  };

  $scope.clear = function ($index){
    $scope.selectedIndex = !$index;
  };

  $scope.search=function() {
      console.log('search called');
      console.log("Search term = ", $scope.searchTerm.item);
      FoodService.query($scope.searchTerm).then(function (foods) {
          console.log('foods from the controller', foods);
          $scope.foodList = foods;
          $scope.currentPage = 0;
          $scope.pageSize = 5;
          $scope.items=true;
          numberOfPages()
        });
  }

  $scope.currentPage = 0;
  $scope.pageSize = 5;


  function numberOfPages() {
    return Math.ceil($scope.foodList.length/$scope.pageSize);
  }


  //initialization
  console.log(vm.helloWorld);

  //implementations
  // function search() {
  //   console.log('search called');
  //   console.log("Search term = ", vm.searchTerm);
  //   FoodService.query(vm.searchTerm).then(function (foods) {
  //     console.log('foods from the controller', foods);
  //     vm.foodList = foods;
  //     $scope.currentPage = 0;
  //     $scope.pageSize = 5;
  //   });
  // }

  $scope.add=function (food) {
    console.log("add food clicked", food);
    var type = $scope.type;
    var item_name = food.fields.item_name;
    var brand_name = food.fields.brand_name;
    var calories = food.fields.nf_calories;
    var total_fat = food.fields.nf_total_fat;
    var serving_size_qty = food.fields.nf_serving_size_qty;
    var serving_size_unit = food.fields.nf_serving_size_unit;
    var serving_weight_grams = food.fields.nf_serving_weight_grams;
    var calories_from_fat = food.fields.nf_calories_from_fat;
    var carb = food.fields.nf_total_carbohydrate;
    var protein = food.fields.nf_protein;
    var fiber = food.fields.nf_dietary_fiber;
    var sat_fat = food.fields.nf_saturated_fat;
    var mono_fat = food.fields.nf_monounsaturated_fat;
    var poly_fat = food.fields.nf_polyunsaturatd_fat;
    var trans_fat = food.fields.nf_trans_fatty_acid;
    console.log('item_name', item_name);
    FoodService.create({
      type: type,
      item_name: item_name,
      brand_name: brand_name,
      calories: calories,
      total_fat: total_fat,
      serving_size_qty: serving_size_qty,
      serving_size_unit: serving_size_unit,
      serving_weight_grams: serving_weight_grams,
      calories_from_fat: calories_from_fat,
      protein: protein,
      carb: carb,
      fiber: fiber,
      sat_fat: sat_fat,
      mono_fat: mono_fat,
      poly_fat: poly_fat,
      trans_fat: trans_fat
    })
      .then(function(data) {
      console.log('adding food to db', data);
      vm.food = data;
    });
  }
}
