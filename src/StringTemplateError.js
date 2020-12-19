class StringTemplateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StringTemplateError';
  }
}

module.exports = StringTemplateError;