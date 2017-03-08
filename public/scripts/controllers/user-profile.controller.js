ProfileController.$inject = ["$location", "UserService", "$http", "$scope", "$uibModal", "$filter"]; // minification protection
function ProfileController ($location, UserService, $http, $scope, $uibModal, $filter) {
  var vm = this;
  vm.new_profile = {}; // form data

  $scope.numberOfPages = numberOfPages;

  $scope.selectedIndex = 0;

  $scope.itemClicked = function($index) {
    $scope.selectedIndex = $index;
  };


  $scope.currentPage = 0;
  $scope.pageSize = 4;


  function numberOfPages() {
    return Math.ceil(vm.user.meals.length/$scope.pageSize);
  }


  vm.updateProfile = function() {
    UserService
      .updateProfile(vm.new_profile)
      .then(function onSuccess() {
        vm.showEditForm = false;
      });
  };

  get();

  function get() {
    $http
      .get('/api/users/' + UserService.user.user_id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response) {
      console.log("response data user1111", response.data.meals);
      vm.user = response.data;
      vm.meals = response.data.meals;

      //on page load, show food list for current date
      var currentDate=$filter("date")(new Date(), 'MM-dd-yyyy');
      // vm.SELECTEDDATE = new Date(currentDate);
      vm.SELECTEDDATE = $filter("date")(currentDate, 'MM-dd-yyyy')
      getFoodList(currentDate);
    }

    function onGetError(response) {
      console.log("Error in getting foods", response);
      $location.path('/profile');
    }
  }



  // addMeal();
  // console.log("addMeal()")
  // var current = new Date().setHours(0,0,0,0);
  // function addMeal (current) {
  //   console.log(current)
  //   $http
  //     .post('/api/users/' + UserService.user.user_id + '/meals')
  //     .then(onGetSuccess, onGetError);
  //
  //   function onGetSuccess(response) {
  //     console.log("response data user", response);
  //   }
  //   function onGetError(response) {
  //     console.log("Error in getting foods", response);
  //     $location.path('/profile');
  //   }
  // }

  vm.addFood=function(type) {
    console.log(vm.SELECTEDDATE)
    console.log(vm.meal)
    var modalInstance = $uibModal.open({
      controller: 'FoodsIndexController',
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './templates/modals/foods-index.template.html',
      windowClass: 'display-food-modal',
      size: 'lg',
      resolve: {
        type: function() {
            return type;
          },
        date: new Date(vm.SELECTEDDATE),
        meal: function() {
            return vm.meal;
          },
      }
    });
      modalInstance.result.then(function (data) {
        console.log(data)
        taco(data)

    });
  };

  function taco(food) {

    $http
      .get('/api/users/' + UserService.user.user_id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response) {
      console.log("response data user1111", response.data.meals);
      vm.user = response.data;
      vm.meals = response.data.meals;

      var date = $filter("date")(food.date, 'MM-dd-yyyy')
      getFoodList(date);
    }

    function onGetError(response) {
      console.log("Error in getting foods", response);
      $location.path('/profile');
    }
  }

  function getFoodList(selectedDate) {
    if(vm.meals.length>0){
      //get meal for selected date
      for (var i = 0; i < vm.meals.length; i++) {
        var mealDate = $filter("date")(vm.meals[i].date, 'MM-dd-yyyy');
        if (mealDate === selectedDate) {
          vm.meal = vm.meals[i];
          console.log('today meal', vm.meal);
          vm.noMeal = false;
          break;
        } else {
          vm.meal=null;
          vm.noMeal = true;
        }
      };

      vm.breakfastArr = [];
      vm.lunchArr = [];
      vm.dinnerArr = [];
      vm.snackArr = [];

      //sort meal by type
      if (vm.noMeal !== true) {
        for (var i = 0; i < vm.meal.foods.length; i++) {
          switch (vm.meal.foods[i].type) {
            case 'breakfast':
              vm.breakfastArr.push(vm.meal.foods[i]);
              break;
            case 'lunch':
              vm.lunchArr.push(vm.meal.foods[i]);
              break;
            case 'dinner':
              vm.dinnerArr.push(vm.meal.foods[i]);
              break;
            case 'snack':
              vm.snackArr.push(vm.meal.foods[i]);
              break;
          }
        }
      }

      //add calories per meal type
      vm.breakfastTotal=0;
      for (var i = 0; i < vm.breakfastArr.length; i++) {
        vm.breakfastTotal+=Math.round(vm.breakfastArr[i].calories);
      }
      vm.lunchTotal=0;
      for (var i = 0; i < vm.lunchArr.length; i++) {
        vm.lunchTotal+=Math.round(vm.lunchArr[i].calories);
      }
      vm.dinnerTotal=0;
      for (var i = 0; i < vm.dinnerArr.length; i++) {
        vm.dinnerTotal+=Math.round(vm.dinnerArr[i].calories);
      }
      vm.snackTotal=0;
      for (var i = 0; i < vm.snackArr.length; i++) {
        vm.snackTotal+=Math.round(vm.snackArr[i].calories);
      }

      //add total calories for the display
      vm.mealTotal=vm.breakfastTotal + vm.lunchTotal + vm.dinnerTotal + vm.snackTotal;

      //calculate calories left
      vm.budgetCalorie = 2230;
      vm.calorieRemaining = vm.budgetCalorie - vm.mealTotal;

    }
  }

  vm.changeDate=function() {
    console.log(vm.SELECTEDDATE);
    var date = $filter("date")(vm.SELECTEDDATE, 'MM-dd-yyyy');
    vm.SELECTEDDATE = $filter("date")(vm.SELECTEDDATE, 'MM-dd-yyyy')
    getFoodList(date);
  };

  vm.showDetail=function (index) {
    console.log(index)
    vm.showDetail[index]=true
  }
}
