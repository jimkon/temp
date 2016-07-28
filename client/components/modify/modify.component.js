/**
 * Created by Jim on 7/8/2016.
 */
angular
    .module('modify', [])
    .component('modify', {
        templateUrl: "components/modify/modify.template.html",
        controller: ['$http', '$window', function ModifyController($http, $window){
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

            self.setProfile = ()=>{
                const new_user = {
                    username: self.profile.username,
                    password: self.profile.password,
                    email:  self.profile.email
                }
                $http.put('/api/profile', new_user).then(function(response) {
                    console.log("valid set profile");
                },function(){
                    const landingUrl = "http://" + $window.location.host + "/";
                    $window.location.href = landingUrl;
                    console.log("ERROR in update user");
                });
                self.goToProfile()

            };

            self.goToProfile = ()=>{
                const landingUrl = "http://" + $window.location.host + "/auth";
                $window.location.href = landingUrl;
            };

        }]
    });
