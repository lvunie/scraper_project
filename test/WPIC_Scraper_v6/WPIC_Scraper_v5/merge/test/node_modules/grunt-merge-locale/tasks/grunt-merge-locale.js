/*
**  grunt-merge-locale -- Grunt Task for Merging Multiple Locale JSON Files
**  Copyright (c) 2013 Tomas Gutierrez <tomgutzjr@gmail.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var path = require('path'),
    fs = require('fs');

/* global module: false */
module.exports = function(grunt) {
  grunt.registerMultiTask("merge-locale", "Merge Multiple JSON Files", function() {
      /*  prepare options  */
      var options = this.options({
        replacer: null,
        space: "\t",
        includeFilename: true,
        destFileName: 'rb',
        destFileExt: 'json'
      });
      grunt.verbose.writeflags(options, "Options");

      var srcDir = this.data.srcDir,
          dest = this.data.dest,
          dirs = fs.readdirSync(srcDir),
          _ = grunt.util._;
      try {
          _.each(dirs, function(dir) {
            
            var files = fs.readdirSync(path.resolve(srcDir, dir)),
                json = {},
                destDir = path.resolve(dest, dir),
                destPath = path.resolve(destDir, options.destFileName + '.' + options.destFileExt);

            _.each(files, function(file) {
              var absPath = path.resolve(srcDir, dir, file);
              if (!grunt.file.exists(absPath)){
                throw "JSON source file \"" + absPath + "\" not found.";
              }
              else {
                var fragment = {},
                    fname = path.basename(file, '.json');

                grunt.log.debug("Reading JSON source file \"" + absPath);

                try {
                  var content = grunt.file.readJSON(absPath);
                  if (options.includeFilename) {
                    fragment[fname] = content;
                  } else {
                    fragment = content;
                  }
                } catch (e) {
                  grunt.fail.warn(e);
                }

                json = _.extend(json, fragment);
              }
                
            });
            /*  write object as new JSON  */
            grunt.log.debug("Writing Locale JSON destination file \"" + destPath);
            grunt.file.write(destPath, JSON.stringify(json, options.replacer, options.space));
            grunt.log.ok("Locale destination file \"" + destPath + "\" created.");
            
          });
      } catch (e) {
        grunt.fail.warn(e);
      }
    });
}