// * gulpfile.js
// * task automation system
//
// * possible continuous usage strategies:<br/>
// [1] automated test: 'watch' possibly followed by 'build' or 'generate' <br/>
// [2] manual: traceur/traceur-test etc.; followed by build or generate<br/>
// 
// * occasional:<br/>
// [1] check-versions/update and/or, <br/>
// [2] generate and/or, <br/>
// [3] docco
// 
// * NOTE: watch-auto-test writes tested components into appDest
// * NOTE: build, build-min, update and generate write a tested build 
//   into buildDest <br>
// * NOTE: There is no explicit task 'task-list'. However cmdline 'gulp task-list'
//   will produce a complete list of tasks and dependencies to stdout 
//   (>gulp-task-list.txt for exp.)


// imported task components
var gulp = require("gulp");
var changed = require('gulp-changed');
var jshint = require('gulp-jshint');
var docco = require('gulp-docco');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var exec = require('child_process').exec;
require('gulp-task-list')(gulp);



// directory/file glob-patterns
var srcFiles = [
  './app/scripts_es6/*.js', 
  './app/scripts_es6/**/*.js' 
];
var appFiles = [
  './app/scripts/*.js', 
  './app/scripts/**/*.js' 
];
var testFiles = [
  './test/spec_es6/*.js', 
];
var utilFiles = [
  './test/utils_es6/*.js', 
];
var styleFiles = [
  './app/styles/scss/*.scss'
];
var devFiles = [
  './gulpfile.js', 
  './index.js' 
];
var templateFiles = [
  './app/views/templates/*.html', 
  './app/views/templates/**/*.html' 
];
var svgDefsFiles = [
  './app/views/svg/*.svg', 
  './app/views/svg/**/*.svg' 
];
var webglDefsFiles = [
  './app/views/webgl/*.html', 
  './app/views/webgl/**/*.html' 
];


// write destinations
var appDest = './app/scripts';
var buildDest = './app/build';
var testDest = './test/spec';
var utilDest = './test/utils';
var cssDest = './app/styles/css';
var docDest = './docs/scripts';
var docTestDest = './docs/test/spec';
var docUtilDest = './docs/test/utils';
var docDevDest = './docs/dev';
var templatesDest = './app/views/';





// default task - test:<br>
gulp.task("default", ['traceur']);


// task - watch:<br>
// * watch srcFiles - apply traceur
// * watch testFiles - apply traceur-test
// * watch utilFiles - apply traceur-util
// * watch styleFiles - apply sass
gulp.task('watch', function(event){
  gulp.watch(srcFiles, ['traceur']);
  gulp.watch(testFiles, ['traceur-test']);
  gulp.watch(utilFiles, ['traceur-util']);
  gulp.watch(styleFiles, ['sass']);
});


