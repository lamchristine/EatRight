FoodService.$inject = ['$http', '$q'];
function FoodService($http, $q) {
  var vm = this;
  this.query = query;

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
}
