
(function(){
  'use strict';
  
  /**
   * @ngdoc service
   * @name obraenalertaApp.Secop
   * @description
   * # Secop
   * Service in the obraenalertaApp.
   */
  angular.module('obraenalertaApp')
    .service('Secop', [
      '$http',
      '$mdToast',
      Secop
    ]);
  function Secop($http, $mdToast) {
    var
      contracII = [],
      SECOPII= 'https://www.datos.gov.co/resource/9f3w-id9a.json?$$app_token=glFv4rbJcL4JLD1Q3UJrlDthE',
      contracI = [],
      SECOPI= 'https://www.datos.gov.co/resource/c6dm-udt9.json?$$app_token=glFv4rbJcL4JLD1Q3UJrlDthE'
    ;
    
    return {
      I: getContracsI,
      II: getContractsII,
      getContracts: getContracts(),
      getContractsI: getContracts('I'),
      getContractsII: getContracts('II'),
    };
    
    function getContracts(secop){
      return secop === 'I'?contracI:secop === 'II'?contracII:{
        I: contracI,
        II: contracII
      };
    }
    
    function getContracsI(bogota, localidad){
      console.log(bogota)
      var anno;
      for(var i=0; i<3;i++){
        anno=2016+i;
        var searchFilter='&tipo_de_contrato=Obra&nombre_de_la_entidad='+encodeURI('BOGOTÁ D.C. - ALCALDÍA LOCAL CIUDAD BOLÍVAR')+'&anno_cargue_secop='+anno;
        var url=SECOPI+searchFilter;
        
        $http({
          url: url,
          type: 'GET',
          data: {
            '$limit':10000
          }
        })
          .then(function(data){
            console.log(data)
            bogota.features[11].properties.Contratos = 317200;
            contracI.push(data.length);
          }, function(err){
            $mdToast.show('Ocurrió un error al tratar de obtener las columnas, por favor contacte al administrador');
          })
        ;
    
      }
    }
    
    function getContractsII(localidad){
      var searchFilter = '&tipo_de_contrato=Obra&nombre_entidad=' + encodeURI('ALCALDIA LOCAL DE CIUDAD BOLIVAR');
      var url = SECOPII + searchFilter;
      $http({
        url: url,
        type: 'GET',
        data: {
          '$limit': 10000
        },
        error: function (xhr, status, error) {
          $mdToast.show('Ocurrió un error al tratar de obtener las columnas, por favor contacte al administrador');
        },
        success: function (data, textStatus, jqXHR) {
          contracII.push(data.length);
        }
      });
    }
  }
})();