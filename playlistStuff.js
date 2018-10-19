angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('track', trackDirective)
  .directive('playlist',playlistDirective);

function mainCtrl ($scope) {
  
  
  $scope.tracks = [];
  
  $scope.playlists = [];
  
  $scope.addNew = function (data) {
    
    $scope.tracks.push({ 
      name: data.name,
      trackUrl: data.url,
      genre: data.genre
    }); 
   
    data.name = ''; 
    data.url = ''; 
    data.email = '';
  };
  
  
  $scope.addNewPlaylist = function (data) {
    
    $scope.playlists.push({ 
      name: data.name,
      songs: $scope.tracks.slice()
    }); 
   
    data.name = ''; 
    
    $scope.tracks = [];
    
  };
  
}



function trackDirective ($compile) {
  return {
    scope: {
      data: '=' 
    },
    restrict: 'EA', 
    replace: 'true',
    template: (
      '<div class="Track">' +
        '<img ng-src="{{data.trackUrl}}" />' +
        '<h4>{{data.name}}</h4>' +
        '<p2>{{data.genre}}</h3>'+
      '</div>'
    ), 
    link: link
  };
  
  function link (scope) { 
    if (!scope.data.trackUrl) {
      scope.data.trackUrl = 'https://images.shulcloud.com/719/uploads/Icons/song.png';
    }
    if (!scope.data.name) {
      scope.data.name = 'No Name';
    }
    if (!scope.data.genre) {
      scope.data.genre = '';
    }
  }

}

function playlistDirective ($compile) {
  return {
    scope: {
      data: '=' 
    },
    restrict: 'E', 
    replace: 'true',
    template: (
      '<div class="Playlist">' +
        '<h4>{{data.name}}</h4>' +
        
        '<ul class="Track-List">'+
        '<li ng-repeat="trac in data.songs">'+
        '<track data="trac" />' +
        '</li>'+
        '</ul>'+
        
        
      '</div>'
    ), 
    link: function(scope,element){
      
      scope.songss = [];
      if (!scope.data.songs) {
        scope.data.songs = [];
      }
      if (!scope.data.name) {
         scope.data.name = 'No Name';
      }
      
      $compile(element.contents())(scope);
    }
    
  };
  
  

}

