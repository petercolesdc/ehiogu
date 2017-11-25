var gulp            = require("gulp")
    sass            = require("gulp-sass")
    autoprefixer    = require("gulp-autoprefixer")
    sassGlob        = require('gulp-sass-glob')
    hash            = require("gulp-hash")
    del             = require("del")
    nunjucksRender  = require("gulp-nunjucks-render")
    fs              = require("fs")
    runSequence     = require("run-sequence")
    var browserSync = require("browser-sync").create();

    // Concat CSS
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

    // Concat javascript
    gulp.task("js", function () {
        del(["app/static/js/**/*"])
        gulp.src("app/themes/judy/static/js/**/*")
          .pipe(hash())
          .pipe(gulp.dest("static/js"))
          .pipe(hash.manifest("hash.json"))
          .pipe(gulp.dest("app/data/js"))
    })

    // Watch asset folder for changes
    gulp.task("watch", ["scss", "js"], function () {
        gulp.watch("app/themes/judy/static/css/**/*", ["scss"])
        gulp.watch("app/themes/judy/static/js/**/*", ["js"])
    })

    // -----------------------------
    // Patterns tasks
    // -----------------------------

    // Copy style layer into public patterns
    gulp.task("copy", function () {
      //del(["patterns/templates/components/**/*"])
      //del(["patterns/public/css/**/*"])
      //del(["patterns/public/js/**/*"])
      gulp.src("app/themes/judy/layouts/partials/components/**/*")
        .pipe(gulp.dest("patterns/templates/components"))
      gulp.src("app/static/css/style.css")
        .pipe(gulp.dest("patterns/public/css"))
      gulp.src("app/static/js/**/*")
          .pipe(gulp.dest("patterns/public/js"))
    })

    // Render patterns templates
    gulp.task("render", function () {
      gulp.src("patterns/templates/*.html")
        .pipe(nunjucksRender({
          path: ["patterns/templates"]
        }))
        .pipe(gulp.dest("patterns/public"))
      gulp.src("patterns/theme/ui.css")
        .pipe(gulp.dest("patterns/public/theme"))
    })

    gulp.task("watch-render", ["render"], function () {
        gulp.watch("patterns/theme/ui.css", ["render"])
        gulp.watch("patterns/templates/**/*", ["render"])
    })

    // -----------------------------

    // Patterns server
    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "patterns/public",
                //files: ["patterns/public/theme/ui.css", "patterns/public/css/style.css"]
            }
        });
    });

    // --------------------------
    // Task runners syntax
    // --------------------------

    // Default (watch HUGO)
    gulp.task("default", ["watch"])
    gulp.task("patterns-serve", ["watch-render"])
