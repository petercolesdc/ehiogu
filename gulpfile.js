var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer")
    sassGlob     = require('gulp-sass-glob');
    hash         = require("gulp-hash"),
    del          = require("del")
    indent       = require("gulp-indent");

    // Concat CSS
    gulp.task("scss", function () {
        del(["app/static/css/**/*"])
        gulp.src("app/themes/judy/static/css/**/*.scss")
          .pipe(sassGlob())
          .pipe(sass({outputStyle : "expanded"}))
          .pipe(autoprefixer({browsers : ["last 6 versions"]}))
          .pipe(gulp.dest("app/static/css"))

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

    // indent
    gulp.task("indent", function() {
      gulp.src("app/themes/judy/static/css/**/*")
        .pipe(indent({
            tabs:true,
            amount:2
        }))
        .pipe(gulp.dest("app/themes/judy/static/css/**/*"));
    })

    // Copy stuff for patterns
    gulp.task("copy", function() {
      del(["patterns/elements/**/*"])
      del(["patterns/theme/css/**/*"])
      gulp.src("app/themes/judy/layouts/partials/components/**/*")
        .pipe(gulp.dest("patterns/components"))
      gulp.src("app/static/css/**/*")
          .pipe(gulp.dest("patterns/theme/css"))
    })

    // --------------------------
    // Task runners
    // --------------------------

    // Default (watch)
    gulp.task("default", ["watch"])

    // Indent stuff
    gulp.task("indent", ["indent"])

    // Copy stuff to patterns
    gulp.task("patterns", ["copy"])
