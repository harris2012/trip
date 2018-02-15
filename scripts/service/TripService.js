function TripService($resource, $q) {

    var resource = $resource('data/place.json', {}, {
        getWelcomeData: { method: 'GET', url: 'data/welcome.json?v=' + window.version }
    });

    return {
        getWelcomeData: function () {
            var d = $q.defer();
            resource.getWelcomeData({}, function (result) {
                d.resolve(result);
            }, function (result) {
                d.reject(result);
            });
            return d.promise;
        }
    }

}