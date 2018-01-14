exports.client = (errorString) => {
  return `Client Error: ${errorString}.`;
};

exports.server = () => {
  return 'There is an Internal Server Error.';
};

exports.custom = (errorString) => {
  return `Error: ${errorString}.`
};
