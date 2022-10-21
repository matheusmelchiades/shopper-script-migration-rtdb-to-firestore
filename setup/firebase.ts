import * as admin from "firebase-admin";
import * as fireorm from "fireorm";

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const auth = admin.auth();
const database = admin.database();
const firestore = admin.firestore();

fireorm.initialize(firestore);

export { auth, database, firestore };
