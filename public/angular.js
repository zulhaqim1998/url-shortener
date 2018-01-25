var app = angular.module('url_shortener', []);

app.controller('MainController', function($scope, $http){
  $scope.input = {};
  $scope.shortUrl = '';

  $scope.getUrl = function(){
    $http.post('/api/shorten', $scope.input)
      .success(function(data){
        $scope.shortUrl = data.shortUrl;
      })
      .error(function(err){
        console.log(err);
      });
  };
});
