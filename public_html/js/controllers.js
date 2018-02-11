'use strict';
angular.module('Museo.controllers',[])
.controller('LoginController',['$scope','authService','$state','$rootScope',function($scope,authService,$state,$rootScope){
	$scope.buttonText="Login";
    $scope.invalidLogin=false;
	$scope.login=function(){
		$scope.buttonText="Logging in. . .";

		authService.login($scope.credentials.username,$scope.credentials.password).then(function(data){
			$state.go('home.viewAll');
		},function(err){
			$scope.invalidLogin=true;
		})['finally'](function(){
                        console.log(authService.user);
                        $scope.buttonText="Login";
		});
	}
}])
.controller('HomeController',['$scope','$cookieStore','authService','$state',function($scope,$cookieStore,authService,$state){
        $scope.mansione=$cookieStore.get('user').Mansione;
        $scope.logout=function(){
        authService.user=undefined;
        $cookieStore.remove('user');
        $state.go('web.viewAll',undefined,{reload:true});
    }
}])
.controller('WebController',['$stateParams','$rootScope','$scope',function($stateParams,$rootScope,$scope) {
}])
.controller('AllController',['$scope','odaService','artistService','typeService',function($scope,odaService,artistService,typeService){
    var OdaTable=odaService.get(function () {
        $scope.opere=OdaTable.json;
        var ArtistaTable=artistService.get(function () {
            //$scope.artisti=ArtistaTable.json;
            for(var i=0; i<OdaTable.length; i++){
                for(var j=0;j<ArtistaTable.length;j++){
                    if($scope.opere[i].vsArtista == ArtistaTable.json[j].id){
                        $scope.opere[i].NomeArtista = ArtistaTable.json[j].Nome;
                        $scope.opere[i].CognomeArtista =ArtistaTable.json[j].Cognome;
                        $scope.opere[i].Nazionalita =ArtistaTable.json[j].Nazionalita;
                    }
                }

            }
        });
        var TypeTable=typeService.get(function () {
            for(var i=0; i<OdaTable.length; i++){
                for(var j=0;j<TypeTable.length;j++){
                    if($scope.opere[i].vsTipologia == TypeTable.json[j].id){
                        $scope.opere[i].Tipologia = TypeTable.json[j].Tecnica;
                    }
                }

            }

        })

    });
}])
.controller('OperaDarteController',['$stateParams','$scope','odaService','artistService','typeService',function($stateParams,$scope,odaService,artistService,typeService){


        var OdaTable=odaService.get(function () {
            $scope.opere=OdaTable.json;
            var ArtistaTable=artistService.get(function () {

                for(var i=0; i<OdaTable.length; i++){
                    for(var j=0;j<ArtistaTable.length;j++){
                        if($scope.opere[i].vsArtista == ArtistaTable.json[j].id){
                            $scope.opere[i].NomeArtista = ArtistaTable.json[j].Nome;
                            $scope.opere[i].CognomeArtista =ArtistaTable.json[j].Cognome;
                            $scope.opere[i].Nazionalita =ArtistaTable.json[j].Nazionalita;
                        }
                    }

                }

            });
            var TypeTable=typeService.get(function () {
                for(var i=0; i<OdaTable.length; i++){
                    for(var j=0;j<TypeTable.length;j++){
                        if($scope.opere[i].vsTipologia == TypeTable.json[j].id){
                            $scope.opere[i].Tipologia = TypeTable.json[j].Tecnica;
                        }
                    }

                }

            });
            for(var i=0; i<OdaTable.length; i++){
                if($scope.opere[i].id == $stateParams.id){
                    $scope.opera = $scope.opere[i];
                    $scope.foo=$scope.opera.id;   // valore che va nel qr-code
                }
            }
        });

    }])



