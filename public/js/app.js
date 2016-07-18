/* Main App Module */
//'use strict';
var app = angular.module("hifivApp", [
        'ngRoute',
        'MainController',
        'ProductController']);
app.config(function ($routeProvider) {
        $routeProvider
            .when('/products', {
                templateUrl: 'views/products/products.html',
                controller: 'ProductController',
                controllerAs: 'productCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login/login.ejs',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/login/signup.ejs',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            })
    });
  /*  .controller('ProductControllers', function ($scope) {
        $scope.title = ["userA", "userB", "userC"];
    })
    .controller('MainControllers', function ($scope) {
        $scope.title = ["userA", "userB", "userC"];
    });*/

/*            .controller('productsController', function($scope, $http){
 $http.get = ('ResourceServer/items.json')
 .then(function(response){
 $scope.products = response.data;
 })*/

/*        app.run(function ($rootScope){
 $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
 var requireLogin = toState.data.requireLogin;

 if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
 event.preventDefault();
 //show a login-in module
 }
 });
 });*/

/*.run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ( $rootScope.loggedUser == null ) {
            // no logged user, we should be going to #login
            if ( next.templateUrl == "/views/index.html" ) {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path( "/views/login" );
            }
        }
    });
});*/
