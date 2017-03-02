(function () {
    'use strict';

    angular
        .module('eoe.<%= moduleName %>')
        .controller('<%= controllerName %>', <%= controllerName %>);

    <%= controllerName %>.$inject = ['$log'];

    function <%= controllerName %>($log) {
        var vm = this,
			defaults = {};
        
		vm.$onInit = $onInit;

        ////////////

        function $onInit() {
            setDefaults();
            robustnessCheck();
        }

        function setDefaults() {
        }

        function robustnessCheck() {
            //if () {
            //    $log.warn("component.<%= componentName %>.js");
            //}
        }
    }
})();
