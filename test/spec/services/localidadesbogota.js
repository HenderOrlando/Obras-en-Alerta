'use strict';

describe('Service: localidadesBogota', function () {

  // load the service's module
  beforeEach(module('obraenalertaApp'));

  // instantiate service
  var localidadesBogota;
  beforeEach(inject(function (_localidadesBogota_) {
    localidadesBogota = _localidadesBogota_;
  }));

  it('should do something', function () {
    expect(!!localidadesBogota).toBe(true);
  });

});
