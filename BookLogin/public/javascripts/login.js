/*global angular*/
angular.module('booklistlogin', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {

            //var registered = false;
            //var loggedIn;
            
            var tempUser;
            var tempPass;

            $scope.attemptLogin = function() {
                if ($scope.username === '' || $scope.password === '') {
                    console.log("Login error.");
                    return;
                }

                console.log("Attempting to login: " + $scope.username);

                $scope.login({
                    username: $scope.username,
                    password: $scope.password,
                });
                
                $scope.password = "";
            };

            $scope.login = function(user) {
                console.log("Login Function Called.");
                var url = '/users?un=' + user.username + "&pr=" + user.password;
                
                
                return $http.get(url).success(function(data) {
                    console.log("Login Successful.");
                    
                    $scope.loginDelay();
                    return true;
                }).error(function(data) {
                    console.log("Login Failed.");
                    $scope.error = "Login unsuccessful.";
                    return true;
                });
            };

            $scope.loginDelay = function() {
                //if (loggedIn) {
                    $scope.error = "Login successful.";
                    var date = new Date();
                    date.setTime(date.getTime() + (600 * 1000));
                    document.cookie = ("username=" + $scope.username + "; expires=" + date.toUTCString() + "; path=/;");
                    window.location = "booklist.html?q=adever";
                //}

            };


            $scope.attemptRegister = function() {
                if ($scope.usernameRegister === "" || $scope.passwordRegister === "") {
                    console.log("Register Error");
                    return;
                }

                console.log("Attempting to register " + $scope.usernameRegister);

                tempUser = $scope.username;
                tempPass = $scope.password;

                $scope.username = $scope.usernameRegister;
                $scope.password = $scope.passwordRegister;

                $scope.register({
                    username: $scope.usernameRegister,
                    password: $scope.passwordRegister,
                })

                

            };

            $scope.register = function(user) {
                console.log("Register Function Called.");
                return $http.post('/users', user).success(function(data) {
                    console.log("Register Function Successful.");
                    $scope.registerDelay;
                    return true;
                }).error(function(data) {
                    console.log("Register Function Failed.");
                    $scope.error = "Register unsuccessful.";
                    $scope.reset;
                    return false;
                });
            };
            
            $scope.registerDelay = function() {
                //if (registered) {
                    $scope.error = "Register successful.  Logining in.";

                    console.log("Register Successful.");
                    $scope.attemptLogin();

                //}

                $scope.reset();
            }
            
            $scope.reset = function() {
                $scope.username = tempUser;
                $scope.password = tempPass;
                tempUser = "";
                tempPass = "";
            }


            $scope.init = function() {
                $scope.username = "";
                $scope.password = "";
                $scope.usernameRegister = "";
                $scope.passwordRegister = "";
            };

            $scope.deleteAll = function() {
                $http.delete('/users?authority=' + $scope.devPW).success(function(data) {
                    console.log("Delete Database Function Successful.");
                    return true;
                });
            }

        }


    ]);
