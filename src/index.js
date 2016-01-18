#! /usr/bin/env node
import mail   from './lib/mail'
import read   from './lib/read'
import error  from './lib/error'
import config from './lib/config'

config()
  .then(async function (options) {
    const { files } = options;
    return [options, await Promise.all(files.map(read))];
  })
  .then(async function ([options, messages]) {
    const sent = messages.map(msg => mail(options, msg))
    return Promise.all(sent);
  })
  .then(function (sent) {
    console.log(`sent ${sent.length} messages`);
  })
  .catch(error)
  ;



