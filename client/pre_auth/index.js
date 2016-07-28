/**
 * Created by Jim on 7/6/2016.
 */
angular
    .module( 'preAuthApp', ['login', 'register', 'ui.router', 'pascalprecht.translate', 'ngCookies'])
    .controller('Ctrl', ['$translate', '$scope', function ($translate, $scope) {

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }])
    .config( function( $stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: "lang/lang-",
            suffix: ".json"
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();

        $urlRouterProvider.otherwise("/login");
		$locationProvider.html5Mode(true);
        //
        // Now set up the states
        $stateProvider
            .state('login', {
                url: '/login',
                component: 'login'
            })
            .state('register', {
                url: '/register',
                component: 'register'
            });
    });
    