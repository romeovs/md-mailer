
const absolute = function (url) {
  return url.indexOf('http://') === 0 || url.indexOf('https://') === 0 || url.indexOf('//') === 0;
}

const rule = (attr, def) => function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const asrc  = token.attrIndex(attr);
  const src   = token.attrs[asrc][1];

  if ( absolute(src) ) {
    const d = def || ((tokens, idx, options) => self.renderToken(tokens, idx, options))
    return d(tokens, idx, options, env, self);
  } else {
    env.attachments = ( env.attachments || [] ).concat(src);
    return '<span/>';
  }
};

export default function (md) {
  md.renderer.rules.image = rule('src', md.renderer.rules.image);
  md.renderer.rules.link_open = rule('href', md.renderer.rules.link_open);
}

