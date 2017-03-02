/*
 * slush-eoe-component
 * https://github.com/kevincorry/slush-eoe-component
 *
 * Copyright (c) 2017, Kevin Corry
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

var defaults = (function () {
    return {
        componentName: 'component',
		moduleName: 'module'
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'componentName',
        message: 'What is the name of your component?',
        default: defaults.componentName
    }, {
        name: 'moduleName',
        message: 'What module should this component hang off?',
		default: defaults.moduleName
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }

            answers.componentNameCapitalised = uppercase(answers.componentName);
            answers.controllerName = 'Eoe' + answers.componentNameCapitalised + 'Ctrl';
            answers.serviceName = answers.componentName;

            gulp.src([
				__dirname + '/templates/**/*.js', 
				__dirname + '/templates/**/*.css',
				__dirname + '/templates/**/*.html'
			]).pipe(template(answers))
			  .pipe(rename(function (file) {
				if (file.basename === 'component') {
					file.basename = answers.componentName;
				} else {
					file.basename = answers.componentName + '.' + file.basename;
				}
			}))
			.pipe(conflict('./'))
			.pipe(gulp.dest('./' + answers.componentName))
			.pipe(install())
			.on('finish', function () {
				done();
			})
			.resume();
        });
});

function uppercase(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
