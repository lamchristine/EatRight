FoodsIndexController.$inject = ['FoodService', 'MealService', '$location', '$scope', 'type', '$uibModalInstance', 'date', 'meal'];
function FoodsIndexController (FoodService, MealService, $location, $scope, type, $uibModalInstance, date, meal) {
  var vm = this;
  //exports
  // vm.foodList = [];
  vm.helloWorld = 'hello world';
  // vm.search = search;
  // vm.searchTerm = "";
  // vm.add = add;
  $scope.numberOfPages = numberOfPages;
  $scope.type = type;
  $scope.meal = meal;


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
  console.log(date)
  // console.log($routeParams)

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
    if ($scope.meal === null) {
      console.log('creating meal, and food');
      createMeal(food);
    } else {
      console.log('creating food');
      createFood(food);
    }
  };

  function createMeal(food) {
    MealService.create({
      date: date
    })
    .then(function(data) {
      console.log('TRYING TO ADD MEAL', data);
      createFood(food);
    });
  }

  function createFood(food) {
    FoodService.create({
      date: date,
      type: $scope.type,
      item_name: food.fields.item_name,
      brand_name: food.fields.brand_name,
      calories: food.fields.nf_calories,
      total_fat: food.fields.nf_total_fat,
      serving_size_qty: food.fields.nf_serving_size_qty,
      serving_size_unit: food.fields.nf_serving_size_unit,
      serving_weight_grams: food.fields.nf_serving_weight_grams,
      calories_from_fat: food.fields.nf_calories_from_fat,
      protein: food.fields.nf_protein,
      carb: food.fields.nf_total_carbohydrate,
      fiber: food.fields.nf_dietary_fiber,
      sat_fat: food.fields.nf_saturated_fat,
      mono_fat: food.fields.nf_monounsaturated_fat,
      poly_fat: food.fields.nf_polyunsaturatd_fat,
      trans_fat: food.fields.nf_trans_fatty_acid
    })
    .then(function(data) {
      console.log('adding food to db', data.data);
      vm.food = data.data;
      $uibModalInstance.close(vm.food);
    });
  }
}
