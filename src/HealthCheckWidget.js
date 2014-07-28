define(['react', 'underscore'], function (React, _) {
    var dom = React.DOM;

    var healthStatKeys = ['status', 'name', 'version-number', 'version-lucene_version'];
    var healthStatLabels = {
                               'status': 'Status',
                               'name': 'Name', 
                               'version-number': 'Version Number',
                               'version-lucene_version': 'Lucene Version'
                           };

    var HealthStat = React.createClass({
        displayName: 'HealthStat',
        render: function () {
            var statName, statValue
            statName = dom.span({className: this.props.key + ' ' + 'label'}, (_.result(healthStatLabels, this.props.key)));
            statValue = dom.span({className: this.props.key + ' ' + 'value'}, (this.props.value));

            return dom.div({}, statName, statValue);
        }
    });

    var HealthStats = React.createClass({
        displayName: 'HealthStats',
        render: function () {
            var widget, healthStats;
            widget = this;
            healthStats = _.map(healthStatKeys, function (key) {
                var split, value;
                split = key.split('-');
                if (split.length === 1) {
                    var key = split[0];
                    value = _.result(widget.props.healthStats, key);
                } else if (split.length === 2){
                    var firstKey, secondKey, value;
                    firstKey = split[0];
                    secondKey = split[1];

                    value = _.chain(widget.props.healthStats)
                              .result(firstKey)
                              .result(secondKey)
                              .value();
                }

                return HealthStat({key: key, value: value});
            });
            return dom.div({}, healthStats);
        }
    });

    var HealthCheckWidget = React.createClass({
        displayName: 'HealthCheckWidget',
        getInitialState: function () {
            return {
                healthStats: {}
            };
        },
        componentWillMount: function () {
            var widget = this;

            this.props.httpClient.get({url: 'http://localhost:9200/'}).done(function (widgetState) {
                widget.setState({healthStats: widgetState});
            });
        },
        render: function () {
            var healthStats = HealthStats({healthStats: this.state.healthStats});
            return dom.div({}, healthStats);
        }
    });
    return {
        create: HealthCheckWidget
    };
});
