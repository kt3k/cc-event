module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai', 'browserify'],
        files: ['cc-event-spec.js'],
        preprocessors: {'cc-event-spec.js': ['browserify']},
        browserify: {
            debug: true,
            transform: [require('browserify-istanbul')({ignore: ['**/node_modules/**', '**/cc-event-spec.js']})]
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [{type: 'lcov'}]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        singleRun: true
    })
}
