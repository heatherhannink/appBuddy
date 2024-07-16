const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  data: {
    title: 'New Notification',
    body: 'This is a push notification from your server.',
  },
  token: 'DEVICE_REGISTRATION_TOKEN',
};

admin.messaging().send(message)
  .then(response => {
    console.log('Successfully sent message:', response);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
