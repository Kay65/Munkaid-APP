var app = angular.module('Munkaido_app', ['ngRoute']);
app.run(function($rootScope){
    $rootScope.appTitle = "Munkaidő App";
    $rootScope.author = "5/13.SZOFT";
    $rootScope.company = "Bajai SZC Türr István Technikum";
    $rootScope.year = "2024.";
    $rootScope.today = new Date();

    $rootScope.serverUrl = 'http://localhost:5000';
    $rootScope.appUrl = 'http://127.0.0.1:5500/index.html';
    }
)
app.config(function($routeProvider) {
    $routeProvider
    .when('/alk', {
        templateUrl: 'Views/alk.html',
        controller: 'alkCtrl',
    })
})