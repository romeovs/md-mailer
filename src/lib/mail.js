import mailer       from 'nodemailer'
import { markdown } from 'nodemailer-markdown'

let transporter;

export default function (config, message) {

  // set up transporter on first use
  if ( !transporter ) {
    transporter = mailer.createTransport(config);
    transporter.use('compile', markdown({
      useEmbeddedImages: true
    }));
  }

  if ( config.dryRun ) {
    console.log(message)
    return Promise.resolve();
  } else {
    return new Promise(function (resolve, reject) {
      transporter.sendMail(message, function (err, info) {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
};
