const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadData() {
  const filePath = path.join(__dirname, 'skin_treatments.json');
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const batch = db.batch();
  products.forEach((product) => {
    const docRef = db.collection('skin_treatments').doc(); 
    batch.set(docRef, product);
  });

  await batch.commit();
  console.log('Data uploaded to Firestore');
}

uploadData().catch(console.error);
