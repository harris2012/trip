function GoogleController($scope) {

    var japan = { lat: 35.549350, lng: 139.779871 };
    var qiuyeyuan = { lat: 35.702210, lng: 139.774091 };

    var map = new google.maps.Map(document.getElementById('mainMap'), {
        center: japan,
        zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    // Set destination, origin and travel mode.
    var request = {
        destination: qiuyeyuan,
        origin: japan,
        travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {

        console.log(response);

        if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}