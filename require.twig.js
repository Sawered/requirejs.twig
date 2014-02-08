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
            // This plugin only loads .twig files
            name = name + '.twig';

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
            if (moduleName in buildMap) {
                var content = buildMap[moduleName];
                write('define("' + pluginName + '!' + moduleName + '", function(){ return ' + content + ';});\n');
            }
        }

    }

});