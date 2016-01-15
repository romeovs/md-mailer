import email from 'emailjs'

export default function (server, message) {
  return new Promise(function (resolve, reject) {
    server.send(message, function (err, message) {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
