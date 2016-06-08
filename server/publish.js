Meteor.publish('recipes', function(lat, lon){
	if(lat){	
		return Recipes.find( { $and: [ { inMenu: true },
								{ location :
                         			{ $near :
                           				{ $geometry :
                              				{ type : "Point" ,
                                			coordinates : [lat, lon] 
                                			} ,
                             			$maxDistance : 10000
                         				} 
                         			} 
                         		}
                         		]
                        	} );
	}else{
		return Recipes.find({});
	}
});

Meteor.publish('userProfiles', function(){
    return UserProfile.find({});
});

Meteor.publish('personalRecipes', function(){	
	return Recipes.find({author: this.userId});
});

Meteor.publish('singleRecipes', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});

Meteor.methods({
        insertActiveUser: function (user) {
            console.log('============inside insertActiveUsers===========')
            //var apiUrl = 'http://localhost:8086/com.tutorial.rest/api/insertActiveUser/';
            var apiUrl = 'http://homecookish-1.qjq2ypmmix.us-west-2.elasticbeanstalk.com/api/insertActiveUser/';
            var params = 'userId='+user._id+'&userName='+user.name+'&phoneNumber='+user.telephone;
            var finalUrl=apiUrl+params;
            console.log(finalUrl);
            this.unblock();
            var response = HTTP.get(finalUrl).data;
            console.log(response);
            return response;
        },
        insertActiveFp: function (provider) {
            //fpId, recipeId
            //var apiUrl = 'http://localhost:8086/com.tutorial.rest/api/insertActiveFp/';
            var apiUrl = 'http://homecookish-1.qjq2ypmmix.us-west-2.elasticbeanstalk.com/api/insertActiveFp/';
            var params = 'userId='+provider.userId+'&recipeId='+provider.recipeId;
            var finalUrl=apiUrl+params;
            console.log(finalUrl);
            this.unblock();
            var response = HTTP.get(finalUrl).data;
            console.log(response);
            return response;
        },
        insertRecipe: function (recipe) {
            //recipeId, fpId, recipeName,price
            
            //var apiUrl = 'http://localhost:8086/com.tutorial.rest/api/insertRecipe/';
            var apiUrl = 'http://homecookish-1.qjq2ypmmix.us-west-2.elasticbeanstalk.com/api/insertRecipe/';
            var params='fpId='+recipe.fpId+'&recipeId='+recipe.recipeId+'&recipeName='+recipe.recipeName+'&price='+recipe.price;
            var finalUrl=apiUrl+params;
            console.log(finalUrl);
            this.unblock();
            var response = HTTP.get(finalUrl).data;
            console.log(response);
            return response;
        },
        insertTransaction: function (transaction) {
            //tranId, fcId, fpId, recipeId
            //var apiUrl = 'http://localhost:8086/com.tutorial.rest/api/insertTransaction/';
            var apiUrl = 'http://homecookish-1.qjq2ypmmix.us-west-2.elasticbeanstalk.com/api/insertTransaction/';
            var params='fpId='+transaction.fpId+'&recipeId='+transaction.recipeId+'&tranId='+transaction.tranId+'&fcId='+transaction.fcId;
            var finalUrl=apiUrl+params;
            console.log(finalUrl);
            //this.unblock();
            var response = HTTP.get(finalUrl).data;
            console.log(response);
            return response;
        },
        updateTransaction: function (transactionIds) {
            //csv list of tranIds
            //var apiUrl = 'http://localhost:8086/com.tutorial.rest/api/updateTransaction/';
            var apiUrl = 'http://homecookish-1.qjq2ypmmix.us-west-2.elasticbeanstalk.com/api/updateTransaction/';
            var params=transactionIds;
            var finalUrl=apiUrl+params;
            console.log(finalUrl);
            this.unblock();
            var response = HTTP.get(finalUrl).data;
            console.log(response);
            return response;
        }
    });


