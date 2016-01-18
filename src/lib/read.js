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
  , text: text(body)
  };
};
