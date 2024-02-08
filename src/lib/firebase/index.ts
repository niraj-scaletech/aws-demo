import firebaseAdmin from "firebase-admin";

const serviceAccount = require(`../../data/firebase-data.json`);
import * as dotenv from "dotenv";
dotenv.config();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

export class FirebaseService {
  public updateUserMediaConvert = async (data: any) => {
    try {
      await firebaseAdmin
        .database()
        .ref()
        .child("url")
        .update({ ...data });
    } catch (error) {
      console.log("error in firebaseAdmin =========>", error);
      throw new Error(error);
    }
  };
}

const Firebase = new FirebaseService();

export default Firebase;