.controller('ViewOperaDarteController',['$scope','$stateParams','odaService','artistService','typeService',function ($scope,$stateParams,odaService,artistService,typeService) {
        var OdaTable=odaService.get(function () {
            $scope.opere=OdaTable.json;

            for(var i=0; i<OdaTable.length; i++){
                if($scope.opere[i].id == $stateParams.id){
                    $scope.opera = $scope.opere[i];
                    $scope.immagine="img/"+$scope.opere[i].Immagine;
                    $scope.audio = "audio/"+$scope.opere[i].Audio;
                    $scope.video = "video/"+$scope.opere[i].Video;
                }
            }

            var ArtistaTable=artistService.get(function () {

                for(var j=0;j<ArtistaTable.length;j++){
                    if($scope.opera.vsArtista == ArtistaTable.json[j].id){
                        $scope.opera.NomeArtista = ArtistaTable.json[j].Nome;
                        $scope.opera.CognomeArtista =ArtistaTable.json[j].Cognome;
                        $scope.opera.Nazionalita =ArtistaTable.json[j].Nazionalita;
                    }

                }

            })
            var TypeTable=typeService.get(function () {
                for(var j=0;j<TypeTable.length;j++){
                    if($scope.opera.vsTipologia == TypeTable.json[j].id){
                        $scope.opera.Tipologia = TypeTable.json[j].Tecnica;
                    }
                }

            })
        });
    }])
.controller('MuseiController',['$scope','$state','popupService','museoService','cityService',function($scope,$state,popupService,museoService,cityService){
    var MuseiTable=museoService.get(function () {
        $scope.musei=MuseiTable.json;
        var CittaTable=cityService.get(function () {

            for(var i=0; i<MuseiTable.length; i++){
                for(var j=0;j<CittaTable.length;j++){
                    if($scope.musei[i].Citta == CittaTable.json[j].id){
                        $scope.musei[i].Citta = CittaTable.json[j].Nome;
                        $scope.musei[i].Nazione = CittaTable.json[j].Nazione;

                    }
                }

            }

        })
    });
}])
.controller('MuseoChangeController',['$scope','$state','popupService','museoService','cityService','API_ENDPOINT_MUSEO',function($scope,$state,popupService,museoService,cityService,API_ENDPOINT_MUSEO){
    $scope.museo={};
    $scope.annulla=function () {
        $state.go('home.musei',undefined,{reload:true});
    };
    var MuseiTable=museoService.get(function () {
        $scope.musei=MuseiTable.json;
        var ultimoMuseo=$scope.musei.length-1;
        var idUltimoMuseo= $scope.musei[ultimoMuseo].id;
        var CittaTable=cityService.get(function () {
            $scope.cities=CittaTable.json;
            for(var i=0; i<MuseiTable.length; i++){
                for(var j=0;j<CittaTable.length;j++){
                    if($scope.musei[i].Citta == CittaTable.json[j].id){
                        $scope.musei[i].Citta = CittaTable.json[j].Nome;
                        $scope.musei[i].Nazione = CittaTable.json[j].Nazione;

                    }
                }

            }

        });
    $scope.deleteMuseo=function(museo) {
                $scope.popup = popupService.showPopup("Vuoi eliminare dal DB il museo selezionato ?");
                if ($scope.popup) {
                    var form = new FormData();
                    form.append("id", museo.id);
                    //console.log(museo.id);
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": API_ENDPOINT_MUSEO+"/"+museo.id,
                        "method": "DELETE",
                        "headers": {
                            "cache-control": "no-cache",
                            },
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        $state.go('home.musei',undefined,{reload:true});
                    });
                }
            };

    $scope.buttonText="Salva Museo";
    $scope.saveNewMuseo=function () {

                $scope.buttonText="Salvataggio...";
                $scope.popup1=popupService.showPopup("Vuoi salvare il nuovo Museo nel Db ?");
                if($scope.popup1){
                    $scope.idMuseoNew=parseInt(idUltimoMuseo)+1;

                    var form = new FormData();
                    form.append("id",$scope.idMuseoNew);
                    form.append("Nome",$scope.museo.nome);
                    form.append("Indirizzo",$scope.museo.indirizzo);
                    form.append("OrarioApertura",$scope.museo.orario);
                    form.append("Descrizione",$scope.museo.descrizione);
                    form.append("Citta",$scope.museo.citta);

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": API_ENDPOINT_MUSEO,
                        "method": "POST",
                        "headers": {
                            "cache-control": "no-cache"
                        },
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };
                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        $state.go('home.musei',undefined,{reload:true});
                    });

                }
                else{
                    $scope.buttonText="Salva Museo";
                }
            }

        });
    }])
