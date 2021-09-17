import { firebaseConfig } from '../config';
import admin from 'firebase-admin';

/*-------------------------------*/
// Setting up the database
/*-------------------------------*/
const app = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.serviceAccountKey),
    databaseURL: firebaseConfig.databaseURL,
});

const store = app.firestore();

const create = (collectionName: string, object: any) => {
    return store
        .collection(collectionName)
        .add(object);  
};

const getList = (collectionName: string) => {
      return store
          .collection(collectionName)
          .orderBy('score', 'desc')
          .limit(10)
          .get();
};

export default {
    create,
    getList,
}