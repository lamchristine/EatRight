ProfileController.$inject = ["$location", "UserService", "$http", "$scope", "$uibModal"]; // minification protection
function ProfileController ($location, UserService, $http, $scope, $uibModal) {
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
      // vm.last = response.data.meals[response.data.meals.length-1]
    }

    function onGetError(response) {
      console.log("Error in getting foods", response);
      $location.path('/profile');
    }
  }

  addMeal();
  console.log("addMeal()")
  var current = new Date().setHours(0,0,0,0);
  function addMeal (current) {
    $http
      .post('/api/users/' + UserService.user.user_id + '/meals')
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response) {
      console.log("response data user", response);
    }
    function onGetError(response) {
      console.log("Error in getting foods", response);
      $location.path('/profile');
    }
  }

  vm.addFood=function(type) {
    console.log("foodtype:", type)
    var modalInstance = $uibModal.open({
      controller: 'FoodsIndexController',
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './templates/modals/foods-index.template.html',
      windowClass: 'display-food-modal',
      size: 'lg',
      resolve: {
        type: function() {
            return type
          }
      }
    });
  }
}
