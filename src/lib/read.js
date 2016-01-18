import frontmatter from 'front-matter'
import fs          from 'fs'
import text        from './text'
import replace     from './replace'

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

const recipients = function (data) {
  if ( data && data.join ) {
     return data.join(', ');
  } else {
    return data;
  }
};

const req = function (obj, ...names) {
  const [name, ...rest] = names;

  if ( rest.length === 0 ) {
    if ( obj[name] === undefined ) {
      throw new Error(`${name} is required!`);
    }
  } else {
    req(obj, name);
    req(obj, ...rest);
  }
};

const strict = function (obj, valid) {
  Object.keys(obj).forEach(function (key) {
    if ( valid.indexOf(key) < 0 ) {
      console.log(`Warning: unused option in header \`${key}\``);
    }
  });
};

// fixes attributes
const fix = function (attrs) {

  req(attrs,
      'from'
    , 'to'
    , 'subject'
    );

  strict(attrs, ['from', 'to', 'subject', 'cc', 'bcc']);

  return {
    ...attrs
  , to:   recipients(attrs.to)
  , cc:   recipients(attrs.cc)
  , bcc:  recipients(attrs.bcc)
  };
};

export default async function (filename) {
  const contents = await read(filename);
  const replaced = await replace(process.env, contents)

  const {
    attributes
  , body
  } = frontmatter(replaced);

  return {
    ...fix(attributes)
  , markdown: body
  , text: text(body)
  };
};
