import admin from 'firebase-admin';
import serviceAccountJSON from '$lib/Service_Account/online-shopping-f5190-firebase-adminsdk-hezqi-045fc46a09.json';

const serviceAccount = JSON.parse(JSON.stringify(serviceAccountJSON));
let Admin: any = admin;

if(!admin.apps.length){
    Admin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://online-shopping-f5190-default-rtdb.europe-west1.firebasedatabase.app"
      });
}

export default Admin;