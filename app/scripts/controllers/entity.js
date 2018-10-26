
(function(){
  'use strict';
  
  /**
   * @ngdoc function
   * @name obraenalertaApp.controller:EntityCtrl
   * @description
   * # EntityCtrl
   * Controller of the obraenalertaApp
   */
  angular.module('obraenalertaApp')
    .controller('EntityCtrl', [
      'localidad',
      '$mdDialog',
      EntityCtrl
    ]);
  
  function EntityCtrl(localidad, $mdDialog) {
    var vm = this;
    
    console.log(localidad)
    
    vm.cancel = $mdDialog.cancel;
    vm.localidad = {
      nombre: localidad.properties.NOMBRE,
      id: localidad.properties.OBJECTID,
      Irregularidades: localidad.properties.Irregularidades
    };
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
})();