.controller('MuseoControllerUpdate',['$stateParams','authService','$scope','$state','popupService','cityService','museoService','API_ENDPOINT_MUSEO',function($stateParams,authService,$scope,$state,popupService,cityService,museoService,API_ENDPOINT_MUSEO) {
        $scope.museo={};
        $scope.annulla=function () {
        $state.go('home.museiUpdate',undefined,{reload:true});
        };
        var CityTable=cityService.get(function () {
            $scope.cities=CityTable.json;
        });  //per la chiave esterna
        var MuseiTable=museoService.get(function () {
            $scope.musei=MuseiTable.json;
            for(var i=0; i<MuseiTable.length; i++){
                if($scope.musei[i].id == $stateParams.id){
                    $scope.museo = $scope.musei[i];
                }
            }

            for(var i=0;i<CityTable.length;i++){
                if($scope.museo.Citta == $scope.cities[i].id){
                    $scope.museo.city = $scope.cities[i].Nome;
                }
            }

           $scope.buttonText="Conferma Modifiche Museo";

            $scope.updateMuseo=function () {

                $scope.buttonText="Salvataggio...";
                $scope.popup7=popupService.showPopup("Vuoi salvare le modifiche  Museo nel Db ?");
                if($scope.popup7 && authService.user.Mansione =='Amministratore'){

                    var form = new FormData();
                    form.append("id",$scope.museo.id);
                    if($scope.museo.nome)
                    form.append("Nome",$scope.museo.nome);
                    if($scope.museo.indirizzo)
                    form.append("Indirizzo", $scope.museo.indirizzo);
                    if($scope.museo.orario)
                    form.append("OrarioApertura", $scope.museo.orario);
                    if($scope.museo.descrizione)
                    form.append("Descrizione", $scope.museo.descrizione);
                    if($scope.museo.citta)
                    form.append("Citta", $scope.museo.citta);


                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url":API_ENDPOINT_MUSEO+"/"+$scope.museo.id,//"url":API_ENDPOINT_OPERATORE+"/"+$scope.operatore.id,
                        "method": "PUT",
                        "headers": {
                            "cache-control": "no-cache"
                        },
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        $scope.buttonText="Conferma Modifiche Museo";
                        $state.go('home.museiUpdate',undefined,{reload:true});
                    });
                }
                else{
                    $scope.popup2=popupService.showPopup("Non hai i privilegi per modificare gli account !!");
                    $scope.buttonText="Conferma Modifiche Museo";
                }
            }//chiude salvaMuseo

        });
    }])

