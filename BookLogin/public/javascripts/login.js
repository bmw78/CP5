/*global angular*/
angular.module('booklistlogin', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {

            //var registered = false;
            //var loggedIn;

            var tempUser = "";
            var tempPass = "";

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
                    return false;
                });
            };

            $scope.loginDelay = function() {
                //if (loggedIn) {
                $scope.error = "Login successful.";
                var date = new Date();
                date.setTime(date.getTime() + (600 * 1000));
                document.cookie = ("username=" + $scope.username + "; expires=" + date.toUTCString() + "; path=/;");
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > 200) {
                        break;
                    }
                }
                
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

                console.log(tempUser);

                $scope.register({
                    username: $scope.usernameRegister,
                    password: $scope.passwordRegister,
                });



            };

            $scope.register = function(user) {
                console.log("Register Function Called.");
                return $http.post('/users', user).success(function(data) {
                    console.log("Register Function Successful.");
                    $scope.registerDelay();
                    return true;
                }).error(function(data) {
                    console.log("Register Function Failed.");
                    $scope.error = "Register unsuccessful.";
                    $scope.resetFields();
                    return false;
                });
            };

            $scope.registerDelay = function() {
                $scope.error = "Register successful.  Logining in.";

                console.log("Register Successful.");



                $scope.username = $scope.usernameRegister;
                $scope.password = $scope.passwordRegister;
                $scope.attemptLogin();


                //$scope.resetFields();
            }

            $scope.resetFields = function() {
                $scope.username = tempUser;
                $scope.password = tempPass;
                tempUser = "";
                tempPass = "";

                //console.log($scope.username);
            }


            $scope.init = function() {
                $scope.username = "";
                $scope.password = "";
                $scope.usernameRegister = "";
                $scope.passwordRegister = "";
            };

            $scope.deleteAll = function() {
                $http.delete('/users?authority=' + $scope.devPW).success(function(data) {
                    console.log("Delete User Database Function Successful.");
                    $http.delete('/books').success(function(data) {
                        console.log("Delete Book Database Successful.");
                        return true;
                    }).error(function(data) {
                        console.log("Delete Book Database Failure!");
                        return false;
                    });
                }).error(function(data) {
                    console.log("Delete User Database Function Failure!");
                    return false;
                });
            }

        }


    ]);
