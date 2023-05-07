import type { StoreDto, StoreModal, StoreUpdateModal } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, getDoc, query, where, onSnapshot } from 'firebase/firestore';
import { authHandlers } from './store';
import { rolesHandlers } from './roles.store';
import { writable } from 'svelte/store';

export const storesWritable = writable<StoreModal[]>([]);
const storeCollection = collection(database, 'store');

export const storesHandlers = {
    addStore: async (store: StoreDto) => {
        console.log('store', store);
        try{
            const users = await authHandlers.getUserByPhonenumber(store.phone);
            const roles = await rolesHandlers.getStoreRole();

            if(users){
                await updateDoc(doc(database, 'users', users.id), {role_details:{...store, userid: users.id},roles: roles.roles, type: roles.roleType});
                console.log('User Updated Successfully');

                await addDoc(storeCollection, {...store, userid: users.id, role: roles});
                console.log('Store Added Successfully');
                
            }else{
                await addDoc(storeCollection, {...store});
                console.log('Store Added Successfully');
            }


        }catch(err){
            console.log('error', err);
        }
    },
    updateStore: async (store: StoreUpdateModal, id:string) => {
        const storeDoc = doc(database, 'store', id);
        await updateDoc(storeDoc, {...store});
        console.log('updated', store);
    },
    deleteStore: async (id:string) => {
        try{
            const storeDoc = doc(database, 'store', id);
            await updateDoc(storeDoc, {updatedAt: new Date(),deletedAt: new Date()});
            console.log('deleted');
        }catch(err){
            console.log('error', err);
        }
    },
    getAllStoresExist: async () => {
        if(!auth.currentUser) return;
        const user = await getDoc(doc(database, 'users', auth.currentUser.uid));

        let queryStores;
        if(user.data()?.type === 'admin'){
            queryStores = query(storeCollection, where('deletedAt', '==', null));
        }else{
            queryStores = query(storeCollection, where('deletedAt', '==', null), where('userid', '==', auth.currentUser.uid));
        }
        try{
            onSnapshot(queryStores, (querySnapshot) => {
             const stores: StoreModal[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    address: doc.data().address,
                    detail: doc.data().detail,
                    storeImage: doc.data().storeImage,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                 }));
          
                 storesWritable.set(stores);
             });
         }catch(err){
             console.log('error', err);
         }
    },
    getAllStores: async () => {
        if(!auth.currentUser) return;
        const user = await getDoc(doc(database, 'users', auth.currentUser.uid));

        let queryStores;
        if(user.data()?.type === 'admin'){
            queryStores = query(storeCollection);
        }else{
            queryStores = query(storeCollection, where('userid', '==', auth.currentUser.uid));
        }
        try{
            onSnapshot(queryStores, (querySnapshot) => {
             const stores: StoreModal[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    address: doc.data().address,
                    detail: doc.data().detail,
                    storeImage: doc.data().storeImage,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                 }));
          
                 storesWritable.set(stores);
             });
         }catch(err){
             console.log('error', err);
         }
    }, 
    getById: async (id: string) => {
        let store: any = {};
        const storeDoc = await doc(database, 'store', id);
        store = await getDoc(storeDoc);
        return store.data();
    }
};
