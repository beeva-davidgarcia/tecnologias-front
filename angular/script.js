angular.module('TiempoApp',[]).run();

angular.module('TiempoApp').service('Tiempo', function ($http) {
    return {
        get : function(ciudades,cb){
            $http.get('http://api.openweathermap.org/data/2.5/group?id='+ciudades+'&units=metric&lang=es')
                    .success(function(data){
                        cb(data.list);
                    })
                    .error(function(e){
                        cb([]);
                    });
        }
    }
});

angular.module('TiempoApp').directive('tiempoBeeva', function (Tiempo) {
    return {
        restrict: 'E',
        scope:{
            ciudades:'@'
        },
        templateUrl: 'templates/tiempo.html',
        link : function(scope){
            scope.cities=[];
            Tiempo.get(scope.ciudades,function(datos){
                scope.cities=datos;
            });
        }
    }
});