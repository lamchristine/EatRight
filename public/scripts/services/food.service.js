FoodService.$inject = ['$http', '$q', '$location'];
function FoodService($http, $q, $location) {
  var vm = this;
  this.query = query;
  this.create = create;

  function query(searchTerm) {
    console.log("Search term = ", searchTerm);

    var def = $q.defer();

    //retrieving nutritionix data
    $http({
      method: 'POST',
      url: '/',
      data: searchTerm,
    }).then(searchSuccessHandler,
            function(err) {
              console.log('error', err);
              def.reject({error: 'error'});
            }
          );

    return def.promise;

    function searchSuccessHandler(response) {
      console.log('got response', response);
      console.log('search', response.data.hits);
      def.resolve(response.data.hits);
    }
  }

  //adding food item to database
  function create(food) {
    console.log('adding food', food);
    var def = $q.defer();

    $http({
      method: 'POST',
      url: 'api/foods',
      data: food,
    }).then(onAddFoodSuccess,
            function(err) {
            console.log('error', err);
            def.reject({error: 'error'});
            }
          );

    return def.promise;

    function onAddFoodSuccess(response) {
      console.log('food added', response);
      def.resolve(response);
      $location.path('/profile');
    }
  }
}
