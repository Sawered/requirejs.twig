requirejs.twig
==============

A require.js plugin to load twig.js render functions

*Note:* BC breaks prior version 1.0 plugin have returned template.renderer itself

## use with Backbone view

    define(['requirejs.twig','twigjs!/path/to/template.html.twig','backbone'],function(twigjs,template,Backbone){
    
    
        return Backbone.View.extend({
            'template': template.renderer
        });
        //you can use template as you wish, as it raw Twig.Template object
    });
