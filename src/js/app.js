function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

function dir(obj) {
  console.dir(obj);
}
window.dir = console.dir.bind(console);

var app = angular.module('myApp', []);

app.factory('wikiService', function ($http) {
  return {
    getWiki: function (arg) {
      return $http.jsonp('https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=opensearch&search=' + arg + '&format=json');
    }
  };
});






app.controller('myController', function ($scope, wikiService) {

  $scope.loadWiki = function (searchWord) {
    return wikiService.getWiki(searchWord)
      .then(function (wikiResponse) {
        var newArr1 = wikiResponse.data.slice(1);
        echo(newArr1);
        var newArr2 = [];
        var i, j;
        for (i = 0; i < newArr1.length; i++) {
          for (j = 0; j < newArr1[i].length; j++) {
            if (newArr2[j] === undefined) {
              newArr2[j] = new Array();
            }
            newArr2[j].push(newArr1[i][j]);
          }
        }
        echo(newArr2);
      $scope.wikiData = newArr2;
        // no return because nothing else will be chained to this function
      });
  };

  $scope.inputString = 'Sydney';

  $scope.wikiData = null;




});