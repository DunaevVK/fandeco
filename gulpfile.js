const { src, dest, watch, series, parallel } = require("gulp")
const del = require("del")
const sass = require("gulp-sass")(require("sass"))
const rename = require("gulp-rename")
const browserSync = require("browser-sync").create()
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const mmq = require("gulp-merge-media-queries")
const autoprefixer = require("gulp-autoprefixer")
const pug = require("gulp-pug")
const concat = require("gulp-concat")
const babel = require("gulp-babel")
const fonter = require("gulp-fonter")
const ttf2woff2 = require("gulp-ttf2woff2")
const uglify = require("gulp-uglify")
const sourcemaps = require("gulp-sourcemaps")
const insert = require("gulp-insert")
const replace = require("gulp-replace")
const include = require("gulp-include")
const prettier = require("@bdchauvette/gulp-prettier")

// Task functions for development mode
const setEnv = (cb) => {
	process.env.NODE_ENV = "dev"
	cb()
}
const fonts = () => src('./src/fonts/src/*.*')
	.pipe(fonter({
		formats: ['woff', 'ttf']
	}))
	.pipe(ttf2woff2())
	.pipe(dest("build/fonts"))

const images = () => src('./src/img/*.*')
	.pipe(dest("build/img"))

const devVendorCss = () => src("./src/vendor/scss/**/*.scss")
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "Scss styles Error into the devVendorCss",
			message: err.message
		}))
	}))
	.pipe(sourcemaps.init())
	.pipe(sass.sync().on("error", sass.logError))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 2 versions"],
		cascade: false
	}))
	.pipe(rename({ basename: "vendor" }))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(dest("build/css"))
	.pipe(browserSync.stream())

const devCommonCss = () => src("./src/scss/**/*.scss")
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "Scss styles Error into the devCommonCss",
			message: err.message
		}))
	}))
	.pipe(sourcemaps.init())
	.pipe(sass.sync().on("error", sass.logError))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 2 versions"],
		cascade: false
	}))
	.pipe(rename({ basename: "main" }))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(dest("build/css"))
	.pipe(browserSync.stream())

const devCustomCss = () => src("./src/pages/**/style.scss")
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "Scss styles Error into the devCustomCss",
			message: err.message
		}))
	}))
	.pipe(sourcemaps.init())
	.pipe(sass.sync().on("error", sass.logError))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 2 versions"],
		cascade: false
	}))
	.pipe(rename(fileObj => {
		fileObj.basename = fileObj.dirname
		fileObj.dirname = ""
	}))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(dest("build/css/pages"))
	.pipe(browserSync.stream())

const devVendorJs = () => src("./src/vendor/js/**/*.js")
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "JS Error into the devVendorJs",
			message: err.message
		}))
	}))
	.pipe(sourcemaps.init())
	.pipe(concat("vendor.js"))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(dest("build/js"))
	.pipe(browserSync.stream())

const devCommonJs = () => src([
	"./src/js/utils/**/*.js",
	"./src/components/**/*.js",
	// "./src/pages/index/components/**/*.js",
	"./src/template/**/*.js",
	"./src/js/main.js",
	"./src/js/**/*.js"
])
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "JS Error into the devCommonJs",
			message: err.message
		}))
	}))
	.pipe(sourcemaps.init())
	.pipe(concat("main.js"))
	.pipe(insert.prepend("'use strict';\n\n"))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(dest("build/js"))
	.pipe(browserSync.stream())

const devCustomJs = () => src("./src/pages/**/script.js")
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "JS Error into the devCustomJs",
			message: err.message
		}))
	}))
	.pipe(sourcemaps.init())
	.pipe(include()).on("error", console.log)
	.pipe(rename(fileObj => {
		fileObj.basename = fileObj.dirname
		fileObj.dirname = ""
	}))
	// .pipe(insert.prepend("'use strict';\n\n"))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(dest("build/js/pages"))
	.pipe(browserSync.stream())

const devHtml = () => src("./src/pages/**/index.pug")
	.pipe(plumber({
		errorHandler: notify.onError(err => ({
			title: "Pug Error into the devHtml",
			message: err.message
		}))
	}))
	.pipe(pug())
	.pipe(replace(/\/>/g, ">"))
	.pipe(rename(fileObj => {
		fileObj.basename = fileObj.dirname
		fileObj.dirname = ""
	}))
	.pipe(plumber.stop())
	.pipe(dest("build"))
	.pipe(browserSync.stream())

