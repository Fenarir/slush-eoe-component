/*
 * slush-eoe-component
 * https://github.com/kevincorry/slush-eoe-component
 *
 * Copyright (c) 2017, Kevin Corry
 * Licensed under the MIT license.
 */
(function () {
    'use strict';

    var gulp = require('gulp'),
        install = require('gulp-install'),
        conflict = require('gulp-conflict'),
        template = require('gulp-template'),
        rename = require('gulp-rename'),
        _ = require('underscore.string'),
        inquirer = require('inquirer'),
        path = require('path');

    gulp.task('default', generateDumbComponent);
    gulp.task('dumb', generateDumbComponent);
    gulp.task('smart', generateSmartComponent);

    function generateDumbComponent(done) {
        console.info('Creating dumb component!');

        var defaults = (function () {
            return {
                namespace: 'eoe',
                moduleName: 'module',
                componentName: 'component'
            };
        })();

        var prompts = [{
            name: 'namespace',
            message: 'What is the namespace of your component?',
            default: defaults.namespace
        }, {
            name: 'moduleName',
            message: 'What module should this component hang off?',
            default: defaults.moduleName
        }, {
            name: 'componentName',
            message: 'What is the name of your component?',
            default: defaults.componentName
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];

        //Ask
        inquirer.prompt(prompts, function (answers) {
            if (!answers.moveon) {
                return done();
            }

            answers.componentNameCapitalised = uppercase(answers.componentName);
            answers.moduleName = answers.namespace + '.' + answers.moduleName;
            answers.controllerName = uppercase(answers.namespace) + answers.componentNameCapitalised + 'Ctrl';
            answers.serviceName = answers.componentName;

            gulp.src([
                __dirname + '/templates/dumb/**/*.js',
                __dirname + '/templates/dumb/**/*.css',
                __dirname + '/templates/dumb/**/*.html'
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
    }

    function generateSmartComponent(done) {
        console.info('Creating smart component!');

        var defaults = (function () {
            return {
                moduleName: 'module',
                componentName: 'component'
            };
        })();

        var prompts = [{
            name: 'moduleName',
            message: 'What module should this component hang off?',
            default: defaults.moduleName
        }, {
            name: 'componentName',
            message: 'What is the name of your component?',
            default: defaults.componentName
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];

        //Ask
        inquirer.prompt(prompts, function (answers) {
            if (!answers.moveon) {
                return done();
            }

            answers.componentNameCapitalised = uppercase(answers.componentName);
            answers.moduleName = answers.moduleName;
            answers.controllerName = answers.componentNameCapitalised + 'Ctrl';
            answers.serviceName = answers.componentName;

            gulp.src([
                __dirname + '/templates/smart/**/*.js',
                __dirname + '/templates/smart/**/*.css',
                __dirname + '/templates/smart/**/*.html'
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
    }

    function uppercase(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
})();
