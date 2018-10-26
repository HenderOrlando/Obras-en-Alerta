
(function(){
  'use strict';
  
  /**
   * @ngdoc function
   * @name obraenalertaApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the obraenalertaApp
   */
  angular.module('obraenalertaApp')
    .controller('MainCtrl', [
      'Secop',
      '$scope',
      '$mdDialog',
      'leafletData',
      'localidadesBogota',
      MainCtrl
    ]);
  
  function MainCtrl(Secop, $scope, $mdDialog, leafletData, bogota) {
    var
      vm = this,
      map = null,
      info = null
    ;
    
    angular.forEach(bogota, function(localidades){
      angular.forEach(localidades, function(val){
        console.log(val)
        if(val && val.type){
          Secop.I(('BOGOTÁ D.C. - ALCALDÍA LOCAL ' + val.properties.NOMBRE).toUpperCase(), 2016);
        }
      });
    });
    
    leafletData
      .getMap('map-bogota')
      .then(function (map_) {
        map = map_;
        //console.log(map)
      
        /*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 11,
          minZoom: 10,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors ',
          id: 'mapbox.light'
        }).addTo(map);*/
  
        addMapLocalidadesBogota(map);
        
      
        addInfo(map);
      
        addLegend(map);
      })
    ;
    angular.extend($scope, {
      maxZoom: 11,
      minZoom: 10,
      bogota: {
        lat: 4.31,
        lng: -74.2,
        zoom: 10
      },
      defaults: {
        scrollWheelZoom: false
      },
      geojson: {
        data: bogota,
        resetStyleOnMouseout: true,
        style: {
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        }
        //onEachFeature: onEachFeature
      }
    });
    
    
    function addLegend(map) {
      var legend = L.control({position: 'bottomleft'});
    
      legend.onAdd = function (map_) {
      
        var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 500, 1000],
          labels = ["Cantidad de Contratos"],
          from, to;
      
        for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          to = grades[i + 1];
          labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
        }
      
        div.innerHTML = labels.join('<br>');
        return div;
      };
    
      legend.addTo(map);
    }
    
    function addInfo(map){
      info = L.control();
  
      info.onAdd = function (map_) {
        this._div = L.DomUtil.create('div', 'md-info');
        this.update();
        return this._div;
      };
      info.update = function (props) {
        var este = this;
        if(props){
          if(!props.Contratos){
            Secop
              //.I(('BOGOTÁ D.C. - ALCALDÍA LOCAL ' + props.NOMBRE).toUpperCase(), bogota)
              .I(('BOGOTÁ D.C. - ALCALDÍA LOCAL ' + props.NOMBRE).toUpperCase(), 2016)
              .then(function(data){
                //console.log(data)
                props.Contratos = data.total;
                //bogota.features[11].properties.Contratos = 317200;
                return data[0];
              })
              .then(function(data){
                updateInfo(este, props);
              })
              ;
          }else{
            updateInfo(este, props);
          }
        }
      };
      info.addTo(map);
      
      function updateInfo(este, props){
        este._div.innerHTML = props ? '' +
          '<div class="md-media-xs">' +
          '  <img class="md-logo" src="images/logo.png"/>' +
          '</div>' +
          '<div class="md-title">' +
          '  <h4>Alcaldía Local de<br>' + props.NOMBRE + '</h4>' +
          //'  <b>' + props.NOMBRE + '</b><br />' + props.Contratos + ' people / mt<sup>2</sup>' +
          props.Contratos + ' contratos' +
          '</div>' +
          ''
          : 'Visita cada localdiad para ver la contración en Obras Publicas'
        ;
      }
    }
    
    function addMapLocalidadesBogota(map){
      var geojson = L.geoJson(bogota, {
        style: getStyle,
        onEachFeature: onEachFeature
      }).addTo(map);
      /*L.geoJson(bogota, {
        style: {
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
        }
      }).addTo(map);*/
      
      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
  
        function zoomToFeature(evt) {
          
          $mdDialog.show({
            controller: 'EntityCtrl',
            controllerAs: 'entity',
            templateUrl: 'views/entity.html',
            parent: angular.element(document.body),
            targetEvent: evt,
            locals: {
              localidad: feature
            },
            clickOutsideToClose: true,
            fullscreen: true
          })
            .then(function (answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
              $scope.status = 'You cancelled the dialog.';
            });
          //map.fitBounds(e.target.getBounds());
        }
      }
  
      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }
  
      function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
    
        info.update(layer.feature.properties);
      }
  
      function getStyle(feature) {
        //console.log(feature)
        return {
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
          fillColor: getColor(feature.properties.Contratos)
        };
      }
  
    }
    
    function getColor(d) {
      return d > 1000 ? '#FF3333' :
        d > 500 ? '#FF9966' :
          '#FFFF99';
    }
  }
})();