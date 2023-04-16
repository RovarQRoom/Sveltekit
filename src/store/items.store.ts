import type ItemDto from '../components/Dtos/Items.DTO';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';


const itemsCollection = collection(database, 'items');

export const itemsHandlers = {
    addItem: async (item: ItemDto) => {
        console.log('Item', item);
        try{
            await addDoc(itemsCollection, {...item});
            console.log('Item Added Successfully');
            
        }catch(err){
            console.log('error', err);
        }
    },
    updateItem: async (item: any, id:string) => {
        const itemsDoc = doc(database, 'items', id);
        await updateDoc(itemsDoc, item);
    },
    deleteItem: async (id:string) => {
        const itemsDoc = doc(database, 'items', id);
        await deleteDoc(itemsDoc);
        console.log('deleted');
    },
    getAllItems: async () => {
        const items = [] as any;
        const queryUser = query(itemsCollection, where('userid', '==', auth.currentUser?.uid), where('deletedAt', '==', null));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
        console.log('items', items);
        return {items, itemsCount: items.length};
    },
    getById: async (id: string) => {
        let item: any = {};
        const employeeDoc = await doc(database, 'items', id);
        item = await getDoc(employeeDoc);
        return item;
    }
};
