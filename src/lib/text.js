import marked from 'marked'
import totext from 'html-to-text'

// convert markdown to text
export default function (markdown) {
  const html = marked(markdown);
  const text = totext.fromString(html, {
    wordwrap: 130
  });

  return text;
};
