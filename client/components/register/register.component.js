/**
 * Created by Jim on 7/12/2016.
 */
angular
    .module('register', [])
    .component('register', {
        templateUrl: "components/register/register.template.html",
        controller: ['$http', '$window', function RegisterController($http, $window) {
            const self = this;

            self.sendRegistration = (uname, pass, email)=> {
                console.log("try to register as " + uname + " , " + pass + " , " + email);
                const user = {
                    username: uname,
                    password: pass,
                    email: email,
                    isAuthenticated : false
                }
                $http.post('/api/users',user).then(function(response) {
                    login(user.username, user.password);
                },function(){
                    console.log("ERROR in post users");
                });
            };

            const login = (uname, pass) => {
                console.log("try to login as "+uname+", "+pass);


                const user = {
                    username: uname,
                    password: pass
                }
                $http.post('/api/login',user).then(function(response) {
                    //console.log(response.data);
                    // if(response.data.isAuthenticated){
                    const landingUrl = "http://" + $window.location.host + "/auth";
                    $window.location.href = landingUrl;
                    // }
                    // else{
                    //     console.log("Not authenticated")
                    // }
                },function(){
                    console.log("ERROR in post login");
                });
            };
        }]

});