.controller('AccountController',['$stateParams','authService','$scope','$state','popupService','opeService','museoService','API_ENDPOINT_OPERATORE',function($stateParams,authService,$scope,$state,popupService,opeService,museoService,API_ENDPOINT_OPERATORE) {
    $scope.operatore={};
    $scope.buttonText="Salva Account";
    $scope.annulla=function () {
        $state.go('home.account',undefined,{reload:true});
    };
    var MuseoTable=museoService.get(function () {
        $scope.musei=MuseoTable.json;
    });  //per la chiave esterna
    var OperatoriTable=opeService.get(function () {
        $scope.operatori=OperatoriTable.json;

        $scope.deleteOperatore=function(operatore) {
            $scope.popup5 = popupService.showPopup("Vuoi eliminare dal DB l'operatore selezionato ?");
            if ($scope.popup5 && authService.user.Mansione =='Amministratore') {
                var form = new FormData();
                form.append("id", operatore.id);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": API_ENDPOINT_OPERATORE+"/"+operatore.id,
                    "method": "DELETE",
                    "headers": {
                        "cache-control": "no-cache",
                        },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    $state.go('home.account',undefined,{reload:true});
                });
            }
        };

        $scope.saveNewAccount=function () {
            var ultimoOperatore=$scope.operatori.length-1;
            var idUltimoOperatore= $scope.operatori[ultimoOperatore].id;
            $scope.buttonText="Salvataggio...";

            $scope.popup2=popupService.showPopup("Vuoi salvare il nuovo Operatore nel Db ?");
            if($scope.popup2 && authService.user.Mansione =='Amministratore'){
                $scope.idOperatoreNew = parseInt(idUltimoOperatore+1);
                //console.log($scope.operatore.nome);

                var form = new FormData();
                form.append("id",$scope.idOperatoreNew);
                form.append("Nome",$scope.operatore.nome);
                form.append("Cognome",$scope.operatore.cognome);
                form.append("Username",$scope.operatore.username);
                form.append("Password",$scope.operatore.password);
                form.append("Mansione",$scope.operatore.mansione);
                form.append("Museo",$scope.operatore.museo);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": API_ENDPOINT_OPERATORE,
                    "method": "POST",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    $state.go('home.account',undefined,{reload:true});
                });

            }
            else{
                $scope.popup2=popupService.showPopup("Non hai i privilegi per modificare gli account !!");
                $scope.buttonText="Salva Account";
            }
        };

    });
}])
.controller('AccountControllerUpdate',['$stateParams','authService','$scope','$state','popupService','opeService','museoService','API_ENDPOINT_OPERATORE',function($stateParams,authService,$scope,$state,popupService,opeService,museoService,API_ENDPOINT_OPERATORE) {
        $scope.operatore={};
        $scope.annulla=function () {
        $state.go('home.accountsUpdate',undefined,{reload:true});
    };
        var MuseoTable=museoService.get(function () {
            $scope.musei=MuseoTable.json;
        });  //per la chiave esterna
        var OperatoriTable=opeService.get(function () {
            $scope.operatori=OperatoriTable.json;
            for(var i=0; i<OperatoriTable.length; i++){
                   if($scope.operatori[i].id == $stateParams.id){
                        $scope.operatore = $scope.operatori[i];
                        }
                }



            $scope.buttonText="Conferma Modifiche Account";

            for(var i=0;i<MuseoTable.length;i++){
                if($scope.operatore.Museo == $scope.musei[i].id){
                    $scope.operatore.museum = $scope.musei[i].Nome;
                }
            }

            $scope.updateAccount=function () {

                $scope.buttonText="Salvataggio...";
                $scope.popup6=popupService.showPopup("Vuoi salvare le modifiche  Operatore nel Db ?");
                if($scope.popup6 && authService.user.Mansione =='Amministratore'){

                   var form = new FormData();
                    form.append("id",$scope.operatore.id);
                    if($scope.operatore.nome)
                    form.append("Nome",$scope.operatore.nome);
                    if($scope.operatore.cognome)
                    form.append("Cognome", $scope.operatore.cognome);
                    if($scope.operatore.username)
                    form.append("Username", $scope.operatore.username);
                    if($scope.operatore.password)
                    form.append("Password", $scope.operatore.password);
                    if($scope.operatore.mansione)
                    form.append("Mansione", $scope.operatore.mansione);
                    if($scope.operatore.museo)
                    form.append("Museo", $scope.operatore.museo);

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url":API_ENDPOINT_OPERATORE+"/"+$scope.operatore.id,//"url":API_ENDPOINT_OPERATORE+"/"+$scope.operatore.id,
                        "method": "PUT",
                        "headers": {
                            "cache-control": "no-cache"
                        },
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        $scope.buttonText="Conferma Modifiche Account";
                        $state.go('home.account',undefined,{reload:true});
                    });
                }
                else{
                    $scope.popup2=popupService.showPopup("Non hai i privilegi per modificare gli account !!");
                    $scope.buttonText="Salva Account";
                }
            }//chiude salvaMuseo

            });
    }])


