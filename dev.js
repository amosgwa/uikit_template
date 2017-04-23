var browserSync = require("browser-sync").create();
var exec = require('child_process').exec;

var path = {
  app: "./app",
  html: {
    src: "./app/*.html"
  },
  styles: {
    css: "./app/css/*.css",
    scss: "./dev/scss/*.scss"
  },
  scripts: {
    src: './app/js/*.js'
  }
}

// Watch SCSS files
browserSync.watch(path.styles.scss, function (event, file) {
  if (event === "change") {
    var npm_command = "npm run sass";
    // Compile SCSS to CSS.
    exec(npm_command, function(err){
      if(err) return cb(err);
      // Inject the updated CSS.
      browserSync.reload( path.styles.css);
    });
  }
});

// Watch HTML files
browserSync.watch(path.html.src, browserSync.reload);

// Watch JavaScript files
browserSync.watch(path.scripts.src, browserSync.reload);

// Now init the Browsersync server
browserSync.init({
    server: path.app
});