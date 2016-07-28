/**
 * Created by Jim on 7/12/2016.
 */
angular
    .module('authApp', [ 'profile', 'logout', 'modify', 'ui.router', 'pascalprecht.translate', 'ngCookies'])
    .controller('Ctrl', ['$translate', '$scope', function ($translate, $scope) {

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: "lang/lang-",
            suffix: ".json"
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();

        $urlRouterProvider.otherwise("profile");
		$locationProvider.html5Mode(true);
        //
        // Now set up the states
        $stateProvider
            .state('profile', {
                url: '/profile',
                component: 'profile'
            })
            .state('modify', {
                url: '/modify',
                component: 'modify'
            })
            .state('logout', {
                url: '/logout',
                component: 'logout'
            });
    });
