configRoutes.$inject = ['$routeProvider', '$locationProvider'];
function configRoutes ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'templates/index.html',
      controllerAs: 'homeIndexCtrl',
      controller: 'HomeIndexController'
    })
    .when('/search', {
      templateUrl: 'templates/modals/foods-index.template.html',
      controllerAs: 'foodsIndexCtrl',
      controller: 'FoodsIndexController'
    })
    .when('/signup', {
      templateUrl: 'templates/user/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/login', {
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/logout', {
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/profile', {
      templateUrl: 'templates/user/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    // .when('/meals/:id', {
    //   templateUrl: 'templates/user/profile.html',
    //   controller: 'ProfileController',
    //   controllerAs: 'profileCtrl',
    //   // resolve: {
    //   //   loginRequired: loginRequired
    //   // }
    // })
    .otherwise({
        redirectTo: '/'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });

  //BEFORE ACTION -- like middleware
  function skipIfLoggedIn($location, $auth) {
    if ($auth.isAuthenticated()) {
      $location.path('/');
    }
  }

  function loginRequired($location, $auth) { //if user is not authenticated
    if (!$auth.isAuthenticated()) {
      $location.path('/login');
    }
  }
}