// Task functions for build mode
const buildVendorCss = () => src("./src/vendor/scss/**/*.scss")
	.pipe(sass.sync().on("error", sass.logError))
	.pipe(mmq({ log: true, skipMQErrors: true }))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 2 versions"],
		cascade: false
	}))
	.pipe(sass.sync({ outputStyle: "compressed" }))
	.pipe(rename({ basename: "vendor", suffix: ".min" }))
	.pipe(dest("build/css"))

const buildCommonCss = () => src("./src/scss/**/*.scss")
	.pipe(sass.sync().on("error", sass.logError))
	// .pipe(mmq({log: true, skipMQErrors: true}))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 2 versions"],
		cascade: false
	}))
	.pipe(sass.sync({ outputStyle: "compressed" }))
	.pipe(rename({ basename: "main", suffix: ".min" }))
	.pipe(dest("build/css"))

const buildCustomCss = () => src("./src/pages/**/style.scss")
	.pipe(sass.sync().on("error", sass.logError))
	// .pipe(mmq({log: true, skipMQErrors: true}))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 2 versions"],
		cascade: false
	}))
	.pipe(sass.sync({ outputStyle: "compressed" }))
	.pipe(rename(fileObj => {
		fileObj.basename = fileObj.dirname + ".min"
		fileObj.dirname = ""
	}))
	.pipe(dest("build/css/pages"))

const buildVendorJs = () => src("./src/vendor/js/**/*.js")
	.pipe(concat("vendor.js"))
	// .pipe(babel({presets: [['@babel/preset-env']]}))
	.pipe(uglify())
	.pipe(rename({ suffix: ".min" }))
	.pipe(dest("build/js"))

const buildCommonJs = () => src([
	"./src/js/utils/**/*.js",
	"./src/components/**/*.js",
	"./src/template/**/*.js",
	"./src/js/main.js",
	"./src/js/**/*.js",
])
	.pipe(concat("main.js"))
	.pipe(babel({ compact: false, presets: [["@babel/preset-env"]] }))
	.pipe(uglify())
	.pipe(rename({ suffix: ".min" }))
	.pipe(dest("build/js"))

const buildCustomJs = () => src("./src/pages/**/script.js")
	.pipe(include()).on("error", console.log)
	.pipe(babel({ compact: false, presets: [["@babel/preset-env"]] }))
	.pipe(uglify())
	.pipe(rename(fileObj => {
		fileObj.basename = fileObj.dirname + ".min"
		fileObj.dirname = ""
	}))
	.pipe(dest("build/js/pages"))

const buildHtml = () => src("./src/pages/**/index.pug")
	.pipe(pug())
	.pipe(prettier({
		"printWidth": 10000,
		"htmlWhitespaceSensitivity": "ignore",
		"bracketSameLine": true,
		"singleAttributePerLine": false,
		"endOfLine": "lf"
	}))
	.pipe(replace(/\/>/g, ">"))
	.pipe(rename(fileObj => {
		fileObj.basename = fileObj.dirname
		fileObj.dirname = ""
	}))
	.pipe(dest("build"))

// Common task functions
const clean = () => del("./build")


// Watchers
function startWatch() {
	watch("./src/vendor/scss/**/*.scss", devVendorCss)
	watch("./src/scss/**/*.scss", devCommonCss)
	watch("./src/template/**/*.scss", devCommonCss)
	watch("./src/components/**/*.scss", devCommonCss)
	watch("./src/pages/**/*.scss", devCustomCss)
	watch("./src/vendor/js/**/*.js", devVendorJs)
	watch("./src/js/**/*.js", devCommonJs)
	watch("./src/template/**/*.js", devCommonJs)
	watch("./src/components/**/*.js", devCommonJs)
	watch("./src/pages/**/*.js", devCustomJs)
	watch("./src/**/*.pug", devHtml)
}

const server = () => {
	startWatch()

	return browserSync.init({
		server: {baseDir: "./build"},
		port: 7001
	})
}


exports.fonts = fonts;

// Project development mode
exports.default = series(
	clean,
	setEnv,
	parallel(
		devVendorCss,
		devCommonCss,
		devCustomCss,
		devVendorJs,
		devCommonJs,
		devCustomJs,
		devHtml,
		fonts,
		images
	),
	server
)

// Project build mode
exports.build = series(
	clean,
	parallel(
		buildVendorCss,
		buildCommonCss,
		buildCustomCss,
		buildVendorJs,
		buildCommonJs,
		buildCustomJs,
		buildHtml,
		fonts,
		images
	),

	(done) => {
		done()
		process.exit()
	}
)