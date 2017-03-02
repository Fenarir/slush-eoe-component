(function () {
    'use strict';

    angular
        .module('eoe.<%= moduleName %>')
        .component('eoe<%= componentNameCapitalised %>', {
            transclude: {
            },
            templateUrl: ResolveUrl('~/Common/AngularJS/components/<%= componentName %>/<%= componentName %>.html'),
            controller: '<%= controllerName %>',
            controllerAs: 'vm',
            bindings: {
            }
        });
})();