// task - traceur:<br>
// transpile ES6 srcFiles to ES5 appFiles - uses google traceur transpiler
// * NOTE: annotate adds ['dep', function(dep){}] to angular registration 
// to permit correct minification
gulp.task('traceur', function() {
  return gulp.src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(traceur({sourcemap: true, experimental: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appDest));
});

// task - traceur-test:<br>
// transpile ES6 testFiles to ES5 testFiles - uses google traceur transpiler
gulp.task('traceur-test', function() {
  return gulp.src(testFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(traceur({sourcemap: true, experimental: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(testDest));
});

// task - traceur-util:<br>
// transpile ES6 utilFiles to ES5 utilFiles - uses google traceur transpiler
gulp.task('traceur-util', function() {
  return gulp.src(utilFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(traceur({sourcemap: true, experimental: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(utilDest));
});


// task - jshint:<br>
// * NOTE: jshint is controlled by the options in './.jshintrc'
gulp.task("jshint", function() {
  gulp.src(srcFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
});

// task - jshint-test:<br>
// * NOTE: jshint is controlled by the options in './.jshintrc'
gulp.task("jshint-test", function() {
  gulp.src(testFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
});


// task - sass:<br>
// translates .scss-files to .css-files
gulp.task('sass', function () {
  gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/styles/css'));
});



// task - template-cache:<br>
// concatenates individual html/svg/i3d templates into views/templates.html
gulp.task('templates', ['svg-defs', 'webgl-defs'], function () {
  gulp.src(templateFiles)
    .pipe(concat('templates.html'))
    .pipe(gulp.dest(templatesDest));
});

// task - svg-defs:<br>
// concatenates individual symbols, groups etc. into views/svg-defs.svg
gulp.task('svg-defs', function () {
  gulp.src(svgDefsFiles)
    .pipe(concat('svg-defs.svg'))
    .pipe(gulp.dest(templatesDest));
});

// task - webgl-defs:<br>
// concatenates individual shaders, etc. into views/webgl-defs.js
gulp.task('webgl-defs', function () {
  gulp.src(webglDefsFiles)
    .pipe(concat('webgl-defs.html'))
    .pipe(gulp.dest(templatesDest));
});


// task - docco:<br>
// generate side-by-side: L comments with R source (configurable)
gulp.task('docco', function(){
  gulp.src(srcFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(testFiles)
    .pipe(docco())
    .pipe(gulp.dest(docTestDest));
  gulp.src(utilFiles)
    .pipe(docco())
    .pipe(gulp.dest(docUtilDest));
  gulp.src(devFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDevDest));
});



// task install:<br>
// installs all project dev-dependencies and then dependencies
// * NOTE: assumes that npm is already installed or is global
gulp.task('install', ['npm-install', 'bower-install']);

// task npm-install:<br>
// installs all dev-dependencies listed in package.json for initialization
// writes to ./node_modules
// * NOTE: assumes that npm is already installed or is global
gulp.task('npm-install', function() {
  exec('npm install --save-dev');
});

// task bower-install:<br>
// installs app-dependencies listed in bower.json 
// writes to directory given in ./.bowerrc (usually './app/libs') 
// If no directory is given bower writes to './bower_components'
// * NOTE: useful policy is to use something like the following in .bowerrc: 
// ```javascript
// {
//   "directory": "./app/libs", 
//   "json": "./bower.json"  
// }```
gulp.task('bower-install', function() {
  exec('bower install -S');
});



// task - check-versions:<br>
// check for more recent app-versions then in app/libs, and
// check for more recent dev-versions then in node_modules
gulp.task('check-versions', ['check-npm', 'check-bower']);

// task - check-npm:<br>
// check for more recent dev-versions then in node_modules
// * NOTE: --dev checks dev-dependencies also
// * NOTE: --depth 0 ignores dependencies of loaded packages
// * NOTE: --color should display non-breaking changes in red, breaking in yellow
gulp.task('check-npm', function(){
  exec('npm outdated --dev --depth 0 --color', function(err, stdout, stderr){
    console.log("\n" + stdout);
    console.log("\n" + stderr);
    if(err){console.log(err);}
  });
});

// task - check-bower:<br>
// check for more recent app-versions then in app/libs
gulp.task('check-bower', function(){
  exec('bower list', function(err, stdout, stderr){
    console.log("\n" + stdout);
    console.log("\n" + stderr);
    if(err){console.log(err);}
  });
});



// task - save-versions:<br>
// copies present bower versions (given by 'bower list') to 
// ./history/bower-versions.<timestamp>
// copies present npm node_module versions (given by 'npm list') to 
// ./history/npm-versions.<timestamp>
// Also copies present bower.json, package.json to ./history
// These saves assist recovery if (manually) updating to newer module 
// version introduces an incompatibility
// * NOTE: --dev updates dev-dependencies also
// * NOTE: --save-dev writes module&version into devDependencies of package.json
// * NOTE: --depth 0 ignores dependencies of loaded packages
gulp.task('save-versions', function(){
  //var timestamp = new Date().toJSON().slice(0,-1).replace(/[:|T]/g,'-');
  var today = (new Date().toJSON()).replace(/T.*/, ''),
      now = (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/,
      '').replace(/\..+$/, '').replace(/:/g,'-'),
      ts = today + '-' + now;
      tsdir = 'history/'+ ts;
  exec('mkdir ' + ts);
  exec('mv ' +ts+ ' history');
  setTimeout(function(){
    //exec('npm list --depth 0 > history/npm-versions.' + ts);
    exec('bower list > ' +tsdir+ '/bower-updates');
    exec('cp package.json ' +tsdir+ '/package.json');
    exec('cp bower.json ' +tsdir+ '/bower.json');
    exec('gulp check-versions > ' +tsdir+ '/npm-updates');
  },1000);
});



// task - generate:<br>
// update versions, automated build, build-min, and document
gulp.task('generate', ['sass', 'templates', 'traceur', 'build', 'build-min', 'docco']);

// task - build:<br>
// automated build
gulp.task('build', function () {
   return gulp.src(appFiles)
      .pipe(annotate())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(buildDest));
});

// task - build-min:<br>
// automated build and minification (uglify)
gulp.task('build-min', function () {
   return gulp.src(appFiles)
      .pipe(annotate())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(buildDest));
});





// task - clean:<br>
// clean ./history and ./logs
gulp.task('clean', function () {
  exec('rm ./history/*');
  exec('rm ./logs/*');
});
