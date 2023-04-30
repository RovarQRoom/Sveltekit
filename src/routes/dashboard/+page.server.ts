import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

if(!admin.apps.length){
    admin.initializeApp({
        credential: applicationDefault(),
        databaseURL: "https://online-shopping-f5190-default-rtdb.firebaseio.com",
    }, 'server');
}


export const load = async() =>{
    // try{
    //     const getAllEmployees = httpsCallable(functions, 'getAllEmployees');
    //     const employees = await getAllEmployees() as any;

    //     const getAllCompanys = httpsCallable(functions, 'getAllCompanys');
    //     const companys = await getAllCompanys() as any;

    //     const getAllStores = httpsCallable(functions, 'getAllStores');
    //     const stores = await getAllStores() as any;

    //     const getAllItems = httpsCallable(functions, 'getAllItems');
    //     const items = await getAllItems() as any;

    //     return {
    //         employeesCount:employees.data.employeesCount,
    //         companysCount:companys.data.companysCount,
    //         storesCount:stores.data.storesCount,
    //         itemsCount:items.data.itemsCount,
    //     };
    // }catch(error){
    //     console.log(error);
    // }
    try{
        
        const employees = await admin.firestore().collection('employees').get();
        const companys = await admin.firestore().collection('companys').get();
        const stores = await admin.firestore().collection('stores').get();
        const items = await admin.firestore().collection('items').get();

        return {
            employeesCount:employees.size,
            companysCount:companys.size,
            storesCount:stores.size,
            itemsCount:items.size,
        };

    }catch(error){
        console.log(error);
    }
}