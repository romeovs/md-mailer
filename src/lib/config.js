import yargs    from 'yargs'
import validate from './validate'

// environment variable name to use for password
const prefix = 'MDMAILER_';
const USER = `${prefix}USER`;
const PASS = `${prefix}PASS`;

export default async function () {
  const argv =
    yargs
      .env(prefix)
      .showHelpOnFail(false, 'Specify --help for available options')
      .strict()

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
      .demand('pass')
      .nargs('pass', 1)
      .alias('p', 'pass')
      .alias('p', 'password')

      // check for port
      .describe('P', 'Port to be used.')
      .alias('P', 'port')
      .nargs('port', 1)

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

  return argv;
};

