(function () {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .component('<%= namespace + componentNameCapitalised %>', {
            controller: '<%= controllerName %>',
            controllerAs: 'vm',
            templateUrl: ['resolveUrl', function (resolveUrl) {
                return resolveUrl.resolve({
                    url: 'Common/AngularJS/components/<%= componentName %>/<%= componentName %>.html'
                });
            }],
            transclude: {
            },
            bindings: {
            }
        });
})();