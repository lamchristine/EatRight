angular
  .module('EatRight')
  .service('FoodService', FoodService);

FoodService.$inject = ['$http', '$q'];
function FoodService($http, $q) {
  this.query = query;

  function query(searchTerm) {
    console.log("Search term = ", searchTerm);
    var url = "https://api.nutritionix.com/v1_1/search/" + searchTerm + "?results=0:20&fields=item_name,brand_name,item_id,images_front_full_url,nf_calories,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_sodium,nf_cholesterol,nf_saturated_fat,nf_total_fat&appId=285dc9c7&appKey=ecd9dbdbeb3528353f71335e422e8653";
    console.log('url = ', url);

    var def = $q.defer();

    $http({
      method: 'GET',
      url: url
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
