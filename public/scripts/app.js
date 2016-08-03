angular
  .module('EatRight', [
    'ngRoute',
    'satellizer'
  ])
  .controller('MainController', MainController)
  .controller('FoodsIndexController', FoodsIndexController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .service('UserService', UserService)
  .service('FoodService', FoodService)
  .config(configRoutes);
