import mail     from './lib/mail'
import read     from './lib/read'
import validate from './lib/validate'

export default function (opts) {
  const options   = validate(opts);
  const { files } = options;

  const sent = files.map(async function (filename) {
    return mail(options, await read(filename));
  });

  return Promise.all(sent);
};

