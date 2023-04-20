import type { ItemDto, ItemUpdateDto } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, getDoc, query, where} from 'firebase/firestore';


export const itemsCollection = collection(database, 'items');

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
    updateItem: async (item: ItemUpdateDto, id:string) => {
        const itemsDoc = doc(database, 'items', id);
        await updateDoc(itemsDoc, {...item});
        console.log('updated', item);
    },
    deleteItem: async (id:string) => {
        const itemsDoc = doc(database, 'items', id);
        await updateDoc(itemsDoc, {updatedAt: new Date(),deletedAt: new Date()});
        console.log('deleted');
    },
    getAllItemsExist: async () => {
        const items = [] as any;
       const user  =  auth.currentUser;
       console.log('user', user);
        const queryUser = query(itemsCollection, where('userid', '==', auth.currentUser?.uid), where('deletedAt', '==', null));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
        console.log('items', items);
        return {items, itemsCount: items.length};
    },
    getAllItems: async () => {
        const items = [] as any;
        const queryUser = query(itemsCollection, where('userid', '==', auth.currentUser?.uid));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
        console.log('items', items);
        return items;
    },
    getAllItemsByDate: async (date1:Date,date2:Date) => {
        const items = [] as any;
        const queryUser = query(itemsCollection, where('userid', '==', auth.currentUser?.uid), where('item_created_date', '>=', date1), where('item_created_date', '<=', date2));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
        console.log('items', items);
        return items;
    },
    getAllItemsByName: async (search:string) => {
        const items = [] as any;
        const queryUser = query(itemsCollection, where('userid', '==', auth.currentUser?.uid),where('name', '>=', search.toLocaleUpperCase()),where('name', '<=', search.toLocaleLowerCase() + '\uf8ff'));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
        console.log('items', items);
        return items;
    },
    getById: async (id: string) => {
        let item: any = {};
        const itemDoc = await doc(database, 'items', id);
        item = await getDoc(itemDoc);
        return item.data();
    }
};
