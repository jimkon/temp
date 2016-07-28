/**
 * Created by Jim on 7/12/2016.
 */
angular
    .module('logout', [])
    .component('logout', {
        templateUrl: "components/logout/logout.template.html",
        controller: ['$window', '$http', function ProfileController($window, $http){
            let self = this;

            $http.get('api/logout').then(function(response) {
                console.log('logged out');
            },function(){
                console.log("ERROR in post login");
            });

            const landingUrl = "http://" + $window.location.host + "/";
            $window.location.href = landingUrl;

        }]
    });
