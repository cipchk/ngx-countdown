const gulp = require('gulp');
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const bump = require('gulp-bump');
const inline_recources = require('./scripts/inline-resources');
// @ts-ignore
const VERSION = require('./package.json').version;

const paths = {
    build: './.ng_build',
    lib: './.lib'
};

gulp.task('copy-sources', copySources);
gulp.task('inline-resources', copyResources);
// @ts-ignore
gulp.task('bundle', bundleUmd);
gulp.task('bump', bumpVersions);

function bumpVersions() {
    gulp.src([ './package.json'], {base: './'})
        .pipe(bump({
            version: VERSION
        }))
        .pipe(gulp.dest('./'));
}
function copySources() {
    gulp.src('./src/**/*')
        .pipe(gulp.dest(paths.build));
}

function copyResources() {
  gulp.src([
        `./LICENSE`,
        `./README.md`,
        `./rollup.config.js`,
        `./package.json`,
        `${paths.build}/**/*.html`,
        `${paths.build}/**/*.css`,
        `${paths.build}/**/*.less`,
        `${paths.build}/**/*.scss`
    ])
    .pipe(gulp.dest(paths.lib))
    .on('end', () => inline_recources(paths.lib));
}

function bundleUmd() {
    bundle(`${paths.lib}/`);
}

function bundle(path) {
    const config = require(path + 'rollup.config.js');
    gulp.src(path + `**/*.js`)
        .pipe(rollup(Object.assign({}, config, {
            name: config.name,
            input: `${path}index.js`
        })))
        .pipe(rename(config.output))
        .pipe(gulp.dest(`${path}bundles`));
}
