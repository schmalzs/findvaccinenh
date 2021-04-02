const { get, isObject } = require('lodash');

const { ALLOW_ORIGIN } = process.env;

const normalizeHeaders = (headers = {}) => {
  const defaultHeaders = !!ALLOW_ORIGIN
    ? { 'access-control-allow-origin': ALLOW_ORIGIN }
    : {};
  return { ...defaultHeaders, ...headers };
};

const normalizeBody = (body) => (isObject(body) ? JSON.stringify(body) : body);

module.exports = (data) => ({
  ...data,
  headers: normalizeHeaders(get(data, 'headers')),
  body: normalizeBody(get(data, 'body')),
});
