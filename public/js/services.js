'use strict';

/* hf services */

var hfServices = angular.module('hfServices', ['ngResource']);

hfServices.factory('Product', ['$resource',
    function($resource){
        return $resource('/products/:id.json', {}, {
            query: {method:'GET', params:{productId:'products'}, isArray:true}
        });
    }]);
