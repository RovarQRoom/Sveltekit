import { database } from '../components/lib/firebase/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';


const rolesCollection = collection(database, 'roles');

export const rolesHandlers = {
    getRegistrationRole: async () => {
        let roles: any = {};
        const querySnapshot = query(rolesCollection, where('role', '==', "client"));
        roles = await getDocs(querySnapshot);
        console.log(" Roles: ",roles.docs[0].data(), roles.docs[0].id);
        return {roles:{...roles.docs[0].data(), id:roles.docs[0].id}, roleType: roles.docs[0].data().role};
    },
    getEmployeeRole: async () => {
        let roles: any = {};

        const querySnapshot = query(rolesCollection, where('role', '==', "employee"));
        roles = await getDocs(querySnapshot);

        console.log(" Roles: ",roles.docs[0].data(), roles.docs[0].id);
        return {roles:{...roles.docs[0].data(), id:roles.docs[0].id}, roleType: roles.docs[0].data().role};
    },
    getAdminRole: async () => {
        let roles: any = {};

        const querySnapshot = query(rolesCollection, where('role', '==', "admin"));
        roles = await getDocs(querySnapshot);

        console.log(" Roles: ",roles.docs[0].data(), roles.docs[0].id);
        return {roles:{...roles.docs[0].data(), id:roles.docs[0].id}, roleType: roles.docs[0].data().role};
    }
};
