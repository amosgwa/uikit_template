var gulp = require('gulp');
var browserSync = require("browser-sync");
var exec = require('child_process').exec;

var path = {
  app: "./app",
  html: {
    src: "./app/*.html"
  },
  styles: {
    css: "./app/css/",
    scss: "./dev/scss/"
  },
  scripts: {
    src: './app/js/'
  }
}

function runServer() {
  // Start the server
  browserSync({server: path.app});
}

function watch() {
  gulp.watch(path.styles.scss + '*.scss', runSass);
  gulp.watch(path.html.src, reloadBrowser)
}

function runSass(){
  var npm_command = "npm run sass";
  exec(npm_command, function(err){
    if(err) return cb(err);
    // Inject the updated CSS.
    browserSync.reload( path.styles.css+ "/main.css");
    console.log("Sass successfully converted.")
  })
}

function reloadBrowser(){
  browserSync.reload();
}

var build = gulp.parallel(runServer, watch)
gulp.task('default', build);

