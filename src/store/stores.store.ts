import type { StoreDto, StoreUpdateDto } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';


const storeCollection = collection(database, 'store');

export const storesHandlers = {
    addStore: async (store: StoreDto) => {
        console.log('store', store);
        try{
            await addDoc(storeCollection, {...store});
            console.log('Store Added Successfully');
            
        }catch(err){
            console.log('error', err);
        }
    },
    updateStore: async (store: StoreUpdateDto, id:string) => {
        const storeDoc = doc(database, 'store', id);
        await updateDoc(storeDoc, {...store});
        console.log('updated', store);
    },
    deleteStore: async (id:string) => {
        const storeDoc = doc(database, 'store', id);
        await updateDoc(storeDoc, {updatedAt: new Date(),deletedAt: new Date()});
        console.log('deleted');
    },
    getAllStoresExist: async () => {
        const stores = [] as any;

        const querySnapshot = query(storeCollection, where('deletedAt', '==', null), where('userid', '==', auth.currentUser?.uid));

        const storeSnapshot = await getDocs(querySnapshot);
        storeSnapshot.forEach((doc) => {
            stores.push({...doc.data(), id: doc.id});
        });
        console.log('stores', stores);
        return {stores, storesCount: stores.length};
    },
    getAllStores: async () => {
        const stores = [] as any;

        const querySnapshot = await getDocs(storeCollection);
        querySnapshot.forEach((doc) => {
            stores.push({...doc.data(), id: doc.id});
        });
        console.log('stores', stores);
        return stores;
    }, 
    getById: async (id: string) => {
        let store: any = {};
        const storeDoc = await doc(database, 'store', id);
        store = await getDoc(storeDoc);
        return store.data();
    }
};
