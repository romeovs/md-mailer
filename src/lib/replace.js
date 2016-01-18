
// replace environment variables in a text
export default async function (env, str) {
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
