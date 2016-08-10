app.controller('mainController', function($scope, $http, $mdDialog){
	$scope.title= 'Ego Eimi';
		$http.get('/api/teams/top_teams').success(function(data){
		    $scope.topTeams = data;
		    $scope.topTeams[0].medals = pushMedals(0);
		    $scope.topTeams[1].medals = pushMedals(1);
		    $scope.topTeams[2].medals = pushMedals(2);
		    $scope.topTeams[3].medals = pushMedals(3);
		    $scope.topTeams[4].medals = pushMedals(4);
		    $scope.topTeams[5].medals = pushMedals(5);
	    });

	    $scope.bb = -1;
	    $scope.gb = 1;

	    function pushMedals(count){
	    	
	    	var medals = {};
	    	var medal = {}
		    for (var i = $scope.topTeams[count].score - 2; i > 0; i-=3) {
		    	medals[i] = medal;
		    }
		    console.log(medals);
		    return medals;
	    }

	    $scope.submit = function(team){
	    		$http({
					  method: 'PUT',
					  url: '/api/teams/'+team+'/'+$scope.selectedBehavior
					}).then(function successCallback(response) {
						alert = $mdDialog.alert()
					        .title('Success')
					        .textContent('Score Updated !!')
					        .ok('Close');
					      $mdDialog
					          .show( alert )
					          .finally(function() {
					            alert = undefined;
					          });
						$http.get('/api/teams/top_teams').success(function(data){
							$scope.topTeams = data;
						    $scope.topTeams[0].medals = pushMedals(0);
						    $scope.topTeams[1].medals = pushMedals(1);
						    $scope.topTeams[2].medals = pushMedals(2);
						    $scope.topTeams[3].medals = pushMedals(3);
						    $scope.topTeams[4].medals = pushMedals(4);
						    $scope.topTeams[5].medals = pushMedals(5);
							
						    //refresh
					    });
					  }, function errorCallback(response) {
					  	alert = $mdDialog.alert()
				        .title('failure')
				        .textContent('Score not Updated !!')
				        .ok('Close');
				      $mdDialog
				          .show( alert )
				          .finally(function() {
				            alert = undefined;
				          });
					  });
	    	
	    }

});
