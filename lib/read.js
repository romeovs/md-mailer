import frontmatter from 'front-matter'
import markdown    from 'markdown-it'
import fs          from 'fs'
import totext      from 'html-to-text'
import attachments from './attachment'

const md = markdown({
  html:     true
, linkify:  true
, breaks:   true
})
.use(attachments);
  // .disable(['link', 'image'])

const read = function (filename) {
  return new Promise (function (resolve, reject) {
    fs.readFile(filename, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res.toString());
      }
    });
  });
};

// replace environment variables in a text
const replace = async function (env, str) {
  const keys = Object.keys(env);
  if ( keys.length > 0 ) {
    const reg =
      keys
        .map(function (key) {
          return '\\${(' + key + ')}';
        })
        .join('|')
        ;

    const regex = new RegExp(reg);

    return str.replace(regex, function (matches) {
      return  Object.values(arguments).reduce(function (acc, match, i) {
        if ( i > 0 && env[match] ) {
          return env[match];
        } else {
          return acc;
        }
      }, undefined);
    });
  } else {
    // no keys in env to replace
    return str;
  }
};

export default async function (filename) {

  const contents = await read(filename);
  const replaced = await replace(process.env, contents)

  const {
    attributes
  , body
  } = frontmatter(replaced);

  let env = {};
  const html = md.render(body, env);
  const text = totext.fromString(html, { wordwrap: 100 });

  const atts = env.attachments.map(function (path) {
    console.log('Attaching:', path);
    return { path, name: path, alternative: false };
  });

  return {
    ...attributes
  , text
  , attachment: [
      {data: html, alternative: true}
    , ...atts
    ]
  }

};
