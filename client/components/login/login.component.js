/**
 * Created by Jim on 7/7/2016.
 */

angular
    .module('login', [])
    .component('login', {
        templateUrl: "components/login/login.template.html",
        controller: ['$http', '$window', function LoginController($http, $window){
            const self = this;


            self.loginMessage = '';

            const checkLoginStats = (uname, pass)=>{

                return true;
            };

            self.login = (uname, pass) => {
                console.log("try to login as "+uname+", "+pass);

                if(checkLoginStats(uname, pass)){
                    console.log("valid uname and pass");
                }
                else{
                    return;
                }
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
                    self.loginMessage = 'Success';
                },function(){
                    self.loginMessage = 'Wrong stats';
                    console.log("ERROR in post login");
                });
            };


        }]


    });

