'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp-help')(require('gulp'));
const isparta = require('isparta');
const istanbul = require('gulp-istanbul');
const jsdoc = require('gulp-jsdoc3');
const mocha = require('gulp-mocha');
const sequence = require('run-sequence');
const babelRegister = require('babel/register');

const GULP_FILE = ['gulpfile.js'];
const SRC_FILES = ['src/**/*.js'];
const TEST_FILES = ['test/**/*.js'];
const TEST_CASE_FILES = ['test/**/*.test.js'];

const BUILD_DIR = 'docs';
const BUILD_COVERAGE_REPORT_DIR = `${BUILD_DIR}/coverage`;
const BUILD_JSDOC_DIR = `${BUILD_DIR}/jsdoc`;

gulp.task('lint', 'Validates code with "eslint"', function (done) {
  gulp.src(GULP_FILE.concat(SRC_FILES, TEST_FILES))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('finish', done);
});

gulp.task('test', 'Runs tests and generates code coverage report', function (done) {
  process.env.NODE_ENV = 'test';
  gulp.src(SRC_FILES)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(TEST_CASE_FILES)
        .pipe(mocha({compilers: {js: babelRegister}}))
        .pipe(istanbul.writeReports({
          dir: BUILD_COVERAGE_REPORT_DIR
        }))
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 80
          }
        }))
        .on('finish', done);
    });
});

gulp.task('jsdoc', 'Generates jsdoc', function (done) {
  gulp.src(SRC_FILES, {read: false})
    .pipe(jsdoc({
      opts: {destination: BUILD_JSDOC_DIR},
      templates: {
        theme: 'cerulean'
      }
    }, done));
});

gulp.task('build', 'Validates source code and provides the reports', function (done) {
  sequence('lint', 'test', 'jsdoc', done);
});

gulp.task('default', ['build']);
