angular
  .module('EatRight', [
    'ngRoute',
    'satellizer',
    'ui.bootstrap'
  ])
  .controller('MainController', MainController)
  .controller('FoodsIndexController', FoodsIndexController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .controller('HomeIndexController', HomeIndexController)
  .service('UserService', UserService)
  .service('FoodService', FoodService)
  .config(configRoutes)
  .filter('startFrom', function(){
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  });
