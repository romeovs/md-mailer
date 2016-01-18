#! /usr/bin/env node
import yargs from 'yargs'
import email from 'emailjs'
import read  from './lib/read'
import mail  from './lib/mail'
import error from './lib/error'

// environment variable name to use for password
const USER = 'EMAILER_USER';
const PASS = 'EMAILER_PASSWORD';

const argv =
  yargs

    // ask for host
    .describe('h', 'Email provider host.')
    .demand('host')
    .nargs('host', 1)
    .alias('h', 'host')

    // ask for user
    .describe('u', 'Email provider username.')
    .demand('user')
    .nargs('user', 1)
    .alias('u', 'user')
    .default('u', process.env[USER])

    // check for pass
    .describe('p', `Email provider password. (This might be unsafe, consider using the environment variable $${PASS}).`)
    .nargs('pass', 1)
    .default('pass', process.env[PASS])
    .alias('p', 'pass')
    .alias('p', 'password')

    // wether or not to use ssl
    .describe('s', 'Enable ssl.')
    .boolean('ssl')
    .alias('s', 'ssl')

    // enable help
    .help('?')
    .alias('?', 'help')

    // set dry-run option
    .describe('d', 'dry-run. Doesn\'t send any emails')
    .alias('d', 'dry-run')
    .boolean('d')

    .demand(1)
    .argv
    ;

const validate = async function (options) {
  if ( !options.user ) {
    throw new Error(`Missing required argument: user\nset it trough the --user option or via $${USER}.`);
  }

  if ( !options.pass ) {
    throw new Error(`Missing required argument: pass\nset it trough the --pass option or via $${PASS}.`);
  }

  return options;
};

validate(argv)
  .then(async function (options) {
    const files = options._;
    return [options, await Promise.all(files.map(read))];
  })
  .then(async function ([options, messages]) {
    const server = email.server.connect(options);

    const sent = messages.map(function (message) {
      if ( options.dryRun === true ) {
        console.log(message);
        return message;
      } else {
        return mail(server, message);
      }
    });

    return Promise.all(sent);
  })
  .then(function (sent) {
    console.log(`sent ${sent.length} messages`);
  })
  .catch(error)
  ;



