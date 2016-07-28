/**
 * Created by Jim on 7/8/2016.
 */
angular
    .module('profile', [])
    .component('profile', {
        templateUrl: "components/profile/profile.template.html",
        controller: ['$http', '$window', function ProfileController($http, $window){
            let self = this;
            self.profile = {
                username : '',
                password : '',
                email    : ''
            };


            $http.get('/api/profile').then(function(response) {
                // if()
                //console.log(response.data);
                self.profile.username = response.data.username;
                self.profile.password = response.data.password;
                self.profile.email = response.data.email;
                //console.log("user "+user.username+"  "+user.password+"   "+user.email+"  "+user.isAuthenticated+"  returned");
                //login(user.username, user.password);
            },function(){
                const landingUrl = "http://" + $window.location.host + "/";
                $window.location.href = landingUrl;
                console.log("ERROR in get users");
            });

            const setProfile = function(profile){
                console.log("set profie function");
            }

        }]
    });
