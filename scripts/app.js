var app = angular.module('app', ['ngResource', 'ui.router']);

app.config(route);

app.service('TripService', ['$resource', '$q', TripService]);

