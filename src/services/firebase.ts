import * as admin from "firebase-admin";
import * as fireorm from "fireorm";

const PATH_FIREBASE_CREDENTIALS =
  process.env.CREDENTIALS ?? __dirname + "/../../serviceAccountKey.json";

const serviceAccount = require(PATH_FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`, // DATABASE WITH SAME NAME AS PROJECT
});

const auth = admin.auth();
const database = admin.database();
const storage = admin.storage();
const firestore = admin.firestore();

fireorm.initialize(firestore);

export { auth, database, storage, firestore };
