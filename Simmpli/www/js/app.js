// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('login',{
            url : '/login',
            templateUrl : 'templates/login.html',
            controller : 'loginController as loginCtrl'
        })

        .state('app',{
            url : '/app',
            templateUrl : 'templates/top_menu.html',
            controller : 'appController  as appCtrl'
        })

        .state('app.work_report',{
            url : '/WorkReport',
            views : {
                'menuContent' : {
                    templateUrl : 'templates/work_report.html',
                    controller : 'workReportController as wrCtrl'
                }
            }
        })

        .state('app.temp',{
            url : '/temp',
            views : {
                'menuContent' : {
                    templateUrl : 'templates/temp.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');
})

.controller('appController',function($window, $state){
    var appCtrl = this;

    appCtrl.logout = function(){
        $window.localStorage.clear();
        $state.go('login');
    };
})

.controller('loginController', function($state, $window){
    var loginCtrl = this;

    loginCtrl.check_login = function(){
        if ($window.localStorage.user)
        {
            $state.go('app');
        }
    };

    loginCtrl.login = function(){
        if (loginCtrl.username == 'asd' && loginCtrl.password == 'asd'){
            loginCtrl.login_status = 'Login Successful!';
            $window.localStorage.user = loginCtrl.username;
            $state.go('app');
            loginCtrl.login_status = '';
        }
        else{
            loginCtrl.login_status = 'Invalid Username or Password !';
        }
    };
})

.controller('workReportController', function($state, $window){
    var wrCtrl = this;

    wrCtrl.tw_forms = [{id:0, story_name:'', time:'', brief:''}];

    wrCtrl.add_tw_form = function(){
        wrCtrl.tw_forms.push({id:wrCtrl.tw_forms[wrCtrl.tw_forms.length-1].id+1, story_name:'', time:'', brief:''});
    };

    wrCtrl.submit_work_report = function(){
        console.log(wrCtrl.title);
        console.log(wrCtrl.tw_forms);
    };
});