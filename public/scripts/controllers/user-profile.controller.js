ProfileController.$inject = ["$location", "UserService", "$http"]; // minification protection
function ProfileController ($location, UserService, $http) {
  var vm = this;
  vm.new_profile = {}; // form data

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
}
