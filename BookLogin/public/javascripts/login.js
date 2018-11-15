/*global angular*/
angular.module('booklistlogin', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {


            $scope.attemptLogin = function() {
                if ($scope.username === '') { return; }
                if ($scope.password === "") { return; }
                
                console.log("Attempting to login: " + $scope.username);
                
                if ($scope.login({
                    username: $scope.username,
                    password: $scope.password,
                })) {
                    $scope.error = "Login successful.";
                    var date = new Date();
                    date.setTime(date.getTime() + (600 * 1000));
                    document.cookie = ("username=" + $scope.username + "; expires=" + date.toUTCString() + "; path=/;");
                    window.location = "booklist.html?q=adever";
                }
                else{
                    $scope.error = "Login unsuccessful.";
                }
                
                $scope.password = ""
                
                
            };
            
            $scope.login = function(user) {
                console.log("Login Function Called.");
                return $http.get('/users', user).success(function(data) {
                    console.log("Login Successful.");
                    return true;
                });
            };

           $scope.attemptRegister = function(user) {
               if ($scope.usernameRegister === "" || $scope.passwordRegister === "") {return;}
               
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
                   
                   $scope.$attemptLogin();
                   
               }
               else {
                   $scope.error = "Register unsuccessful.";
               }
               
               $scope.username = tempUser;
               $scope.password = tempPass;
               
           };
           
           $scope.register = function(user) {
               console.log("Register Function Called.");
               return $http.put('/users', user).success(function(data) {
                   console.log("Register Successful.");
                   return true;
               });
           };

            

        }


    ]);
