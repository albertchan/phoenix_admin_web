import get from 'lodash/get';

/**
 * Returns the error field from a JSON API error object.
 * @parma {object}  JSON API error object
 * @return {string} Error field
 */
export default function getErrorField(err) {
  const source = get(err, 'source.pointer');
  return source.slice(source.lastIndexOf('/') + 1, source.length);
}
