/**
 * Routes for express app
 */
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers } from '../db';
import { sendMessage, sendConfirm } from '../service/emailService';

// put our route API here!
export default (app) => {
  app.post('/sendinvite', sendMessage);
  app.post('/sendconfirm', sendConfirm);
};
