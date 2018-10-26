
(function(){
  'use strict';
  
  /**
   * @ngdoc overview
   * @name obraenalertaApp
   * @description
   * # obraenalertaApp
   *
   * Main module of the application.
   */
  angular
    .module('obraenalertaApp', [
      'ngAria',
      'ngRoute',
      'ngAnimate',
      'ngCookies',
      'ngMaterial',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'ui-leaflet'
    ])
    .config([
      '$routeProvider',
      '$mdThemingProvider',
      config
    ])
  ;
  
  function config($routeProvider, $mdThemingProvider){
  
    $mdThemingProvider.definePalette('mcgpalette0', {
      '50': 'edf9f3',
      '100': 'd1f0e0',
      '200': 'b3e6cc',
      '300': '94dbb8',
      '400': '7dd4a8',
      '500': '66cc99',
      '600': '5ec791',
      '700': '53c086',
      '800': '49b97c',
      '900': '38ad6b',
      'A100': 'f9fffc',
      'A200': 'c6ffde',
      'A400': '93ffc0',
      'A700': '7affb1',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': []
    });
    $mdThemingProvider.definePalette('mcgpalette1', {
      '50': 'f9e7f9',
      '100': 'f0c2f0',
      '200': 'e699e6',
      '300': 'db70db',
      '400': 'd452d4',
      '500': 'cc33cc',
      '600': 'c72ec7',
      '700': 'c027c0',
      '800': 'b920b9',
      '900': 'ad14ad',
      'A100': 'ffe0ff',
      'A200': 'ffadff',
      'A400': 'ff7aff',
      'A700': 'ff60ff',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': [
        '500',
        '600',
        '700',
        '800',
        '900'
      ]
    });
    $mdThemingProvider.theme('default')
      .primaryPalette('mcgpalette0')
      .accentPalette('mcgpalette1')
    ;
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/entity', {
        templateUrl: 'views/entity.html',
        controller: 'EntityCtrl',
        controllerAs: 'entity'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
