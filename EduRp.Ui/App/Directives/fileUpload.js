(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .directive('fileUpload', fileUpload);

    fileUpload.$inject = ['$parse'];

    function fileUpload($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.fileUpload);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };

        return {
            link: fn_link
        }
    }

})();