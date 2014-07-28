define(['jquery'], function ($) {
    return function () {
        return {
            get: function (parameters) {
                return $.get(parameters.url);
            }
        };
    };
});
