var require = {
    baseUrl: '..',
    paths: {
        'jquery': 'lib/jquery-2.1.1',
        'underscore': 'lib/underscore',
        'qunit': 'lib/qunit-1.14.0',
        'sinon': 'lib/sinon-1.10.0',
        'react': 'lib/react-with-addons-0.10.0',
        'superagent': 'lib/superagent-0.18.0',
        'backbone': 'lib/backbone',
        'squire': 'lib/squire',
        'bootstrap': 'lib/bootstrap.min'
    },
    shim: {
        'qunit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        'sinon': {
            exports: 'sinon'
        },
        'squire': {
            exports: 'squire'
        },
        'bootstrap': {
            exports: 'bootstrap'
        }
    }
};
