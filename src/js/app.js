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

  var loadWiki = function (searchWord) {
    return wikiService.getWiki(searchWord)
      .then(function (wikiResponse) {
        echo(wikiResponse);
        $scope.wikiResponse = wikiResponse;
        // no return because nothing else will be chained to this function
      });
  };

  $scope.wikiResponse = null;

  loadWiki('Dan');

});