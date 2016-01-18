#! /usr/bin/env node

import config from './lib/config'
import mailer from './index'
import error  from './lib/error'

config()
  .then(mailer)
  .then(function (sent) {
    console.log(`sent ${sent.length} message${sent.length === 1 ? '' : 's'}.`);
  })
  .catch(error)
  ;

