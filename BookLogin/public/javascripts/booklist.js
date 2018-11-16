/*global angular*/
angular.module('book', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.books = [];


            var username = "BOB";

            $scope.init = function() {
                if (window.location == "booklist.html?q=adever") {
                    window.location = "booklist.html";
                }
                username = AccessCookie("username");
                $scope.searchText = username;
                if (username === "" || !VerifyUsername(username)) {
                    //window.location = "login.html";
                }
            };

            function AccessCookie(cname) {
                //console.log("Cookie: " + document.cookie);
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }

            function VerifyUsername(uName) {
                /*return $http.get('/users/' + uName).success(function(data) {
                    console.log("User Found.");
                    return true;
                }).error(function(data) {
                    console.log("User Not Found.");
                    return false;
                });*/
                
                //return false;
                return true;
            }


            $scope.addBook = function() {
               
                if ($scope.formContent == undefined) {return}
                else if($scope.formContent == "") {return}
                else {
                var newbook = { title: $scope.formContent, upvotes: 0, name: username};
                
                $http.post('/books', newbook).success(function(data) {
                    $scope.books.push(data);
                });
                $scope.formContent = '';
                }
            };

            $scope.incrementUpvotes = function(book) {
                // comment.upvotes += 1;
                $http.put('/books/' + book._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        book.upvotes += 1;
                    });
            };

            $scope.delete = function(book) {
                $http.delete('/books/' + book._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };

            $scope.getAll = function() {
                return $http.get('/books').success(function(data) {
                    angular.copy(data, $scope.books);
                });
            };
            $scope.getAll();

        }
    ]);