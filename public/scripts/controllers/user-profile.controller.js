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

  get()

  function get() {
    $http
      .get('/api/users/' + UserService.user.user_id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response) {
      console.log("response data", response);
      vm.user = response.data;
      var foodArr = response.data.foods;
      var total = 0;
      for (var i=0; i<foodArr.length; i++) {
        total+=foodArr[i].calories;
      }
      vm.totalCalories=total;
    }

    function onGetError(response) {
      console.log("Error in getting foods", response);
      $location.path('/profile');
    }
  };
}
