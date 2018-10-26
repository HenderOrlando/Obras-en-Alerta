'use strict';

describe('Service: Secop', function () {

  // load the service's module
  beforeEach(module('obraenalertaApp'));

  // instantiate service
  var Secop;
  beforeEach(inject(function (_Secop_) {
    Secop = _Secop_;
  }));

  it('should do something', function () {
    expect(!!Secop).toBe(true);
  });

});
