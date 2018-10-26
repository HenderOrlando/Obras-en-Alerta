
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
      '$q',
      '$http',
      '$mdToast',
      Secop
    ]);
  function Secop($q, $http, $mdToast) {
    var
      contracII = [],
      urlSecopII = 'https://www.datos.gov.co/resource/9f3w-id9a.json',
      //contracI = [],
      urlSecopI = 'https://www.datos.gov.co/resource/c6dm-udt9.json',
      proveedores = [],
      contracI = {},
      proveedors= {},
      paramsBase = {
        //'$$app_token': 'glFv4rbJcL4JLD1Q3UJrlDthE',
      }
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
    
    function getContracsI(localidad, anno){
      //console.log(bogota, bogota.features)
      anno = anno || 2016
      var
        promises = []
      ;
      for(var i=0; i<3;i++){
        if(!contracI[localidad] || !contracI[localidad][anno.toString()]){
          promises.push(
            getContracts(anno + i)
          );
        }
      }
      return $q
        .all(promises)
        .then(function(list){
          return contracI[localidad];
        })
      ;
      
      function getContracts(anno){
        console.log(anno, localidad)
        if(!contracI[localidad] || !contracI[localidad][anno.toString()]){
          return loadProveedor(localidad)
            .then(function(proveedor) {
              console.log(localidad)
              contracI[localidad] = contracI[localidad] || {};
              console.log(proveedor, proveedor.encodedURI, 'BOGOTÁ+D.C.+-+ALCALDÍA+LOCAL+CIUDAD+BOLÍVAR' === proveedor.encodedURI)
              var tmpUrlSecopI = urlSecopI + '?nombre_de_la_entidad=' + proveedor.encodedURI;
              return $http({
                url: tmpUrlSecopI,
                type: 'GET',
                params: getParams({
                  //'$limit': 1000000000
                  'anno_cargue_secop': anno,
                  'tipo_de_contrato': 'Obra',
                  //'nombre_de_la_entidad': proveedor.encodedURI
                })
              })
                .then(function (data) {
                  //console.log(localidad, data)
                  contracI[localidad][anno.toString()] = (data && data.data) || [];
                  contracI[localidad].total = contracI[localidad].total || 0;
                  contracI[localidad].total = contracI[localidad].total + ((data && data.data && data.data.length) || 0);
                  return contracI[localidad][anno.toString()];
                }, function (err) {
                  $mdToast.show('Ocurrió un error al tratar de obtener las columnas, por favor contacte al administrador');
                })
                ;
            })
          ;
        }
        return $q.resolve(contracI[localidad][anno.toString()]);
      }
    }
    
    function getContractsII(localidad){
      $http({
        url: urlSecopII,
        type: 'GET',
        params: getParams({
          'nombre_entidad': 'ALCALDÍA LOCAL DE CIUDAD BOLIVAR',
          'tipo_de_contrato': 'Obra',
          '$limit': 10000
        }),
        error: function (xhr, status, error) {
          $mdToast.show('Ocurrió un error al tratar de obtener las columnas, por favor contacte al administrador');
        },
        success: function (data, textStatus, jqXHR) {
          contracII.push(data.length);
        }
      });
    }
    
    function loadProveedor(localidad){
      if(!proveedors[localidad]) {
        return $q.resolve({
          nit: null,
          encodedURI: localidad.replace(/ /ig, '+'),
          nombre: localidad
        });
        /*proveedors[localidad] = $http({
          url: 'https://api.colombiacompra.gov.co/releases/entity',
          type: 'GET',
          params: getParams({
            //'nombre': 'ALCALDIA LOCAL DE CIUDAD BOLIVAR'
            'name': localidad
          })
        })
          .then(function (rta) {
            if(rta.status === 200){
              console.log(rta[0], rta.data[0])
              return rta && rta.data[0] && rta.data[0]._id && {
                nit: rta.data[0]._id.nit,
                nombre: rta.data[0]._id.name
              };
            }
            return $q.reject('bad query');
            //contracII.push(data.length);
          }, function () {
            $mdToast.show('Ocurrió un error al tratar de obtener las columnas, por favor contacte al administrador');
          })
        ;*/
      }
      
      return proveedors[localidad];
    }
    
    function getParams(params){
      return params;
      //return angular.extend(paramsBase, params);
    }
  }
})();