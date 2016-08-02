angular
  .module('EatRight', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];
function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/foods', {
      templateUrl: 'views/templates/foods-index.template.html',
      controllerAs: 'foodsIndexCtrl',
      controller: 'FoodsIndexController'
    })
    .otherwise({
        redirectTo: '/foods'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
}
