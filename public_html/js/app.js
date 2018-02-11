'use strict';
angular.module('Museo',['ui.router','Museo.controllers','Museo.directives','Museo.filters','Museo.services','ngResource','ngSanitize','ngAnimate','ngCookies','ui.bootstrap','ngStorage'])

    .config(['$stateProvider',function($stateProvider){
       //$httpProvider.defaults.withCredentials = true;
    $stateProvider

    .state('web',{
                url:'/web',
                abstract:true,
                controller:'WebController',
                templateUrl:'views/web/web.html'
            })
    .state('web.viewAll',{
                url:'/viewAll',
                controller:'AllController',
                templateUrl:'views/web/viewAll.html'
            })
    .state('web.viewOperaDarte', {
                url: '/viewOperaDarte/:id',
                controller: 'ViewOperaDarteController',
                templateUrl: 'views/web/viewOperaDarte.html'
            })
    .state('web.viewMusei',{
                url:'/viewMusei',
                controller:'MuseiController',
                templateUrl:'views/web/viewMusei.html'
            })

    .state('home',{
                url:'/home',
                abstract:true,    // lo stato non viene chiamato se non dopo che ogni child viene chiamato
                controller:'HomeController',
                resolve:{
        	        user:['authService','$q',function(authService,$q){
        		    return authService.user || $q.reject({unAuthorized:true});
        	                }]
                        },
                    templateUrl:'views/home/home.html'
    })
        .state('home.viewAll',{
                url:'/viewAllRes',
                controller:'AllController',
                templateUrl:'views/home/operaDarte/viewAllReserved.html'
    })
        .state('home.viewMusei',{
                url:'/viewMuseiRes',
                controller:'MuseiController',
                templateUrl:'views/home/musei/viewMuseiReserved.html'
    })
        .state('home.viewOperaDarte',{
                url:'/operaDarteRes/:id',
                controller:'ViewOperaDarteController',
                templateUrl:'views/home/operaDarte/viewOperaDarteReserved.html'
    })
        .state('home.operaDarte',{
        url:'/operaDarte',
        controller:'',   //OperaDarteController
        templateUrl:'views/home/operaDarte/operaDarte.html'
    })
            .state('home.odaNew',{
            url:'/operaDarteNew',
            controller:'OdaNewController',
            templateUrl:'views/home/operaDarte/odaNew.html'
        })
            .state('home.odasUpdate',{
            url:'/opereDarteUpdate',
            controller:'OdaUpdateController',
            templateUrl:'views/home/operaDarte/odasUpdate.html'
        })
            .state('home.odaUpdate',{
            url:'/operaDarteUpdate/:id',
            controller:'OdaUpdateController',
            templateUrl:'views/home/operaDarte/odaUpdate.html'
        })
            .state('home.odaDelete',{
            url:'/operaDarteDelete',
            controller:'OdaUpdateController',
            templateUrl:'views/home/operaDarte/odaDelete.html'
        })
        .state('home.pubblica',{
            url:'/pubblica',
            controller:'OdaUpdateController',
            templateUrl:'views/home/operaDarte/pubblica.html'
        })
        .state('home.qrcode',{
            url:'/qrcode',
            controller:'OperaDarteController',
            templateUrl:'views/home/operaDarte/qrcode.html'
        })
        .state('home.operaDarteQRcode',{
            url:'/qrcode/:id',
            controller:'OperaDarteController',
            templateUrl:'views/home/operaDarte/qrcodeGenerator.html'
        })

        .state('home.musei',{
                url:'/musei',
                controller:'',   // MuseiController
                templateUrl:'views/home/musei/musei.html'
    })
            .state('home.museiNew',{
                url:'/museiNew',
                controller:'MuseoChangeController',
                templateUrl:'views/home/musei/museiNew.html'
            })
            .state('home.museiUpdate',{
                url:'/museiUpdate',
                controller:'MuseoChangeController',
                templateUrl:'views/home/musei/museiUpdate.html'
            })
            .state('home.museoUpdate',{
                url:'/museoUpdate/:id',
                controller:'MuseoControllerUpdate',
                templateUrl:'views/home/musei/museoUpdate.html'
            })
            .state('home.museiDelete',{
                url:'/museiDelete',
                controller:'MuseoChangeController',
                templateUrl:'views/home/musei/museiDelete.html'
            })
    .state('home.account',{
                url:'/accounts',
                controller:'',     //  AccountController
                templateUrl:'views/home/account/account.html'
    })
            .state('home.accountNew',{
                url:'/accountNew',
                controller:'AccountController',
                templateUrl:'views/home/account/accountNew.html'
            })
            .state('home.accountUpdate',{
                url:'/accountUpdate/:id',
                controller:'AccountControllerUpdate',
                templateUrl:'views/home/account/accountUpdate.html'
            })
            .state('home.accountsUpdate',{
                url:'/accountsUpdate',
                controller:'AccountController',
                templateUrl:'views/home/account/accountsUpdate.html'
            })
            .state('home.accountDelete',{
                url:'/accountDelete',
                controller:'AccountController',
                templateUrl:'views/home/account/accountDelete.html'
            })

     .state('login',{
    	        url:'/login',
    	        controller: 'LoginController',
    	        resolve:{
    		    user:['authService','$q',function(authService,$q){
    			    if(authService.user){
    				return $q.reject({authorized:true});
    			    }
    		        }]
    	                },
                templateUrl:'views/home/login.html'
            })
   }])
	.run(['$rootScope','$state','$cookieStore','authService',function($rootScope,$state,$cookieStore,authService){

    
    $state.go('web.viewAll');
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		if(error.unAuthorized) {
			       	$state.go('web.viewAll');
        				}
        else if(error.authorized){
        	        $state.go('home.viewAll');
        	}
    	});
        authService.user=$cookieStore.get('user');
	        
    }])
    .value('version','V1.0');


