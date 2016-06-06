#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('babel-register');
const dockerDeploy = require('../libs/deploy');
const argv = require('minimist')(process.argv.slice(2));

dockerDeploy.run(argv);
