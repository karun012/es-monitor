define(['react', 
        'src/HealthCheckWidget', 
        'qunit',
        'sinon',
        'src/http/HttpClient',
        'jquery'], function (React, HealthCheckWidget, qunit, sinon, HttpClient, $) {

    var sampleESHealthData, scry, find, click;

    sampleESHealthData = {
                    "status": 200,
                    "name": "Orka",
                    "version": {
                        "number": "1.3.0",
                        "build_hash": "1265b1454eee7725a6918f57415c480028700fb4",
                        "build_timestamp": "2014-07-23T13:46:36Z",
                        "build_snapshot": false,
                        "lucene_version": "4.9"
                    },
                    "tagline": "You Know, for Search"
                };

    scry = React.addons.TestUtils.scryRenderedDOMComponentsWithTag;
    find = React.addons.TestUtils.findRenderedDOMComponentWithClass;
    click = React.addons.TestUtils.Simulate.click;

    qunit.module('health check widget');

    qunit.test('gets the health of the elastic search instance when created', function () {
        var widget, httpClient;

        httpClient = new HttpClient();

        sinon.stub(httpClient, 'get').returns($.Deferred());

        widget = HealthCheckWidget.create({httpClient: httpClient});

        React.addons.TestUtils.renderIntoDocument(widget);

        qunit.ok(widget !== null);

        sinon.assert.calledWithMatch(httpClient.get, {url: 'http://localhost:9200/'});
    });

    qunit.test('renders status of the elastic search instance if it is up, and running', function () {
        var widget, httpClient, getPromise;

        getPromise = $.Deferred();

        httpClient = new HttpClient();

        sinon.stub(httpClient, 'get').returns(getPromise);

        widget = HealthCheckWidget.create({httpClient: httpClient});

        getPromise.resolve(sampleESHealthData);

        React.addons.TestUtils.renderIntoDocument(widget);

        qunit.equal(find(widget, 'status').getDOMNode().textContent, '200');
        qunit.equal(find(widget, 'name').getDOMNode().textContent, 'Orka');
        qunit.equal(find(widget, 'version-number').getDOMNode().textContent, '1.3.0');
        qunit.equal(find(widget, 'version-lucene_version').getDOMNode().textContent, '4.9');
    });
});
