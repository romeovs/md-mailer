
// transform options for use in the rest of the
// program.
export default function (options = {}) {
  return {
    host:   options.host
  , secure: options.ssl
  , port :  options.port
  , auth: {
      user: options.user
    , pass: options.pass
    }
  , files: options._
  , dryRun: options.dryRun
  };
};


