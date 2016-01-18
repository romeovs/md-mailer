import frontmatter from 'front-matter'
import fs          from 'fs'
import text        from './text'

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

  return {
    ...attributes
  , markdown: body
  // , text: totext(body)
  };
};
