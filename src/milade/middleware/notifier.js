const firebase = require('firebase-admin');

const serviceAccount = require('')

//
const firebaseToken = '';

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://milan-29557.firebaseio.com"
});

const payload = {
    notification: {
      title: 'Notification Title',
      body: 'This is an example notification',
    }
  };

 const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
  };
 
firebase.messaging().sendToDevice(firebaseToken, payload, options);
