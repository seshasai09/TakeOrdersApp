angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Food.get()
			.success(function(data) {
				$scope.foodItems = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.addFoodItem = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData!= undefined && !isNaN($scope.formData.price)) {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				Food.create($scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foodItems = data; // assign our new list of todos
					})
			}
		};

		// DELETE ==================================================================
		// delete an item
		$scope.deleteFoodItem = function(id) {
			$scope.loading = true;
			Food.delete(id)
				// if successful creation, call our get function to get all the new food items
				.success(function(data) {
					$scope.loading = false;
                    $scope.foodItems = data; // assign our new list of list of food items
				});
		};


        // TOTAL ==================================================================
        // get total for all the food items
        $scope.getRevenue=function(){
                Food.total().success(function(response){
                   $scope.total=response.total;
                });
        }


        }]);