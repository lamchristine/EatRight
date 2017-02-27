MealService.$inject = ['$http', '$q', '$location', 'UserService', "$routeParams"];
function MealService($http, $q, $location, UserService, $routeParams) {

  this.create = create;
  // console.log($routeParams)
  // console.log(UserService.user)

  // adding meal to database
  function create(meal) {
    // console.log('adding meal', meal);
    // console.log(UserService.user)
    console.log("ASDSFSFSDFSD")
    var def = $q.defer();

    $http({
      method: 'POST',
      url: '/api/meals',
      data: meal
    }).then(onAddMealSuccess,
            function(err) {
            console.log('error', err);
            def.reject({error: 'error'});
            }
          );

    return def.promise;

    function onAddMealSuccess(response) {
      console.log('meal added', response);
      def.resolve(response);
      $location.path('/profile');
    }
    // return def.promise;
    //
    // function onAddMealSuccess(response) {
    //   console.log('meal added', response);
    //   def.resolve(response);
    //   $location.path('/profile');
    // }
    // function onAddMealSuccess(response) {
    //   console.log('meal added', response);
    //   def.resolve(response);
    //   $location.path('/profile');
    // }
  }
}
