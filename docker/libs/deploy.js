import { exec, spawn } from 'child_process';
import path from 'path';
const docker = 'docker';
const dockerCompose = 'docker-compose';

/**
 * Displays an error and then calls process.exit.  Never call this in a web app.
 * Assumes a failure, so will default to return code of 1
 * @param  string message    Message to output, and then exit.
 * @param  integer returnCode Unix return code (0 = good, !0 = bad)
 */
function errorAndDie(message, returnCode) {
  console.log(message); // eslint-disable-line no-console
  process.exit(returnCode !== null ? returnCode : 1);
}

/**
 * Show help (and then call errorAndDie).
 * @param  string errorMessage      Error message to show
 * @param  boolean showConfigExample Boolean to show config example
 */
function showHelp(errorMessage, showConfigExample) {
  let returnCode = 0;
  let help = `${path.basename(process.argv[1])} --target (staging|production)`;
  help += '\nDeploys site to the hosting environment.  Requires docker tools, docker-compose and access to the docker server.';
  help += '\nThis tool is *BETA*';
  if (errorMessage !== undefined) {
    help += `\nError - ${errorMessage}`;
    if (showConfigExample) {
      help += '\nExample:';
      help += '\n"docker": {';
      help += '\n  "host": "dockerserver.domain.name",';
      help += '\n  "sitename": "domain.name"';
      help += '\n}';
    }
    returnCode = 1;
  }
  return errorAndDie(help, returnCode);
}

/**
 * Checks all dependencies are fulfilled.  Will die and show error if not fulfilled.
 * @param  string target target either production or staging
 * @param  string config Config object
 * @return boolean        Returns true if successful
 */
function checkDependencies(target, config) {
  // Check dependencies
  exec(`${docker} --version`, (error, stdout, stderr) => {
    // command output is in stdout
    if (error) {
      return errorAndDie(`Docker errored-${stderr}`);
    }
    return null;
  });

  // Check dependencies
  exec(`${dockerCompose} --version`, (error, stdout, stderr) => {
    // command output is in stdout
    if (error) {
      return errorAndDie(`Docker Compose errored-${stderr}`);
    }
    return null;
  });

  if (target !== 'staging' && target !== 'production') {
    return showHelp('Must provide target, either staging or production');
  }

  // Test config
  if (!config.has('docker')) {
    return showHelp(`No Docker config.  Please set in ${target}.json`, true);
  }
  if (!config.has('docker.host')) {
    return showHelp(`No Docker host config.  Please set in ${target}.json:`, true);
  }
  if (!config.has('docker.sitename')) {
    return showHelp(`No Docker sitename config.  Please set in ${target}.json`, true);
  }

  return true;
}

/**
 * Run the main program
 * @param  the arguments argv generated from minimist argv = require('minimist')(process.argv.slice(2));
 * @return returns true when done. Will die on any issues.
 */
module.exports.run = (argv) => {
  if (argv.help) {
    return showHelp();
  }
  const target = argv.target;
  process.env.NODE_ENV = target;
  const config = require('config');  // eslint-disable-line global-require

  checkDependencies(target, config);

  const params = [
    '-H',
    `${config.get('docker.host')}:2375`,
    '-p',
    `${config.get('docker.sitename')}`,
    '-f',
    'docker/docker-compose-base.yml',
    '-f',
    `docker/docker-compose-${target}.yml`,
    'up',
    '-d',
    '--build'
  ];

  const dockerProcess = spawn(dockerCompose, params);
  dockerProcess.stdout.on('data', (data) => {
    process.stdout.write(`${data}`);
  });
  dockerProcess.stderr.on('data', (data) => {
    process.stdout.write(data);
  });
  dockerProcess.on('close', (code) => {
    if (code !== 0) {
      return errorAndDie(`Docker Compose errored-${code}`);
    }
    return dockerProcess.stdin.end();
  });

  // All done
  return true;
};
