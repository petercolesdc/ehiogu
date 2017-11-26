var gulp            = require("gulp")
    sass            = require("gulp-sass")
    autoprefixer    = require("gulp-autoprefixer")
    sassGlob        = require('gulp-sass-glob')
    hash            = require("gulp-hash")
    del             = require("del")
    nunjucksRender  = require("gulp-nunjucks-render")
    fs              = require("fs")
    runSequence     = require("run-sequence")
    exec            = require("child_process").exec;
    browserSync     = require("browser-sync").create();

    // Concat and copy CSS
    gulp.task("scss", function () {
        del(["app/static/css/**/*"])
        gulp.src("app/themes/judy/static/css/**/*.scss")
          .pipe(sassGlob())
          .pipe(sass({outputStyle : "expanded"}))
          .pipe(autoprefixer({browsers : ["last 6 versions"]}))
          .pipe(gulp.dest("app/static/css"))

          // Cache busted CSS
          .pipe(sass({outputStyle : "compressed"}))
          .pipe(hash())
          .pipe(gulp.dest("app/static/css"))

          //Create a hash map
          .pipe(hash.manifest("hash.json"))

          //Put the map in the data directory
          .pipe(gulp.dest("app/data/css"))
    })

    // Concat and copy javascript
    gulp.task("js", function () {
        del(["app/static/js/**/*"])
        gulp.src("app/themes/judy/static/js/**/*")
          .pipe(hash())
          .pipe(gulp.dest("appp/static/js"))
          .pipe(hash.manifest("hash.json"))
          .pipe(gulp.dest("app/data/js"))
    })

    // Assets copy
    gulp.task("assets", function () {
        gulp.src("app/themes/judy/static/assets/**/*")
          .pipe(gulp.dest("app/static/assets"))
    })

    // Watch asset folder for changes
    gulp.task("watch", ["scss", "js", "assets"], function () {
        gulp.watch("app/themes/judy/static/css/**/*", ["scss"])
        gulp.watch("app/themes/judy/static/js/**/*", ["js"])
        gulp.watch("app/themes/judy/static/assets/**/*", ["assets"])
    })

    // -----------------------------
    // Patterns tasks
    // -----------------------------

    // Delete everything prior to rebuilding
    gulp.task("delete", function() {
       del(["app/public/"])
       del(["app/static/assets/"])
       del(["patterns/components/"])
       del(["patterns/assets/"])
    })

    // Copy what we need into patterns
    gulp.task("copy", function () {
        gulp.src("app/public/components/**/*")
          .pipe(gulp.dest("patterns/templates/components"))
        gulp.src("app/public/css/style.css")
          .pipe(gulp.dest("patterns/public/css"))
        gulp.src("app/public/js/**/*")
          .pipe(gulp.dest("patterns/public/js"))
        gulp.src("app/public/assets/**/*")
          .pipe(gulp.dest("patterns/assets/"))
    })

    // Render patterns templates
    gulp.task("render", function () {
      gulp.src("patterns/templates/*.html")
        .pipe(nunjucksRender({
          path: ["patterns/templates"]
        }))
        .pipe(gulp.dest("patterns/public"))
      gulp.src("patterns/theme/**/*")
        .pipe(gulp.dest("patterns/public/theme"))
      gulp.src("patterns/assets/**/*")
          .pipe(gulp.dest("patterns/public/assets"))
    })

    // ...and watch for changes
    gulp.task("watch-render", ["render"], function () {
        gulp.watch("patterns/theme/ui.css", ["render"])
        gulp.watch("patterns/templates/**/*", ["render"])
    })

    // Spin up patterns server
    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "patterns/public",
            }
        });
    });

    // --------------------------
    // Hugo runners
    // --------------------------

    // Start Hugo
    gulp.task('hugo-watch', function (fetch) {
        return exec('hugo server -v -s app', function (err, stdout, stderr) {
            // console.log(stdout); // See Hugo output
            // console.log(stderr); // Debugging feedback
            fetch(err);
        });
    })

    // Run Hugo to copy finished files over to public folder
    gulp.task('hugo-static', function (fetch) {
        return exec('hugo -s app', function (err, stdout, stderr) {
            // console.log(stdout); // See Hugo output
            // console.log(stderr); // Debugging feedback
            fetch(err);
        });
    })

    // --------------------------
    // Task runners syntax
    // --------------------------

    // Default spins up Hugo and watches
    //gulp.task("default", ["hugo-watch", "watch"])

    // Hugo syntax
    gulp.task('hugo', function(callback) {
      runSequence('assets', ['hugo-watch', 'watch'], callback);
    });


    // Re-build patterns
    gulp.task('build', function(callback) {
      runSequence('delete', 'hugo-static', 'copy', 'assets', callback);
    });

    // Serve up patterns
    gulp.task("patterns", ["browser-sync", "watch-render"])


    // Callback (not totally sure what this does TBH)
    gulp.task('callback', function(callback) {
        // Use the callback in the async function
        fs.readFile('...', function(err, file) {
            console.log(file);
            callback();
        });
    });
