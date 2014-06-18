/*
 * Requirejs plugin for loading twigjs (https://github.com/justjohn/twig.js)
 * template functions for marionette.
 *
 * This is practically a copy with slight modifications of Miller Medeiros
 * https://github.com/millermedeiros/requirejs-plugins
 *
 * Dependencies:
 * - requirejs/test https://github.com/requirejs/text
 * - twig.js https://github.com/justjohn/twig.js
 *
 * @author Tim Joseph
 * @version 0.0.1 (2014/02/8)
 */
define(['text', 'twig', 'underscore'], function(text, Twig, _) {

    var buildMap = {};

    // API
    return {
        load: function(name, req, onLoad, config) {

            // This plugin loads any files, just be shure they have
            // correct markup

            text.get(req.toUrl(name), function(data) {
                if (config.isBuild) {
                    buildMap[name] = data;
                    onLoad(data);
                }
                else {
                    // Create the twigjs template
                    var template = Twig.twig({
                        data: data
                    });
                    // Bind the render function to its template
                    var render = _.bind(template.render, template);
                    // Return the bound function
                    onLoad(render);
                }
            });

        },

        write: function(pluginName, moduleName, write) {

            if (buildMap.hasOwnProperty(moduleName)) {

                var name = pluginName + '!' + moduleName;
                var content = buildMap[moduleName];
                var template = Twig.twig({
                    data: content,
                    id:name
                });

                var compiled = template.compile({
                    twig:'twig',
                //    module:'amd', //we not use twigjs amd export, as we need add dependencies
                });

               var amd_define =  'define("'+name+'",["twig","underscore"], function (Twig,_) {\n\tvar twig, template;\ntwig = Twig.twig;\ntemplate = ' + compiled + ';\n\t var render = _.bind(template.render, template);\n\t return render;\n});';
               write(amd_define);
            }
        }

    }

});
