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
  .controller('ProfileController', ProfileController)
  .service('UserService', UserService)
  .service('FoodService', FoodService)
  .config(configRoutes);
