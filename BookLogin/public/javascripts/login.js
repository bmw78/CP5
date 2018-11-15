/*global angular*/
angular.module('booklistlogin', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {


            $scope.attemptLogin = function() {
                if ($scope.username === '' || $scope.password === '') {
                    console.log("Login error.");
                    return;
                }

                console.log("Attempting to login: " + $scope.username);

                if ($scope.login({
                        username: $scope.username,
                        password: $scope.password,
                    })) {
                    $scope.error = "Login successful.";
                    var date = new Date();
                    date.setTime(date.getTime() + (600 * 1000));
                    document.cookie = ("username=" + $scope.username + "; expires=" + date.toUTCString() + "; path=/;");
                    //window.location = "booklist.html?q=adever";
                }
                else {
                    $scope.error = "Login unsuccessful.";
                }

                $scope.password = "";


            };

            $scope.login = function(user) {
                console.log("Login Function Called.");
                //console.log(user);
                return $http.get('/users', user).success(function(data) {
                    console.log("Login Successful.");
                    console.log(data);
                    return true;
                });
            };

            $scope.attemptRegister = function() {
                if ($scope.usernameRegister === "" || $scope.passwordRegister === "") {
                    console.log("Register Error");
                    return;
                }

                console.log("Attempting to register " + $scope.usernameRegister);

                var tempUser = $scope.username;
                var tempPass = $scope.password;

                $scope.username = $scope.usernameRegister;
                $scope.password = $scope.passwordRegister;

                if ($scope.register({
                        username: $scope.usernameRegister,
                        password: $scope.passwordRegister,
                    })) {
                    $scope.error = "Register successful.  Logining in.";

                    console.log("Register Successful.");
                    $scope.attemptLogin();

                }
                else {
                    $scope.error = "Register unsuccessful.";
                }

                $scope.username = tempUser;
                $scope.password = tempPass;

            };

            $scope.register = function(user) {
                console.log("Register Function Called.");
                return $http.post('/users', user).success(function(data) {
                    console.log("Register Function Successful.");
                    return true;
                });
            };


            $scope.init = function() {
                $scope.username = "";
                $scope.password = "";
                $scope.usernameRegister = "";
                $scope.passwordRegister = "";
            };

        }


    ]);