.controller('OdaNewController',['$scope','$state','$stateParams','odaService','artistService','typeService','API_ENDPOINT_OPERADARTE','museoService','popupService',function($scope,$state,$stateParams,odaService,artistService,typeService,API_ENDPOINT_OPERADARTE,museoService,popupService){

    $scope.annulla=function () {
        $state.go('home.operaDarte',undefined,{reload:true});
    };
    $scope.buttonText="Salva Opera D'arte";
    $scope.oda={};

    var MuseoTable=museoService.get(function () {
        $scope.musei=MuseoTable.json;
    });  //per la chiave esterna
    var TypeTable=typeService.get(function () {
        $scope.tipologie = TypeTable.json;
        });
    var ArtistaTable=artistService.get(function () {
        $scope.artisti = ArtistaTable.json;
        });


    var OdaTable=odaService.get(function () {

    $scope.saveNewOda=function () {


        $scope.oda.dataAcquisizione = $scope.oda.dataacquisizione.getFullYear()+"-"+$scope.oda.dataacquisizione.getMonth()+"-"+$scope.oda.dataacquisizione.getDate();

        $scope.odas = OdaTable.json;
        var ultimaOda=$scope.odas.length-1;
        var idUltimaOda= $scope.odas[ultimaOda].id;
        $scope.buttonText="Salvataggio...";

        $scope.popup3=popupService.showPopup("Vuoi salvare la scheda reperto nel Db ?");
        if($scope.popup3 ){
            $scope.idOdaNew = parseInt(idUltimaOda+1);

           var form = new FormData();
            form.append("id",$scope.idOdaNew);
            form.append("Titolo",$scope.oda.titolo);
            form.append("AnnoPubblicazione",$scope.oda.annopubblicazione);
            form.append("DescrizioneShort",$scope.oda.descrizioneshort);
            form.append("DescrizioneLong",$scope.oda.descrizionelong);
            form.append("Dimensione",$scope.oda.dimensione);
            form.append("Periodo",$scope.oda.periodo);
            form.append("Peso",$scope.oda.peso);
            form.append("Cultura",$scope.oda.cultura);
            if($scope.oda.originale){
                form.append("Originale",1);
            }else{
                form.append("Originale",0);
            }
            form.append("Data_Acquisizione",$scope.oda.dataAcquisizione);
            form.append("Valore",$scope.oda.valore);
            form.append("Proprietario",$scope.oda.proprietario);
            if($scope.oda.fileaudio) {
                form.append("Audio", $scope.oda.fileaudio);
            }
            if($scope.oda.filevideo){
                form.append("Video",$scope.oda.filevideo);
            }
            //console.log($scope.oda.fileimmagine)
            if($scope.oda.fileimmagine){
                form.append("Immagine",$scope.oda.fileimmagine);
            }
            form.append("vsArtista",$scope.oda.artista);
            form.append("vsTipologia",$scope.oda.tipologia);
            form.append("vsMuseo",$scope.oda.museo);


            var settings = {
                "async": true,
                "crossDomain": true,
                "url": API_ENDPOINT_OPERADARTE,
                "method": "POST",
                "headers": {
                    "cache-control": "no-cache"
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                $state.go('home.operaDarte',undefined,{reload:true});
            });

        }

    };

    });


}])
.controller('OdaUpdateController',['$scope','$state','$stateParams','odaService','artistService','typeService','API_ENDPOINT_OPERADARTE','museoService','popupService',function($scope,$state,$stateParams,odaService,artistService,typeService,API_ENDPOINT_OPERADARTE,museoService,popupService){
    $scope.annulla=function () {
        $state.go('home.operaDarte',undefined,{reload:true});
    };
    var MuseoTable=museoService.get(function () {
        $scope.musei=MuseoTable.json;
    });  //per la chiave esterna
    var TypeTable=typeService.get(function () {
        $scope.tipologie = TypeTable.json;
    });
    var ArtistaTable=artistService.get(function () {
        $scope.artisti = ArtistaTable.json;
    });

    var OdaTable=odaService.get(function () {

        $scope.odas = OdaTable.json;
        $scope.opereNonPubblicate=[];
        $scope.operePubblicate=[];

        for(var i=0; i<OdaTable.length; i++){
            for(var j=0;j<ArtistaTable.length;j++){
                if($scope.odas[i].vsArtista == ArtistaTable.json[j].id){
                    $scope.odas[i].NomeArtista = ArtistaTable.json[j].Nome;
                    $scope.odas[i].CognomeArtista =ArtistaTable.json[j].Cognome;
                    $scope.odas[i].Nazionalita =ArtistaTable.json[j].Nazionalita;
                }
            }

        }

        for (var i=0;i<$scope.odas.length;i++){
            if(!$scope.odas[i].Pubblicata ){
                $scope.opereNonPubblicate.push($scope.odas[i]);
            }
        }

        for (var i=0;i<$scope.odas.length;i++){
            if($scope.odas[i].Pubblicata ){
                $scope.operePubblicate.push($scope.odas[i]);
            }
        }

        $scope.pubblica=function (idScheda) {

            $scope.popup5=popupService.showPopup("Vuoi pubblicare la Scheda Reperto ?");
            if($scope.popup5 ){
                var form = new FormData();
                form.append("Pubblicata",1);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": API_ENDPOINT_OPERADARTE+"/"+idScheda,
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    $state.go('home.operaDarte',undefined,{reload:true});
                });

            }

        };

        $scope.fuoriCatalogo=function (idScheda) {

            $scope.popup12=popupService.showPopup("Vuoi togliere dal catalogo la Scheda Reperto ?");
            if($scope.popup12 ){
                var form = new FormData();
                form.append("Pubblicata",0);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": API_ENDPOINT_OPERADARTE+"/"+idScheda,
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    $state.go('home.operaDarte',undefined,{reload:true});
                });

            }

        };



    $scope.oda={};
    $scope.buttonText="Salva Modifiche Scheda Reperto";

     for(var i=0; i<$scope.odas.length; i++){
            if($scope.odas[i].id == $stateParams.id){
                $scope.oda = $scope.odas[i];
            }
        }


        $scope.updateOda=function () {

            $scope.buttonText="Salvataggio...";
            $scope.popup8=popupService.showPopup("Vuoi salvare le modifiche alla Scheda Reperto nel Db ?");
            if($scope.popup8){

                //console.log($scope.oda);

                var form = new FormData();
                if($scope.oda.titolo)
                form.append("Titolo",$scope.oda.titolo);
                if($scope.oda.annopubblicazione)
                form.append("AnnoPubblicazione",$scope.oda.annopubblicazione);
                if($scope.oda.descrizioneshort)
                form.append("DescrizioneShort",$scope.oda.descrizioneshort);
                if($scope.oda.descrizionelong)
                form.append("DescrizioneEstesa",$scope.oda.descrizionelong);
                if($scope.oda.dimensione)
                form.append("Dimensione",$scope.oda.dimensione);
                if($scope.oda.periodo)
                form.append("Periodo",$scope.oda.periodo);
                if($scope.oda.peso)
                form.append("Peso",$scope.oda.peso);
                if($scope.oda.cultura)
                form.append("Cultura",$scope.oda.cultura);

                if($scope.oda.valore)
                form.append("Valore",$scope.oda.valore);
                if($scope.oda.proprietario)
                form.append("Proprietario",$scope.oda.proprietario);
                if($scope.oda.fileaudio) {
                    form.append("Audio", $scope.oda.fileaudio);
                }
                if($scope.oda.filevideo){
                    form.append("Video",$scope.oda.filevideo);
                }

                if($scope.oda.fileimmagine){
                    form.append("Immagine",$scope.oda.fileimmagine);
                }
                if($scope.oda.artista)
                form.append("vsArtista",$scope.oda.artista);
                if($scope.oda.tipologia)
                form.append("vsTipologia",$scope.oda.tipologia);
                if($scope.oda.museo)
                form.append("vsMuseo",$scope.oda.museo);
                form.append("Pubblicata",0);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url":API_ENDPOINT_OPERADARTE+"/"+$scope.oda.id,//"url":API_ENDPOINT_OPERATORE+"/"+$scope.operatore.id,
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    //$scope.buttonText="Conferma Modifiche Museo";
                    $state.go('home.odasUpdate',undefined,{reload:true});
                });
            }
            else{
                $scope.buttonText="Salva Modifiche Scheda Reperto";
            }
            };
    });
}]);
	
	
	
	