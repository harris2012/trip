var route = function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/welcome').when('/', '/welcome');

    $stateProvider.state('HarrisTrip', {
        url: '/',
        views: {
            'header': {
                templateUrl: 'scripts/views/view_header.html?v=' + window.version
            },
            'footer': {
                templateUrl: 'scripts/views/view_footer.html?v=' + window.version
            },
            '': {
                template: '<div class="container" ui-view></div>'
            }
        }
    });

    $stateProvider.state('HarrisTrip.welcome', {
        url: 'welcome',
        templateUrl: 'scripts/views/view_welcome.html?v=' + window.version,
        controller: WelcomeController
    });

    $stateProvider.state('HarrisTrip.google', {
        url: 'google',
        templateUrl: 'scripts/views/view_google.html?v=' + window.version,
        controller: GoogleController
    });
}