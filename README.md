# gulp-html-bower
Parse HTML file and copy bower files to your public directory

## Install

`npm install --save-dev gulp-html-dependencies`

## Usage

```html

<!doctype html>
<html>
    <head>
        <title>Test file</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
    </head>
    <body>
        <h1>Page title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus enim leo, ac lacinia purus accumsan sit amet. In ultrices sagittis nulla, ut dapibus.</p>
        
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="plugins.js"></script>
    </body>
</html>

```

In your `gulpfile.js`, add the task:

```js

var gulp = require('gulp')
  , htmlBower = require('gulp-html-bower');

var path_dest = 'dist';

gulp.task('bower', function() {
    return gulp.src('src/index.html')
        .pipe(htmlBower({
            basedir: path_dest  // The basedir of your application. default: the current file directory
            prefix: '/vendor',  // The URL prefix. Default "/"
        }))
        .pipe(gulp.dest(path_dest));
});

// Gulp Default Task
gulp.task('default', ['bower']);

```

After build, get:

```html

<!doctype html>
<html>
    <head>
        <title>Test file</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/vendor/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/vendor/bootstrap/dist/css/bootstrap-theme.min.css">
    </head>
    <body>
        <h1>Page title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus enim leo, ac lacinia purus accumsan sit amet. In ultrices sagittis nulla, ut dapibus.</p>
        
        <script src="/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/vendor/jquery/dist/jquery.min.js"></script>
        <script src="plugins.js"></script>
    </body>
</html>

```

## License

Under the MIT license. See [LICENSE](https://github.com/demsking/gulp-html-bower/blob/master/LICENSE) file for more details.
