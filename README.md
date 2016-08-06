# gulp-html-bower
Parse HTML file and copy bower files to your public directory

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

gulp.task('bower', function() {
    gulp.src('test/src/index.html')
        .pipe(htmlBower({
            base: '/vendor',    // Bower base URL
            dest: 'dest/vendor' // Path to copied bower files
        }))
        .pipe(gulp.dest('build'));
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
