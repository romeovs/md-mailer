
const error = function (err, top = true) {
  if ( top ) {
    console.error('Something went wrong:')
  }

  console.error(err.message)

  // descend the error chain
  if ( err.previous ) {
    error(err.previous, false);
  }

  if ( top ) {
    process.exit(1);
  }
};

export default error;
