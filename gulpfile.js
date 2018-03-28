const gulp = require('gulp')
const sass = require('gulp-sass')
const bs = require('browser-sync').create()
const hb = require('gulp-hb')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

function compile () {
  return gulp
    .src('./src/views/*.html')
    .pipe(hb()
      .partials('./src/views/partials/**/*.hbs')
    // .helpers('./src/helpers/*.js') // TODO: add helpers
      .data({
        title: 'Default Title'
      })
      .data('./src/data/*.json')
    )
    .pipe(gulp.dest('./www'))
}

gulp.task('compile', compile)

gulp.task('browser-sync', ['build'], function () {
  bs.init({
    server: {
      baseDir: './www'
    }
  })
})

gulp.task('scripts', function (callback) {
  webpack(webpackConfig(), (err, stats) => {
    if (err) throw new Error('webpack' + err)
    callback()
  })
})

gulp.task('sass', function () {
  return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('www/styles'))
    .pipe(bs.reload({stream: true}))
})

gulp.task('build', ['compile', 'sass', 'scripts'])

gulp.task('default', ['compile', 'sass', 'scripts', 'browser-sync'], function () {
  gulp.watch('src/styles/*.scss', ['sass'])
  gulp.watch('src/**/*.{html,hbs}').on('change', compile)
  gulp.watch('www/*.html').on('change', bs.reload)
})
