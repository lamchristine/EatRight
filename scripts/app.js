angular
  .module('EatRight', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];
function config ($routeProvider, $locationProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'views/templates/EatRight.html',
    controllerAs: 'EatRightIndexCtrl',
    controller: 'EatRightIndexController'
  });
}
