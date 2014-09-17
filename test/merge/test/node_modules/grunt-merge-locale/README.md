
# grunt-merge-json

Grunt Task for Merging Multiple JSON Files

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/)
before, be sure to check out the [Getting
Started](http://gruntjs.com/getting-started) guide, as it explains how
to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process,
you may install this plugin with this command:

```shell
npm install grunt-merge-locale --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-merge-locale');
```

## Task Options

- `replacer`: (default `null`) the replacer argument for `JSON.stringify()` (second argument).
- `space`: (default `true`) the space argument for `JSON.stringify()` (third argument).
- `includeFilename`: (default `true`) add the file name as the parent node in the json file when merging the contents of the source file
- `destFileName`: (default `rb`) file name of the destination file
- `destFileExt`: (default `json`) file extension of the resulting locale file


## Merge JSON Task

_Run this task with the `grunt merge-local` command._

Task targets, files and options may be specified according to the Grunt
[Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

## Usage Example

Assuming we have the following types of source JSON files:

- `src/locale/en/foo.json`:

```json
{
    "title": "The Foo",
    "name":  "A wonderful component"
}
```

- `src/locale/en/bar.json`:

```json
{
    "title": "The Bar",
    "name":  "An even more wonderful component"
}
```

Assuming we want to generate the following destination JSON file:

- `dest/locale/en/rb.json`:

```json
{
    "foo": {
        "title": "The Foo",
        "name":  "A wonderful component"
    },
    "bar": {
        "title": "The Bar",
        "name":  "An even more wonderful component"
    }
}
```

### Grunt Config

```js
grunt.initConfig({
    "merge-locale": {
         options:{
          includeFilename: true
        },
        dist: {
           srcDir: 'src/locales/',
           dest: 'dest/locales/'
        }
    }
});
```

