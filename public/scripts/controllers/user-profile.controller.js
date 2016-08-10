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
      console.log("response data user", response);
      vm.user = response.data;
      var foodArr = response.data.foods;
      var total = 0;
      for (var i=0; i<foodArr.length; i++) {
        total+=foodArr[i].calories;
      }
      vm.totalCalories=total;

      //list all dates between today's date and date joined
      Date.prototype.addDays = function(days) {
        var dat = new Date (this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
      };

      var startDate = new Date(response.data.created);
      var stopDate = new Date();

      function getDates(startDate, stopDate) {
        var dateArr = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
          dateArr.push( currentDate );
          currentDate = currentDate.addDays(1);
        }
        return dateArr;
      }
      var dateArr = getDates(startDate, stopDate);
      vm.dateArr = dateArr;
    }

    function onGetError(response) {
      console.log("Error in getting foods", response);
      $location.path('/profile');
    }
  };
}
