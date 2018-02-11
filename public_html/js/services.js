'use strict';


angular.module('Museo.services',[])
.service('popupService',['$window',function($window){
    this.showPopup=function(message){
        return $window.confirm(message); 
    }
}])
.factory('authService',['AUTH_ENDPOINT','$http','$cookieStore','$rootScope',function(AUTH_ENDPOINT,$http,$cookieStore,$rootScope){
    var auth={};
    auth.login=function(username,password){
        return $http.get(AUTH_ENDPOINT).then(function(response,status){
        //return $http.post(AUTH_ENDPOINT,{Username:username,Password:password}).then(function(response,status){
        	        	
        	for (var i=0;i<response.data.length;i++){
        		
        	if(response.data.json[i].Username == username && response.data.json[i].Password == password){
        		auth.user=response.data.json[i];
        		}
        	else{
        		$rootScope.invalidLogin=true;
        	    }
        	}
            
            $cookieStore.put('user',auth.user);
            return auth.user;
            
        });
    };
    auth.logout=function () {
           };
    return auth;   //valore ritornato dal servizio

}])
    

.factory('artistService',['$resource','API_ENDPOINT_ARTISTA',function($resource,API_ENDPOINT_ARTISTA){
    return $resource(API_ENDPOINT_ARTISTA, { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('cityService',['$resource','API_ENDPOINT_CITTA',function($resource,API_ENDPOINT_CITTA){
    return $resource(API_ENDPOINT_CITTA, { id : '@id' },{
            update: {
            method: 'PUT'
        }
        
    });
}])

.factory('opeService',['$resource','API_ENDPOINT_OPERATORE',function($resource,API_ENDPOINT_OPERATORE){
        return $resource(API_ENDPOINT_OPERATORE, { id: '@id' }, {
            update: {
                method: 'PUT'
            }
     });
 }])
.factory('typeService',['$resource','API_ENDPOINT_TIPOLOGIA',function($resource,API_ENDPOINT_TIPOLOGIA){
    return $resource(API_ENDPOINT_TIPOLOGIA, { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('museoService',['$resource','API_ENDPOINT_MUSEO',function($resource,API_ENDPOINT_MUSEO){
    return $resource(API_ENDPOINT_MUSEO, { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('odaService',['$resource','API_ENDPOINT_OPERADARTE',function($resource,API_ENDPOINT_OPERADARTE){
    return $resource(API_ENDPOINT_OPERADARTE, { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
 	//.value('AUTH_ENDPOINT','http://localhost:8000/api/Login')
    .value('AUTH_ENDPOINT','http://localhost:8000/api/Operatore')
	.value('API_ENDPOINT_ARTISTA','http://localhost:8000/api/Artista')
    .value('API_ENDPOINT_OPERATORE','http://localhost:8000/api/Operatore')
    .value('API_ENDPOINT_CITTA','http://localhost:8000/api/Citta')
    .value('API_ENDPOINT_TIPOLOGIA','http://localhost:8000/api/Tipologia')
    .value('API_ENDPOINT_MUSEO','http://localhost:8000/api/Museo')
	.value('API_ENDPOINT_OPERADARTE','http://localhost:8000/api/OperaDarte')
	//.value('LOGOUT_ENDPOINT','http://localhost:8000/logout')
;