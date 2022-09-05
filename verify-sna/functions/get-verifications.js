/**
 * Retrieve locally stored verifications
 *
 * Retrieves all locally stored verifications
 *
 * Returns JSON
 *
 * on Success:
 * {
 *      "message": string
 *      "verifications": {phone_number: string, sna_url: string, status: string, verification_start_datetime: string | null, verification_check_datetime: string | null} []
 * }
 *
 * on Error:
 * {
 *      "message": string
 * }
 */

const assets = Runtime.getAssets();
const { getVerifications } = require(assets['/services/verifications.js'].path);
const { sortVerifications } = require(assets['/services/helpers.js'].path);

// eslint-disable-next-line consistent-return
exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  try {
    response.setStatusCode(200);
    response.setBody({
      message: 'Verifications retrieved sucessfully',
      verifications: sortVerifications(await getVerifications()),
    });
    return callback(null, response);
  } catch (error) {
    const statusCode = error.status || 400;
    response.setStatusCode(statusCode);
    response.setBody({
      message: error.message,
    });
    return callback(null, response);
  }
};
