(function () {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .component('<%= componentNameCapitalised %>', {
            controller: '<%= controllerName %>',
            controllerAs: 'vm',
            templateUrl: ['resolveUrl', function (resolveUrl) {
                return resolveUrl.resolve({
                    url: 'update/this/path/<%= componentName %>/<%= componentName %>.html'
                });
            }],
            transclude: {
            },
            bindings: {
            }
        });
})();