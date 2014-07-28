define([
        'qunit', 
        'squire',
        'jquery', 
        'sinon'], function (qunit, Squire, $, sinon) {
    'use strict';

    qunit.stop();

    new Squire()
        .mock('jquery', $)
        .require(['src/http/HttpClient'], function (HttpClient) {
            qunit.start();

            qunit.module('http client');

            qunit.test('http get returns a promise', function () {
                var jqueryGetStub, httpClient;

                jqueryGetStub = sinon.stub($, 'ajax');

                httpClient = new HttpClient();

                ok(httpClient !== null, 'should have created an HttpClient');
                
                httpClient.get({url: 'wat.com'});

                sinon.assert.calledWithMatch(jqueryGetStub, {type: 'get', url: 'wat.com'});

                jqueryGetStub.restore();
            });
        });
});
