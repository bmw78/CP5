angular.module('book', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.books = [];
            
            $scope.addBook = function() {
                var newbook = { title: $scope.formContent, upvotes: 0 };
                $http.post('/books', newbook).success(function(data) {
                    $scope.books.push(data);
                });
                $scope.formContent = '';
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