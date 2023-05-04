import type { ItemDto, ItemModal, ItemUpdateModal } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, getDoc, query, where, onSnapshot} from 'firebase/firestore';
import { writable } from 'svelte/store';

export const itemsWritable = writable<ItemModal[]>([]);

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
    updateItem: async (item: ItemUpdateModal, id:string) => {
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
        if(!auth.currentUser) return;
        const user = await getDoc(doc(database, 'users', auth.currentUser.uid));

        let queryItems;
        if(user.data()?.type === 'admin'){
            queryItems = query(itemsCollection, where('deletedAt', '==', null));
        }else{
            queryItems = query(itemsCollection, where('deletedAt', '==', null), where('userid', '==', auth.currentUser.uid));
        }
        
        try{
            onSnapshot(queryItems, (querySnapshot) => {
             const items: ItemModal[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    detail: doc.data().detail,
                    type: doc.data().type,
                    item_store_qunatity: doc.data().item_store_qunatity,
                    quantity: doc.data().quantity,
                    buy_price: doc.data().buy_price,
                    sale_price_more: doc.data().sale_price_more,
                    sale_price_less: doc.data().sale_price_less,
                    item_created_date: doc.data().item_created_date,
                    item_expired_date: doc.data().item_expired_date,
                    itemImage: doc.data().itemImage,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                 }));
                 itemsWritable.set(items);
             });
         }catch(err){
             console.log('error', err);
         }
    },
    getAllItemsExistClientSide: async () => {
        const queryItems = query(itemsCollection, where('deletedAt', '==', null));
        try{
            onSnapshot(queryItems, (querySnapshot) => {
             const items: ItemModal[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    detail: doc.data().detail,
                    type: doc.data().type,
                    item_store_qunatity: doc.data().item_store_qunatity,
                    quantity: doc.data().quantity,
                    buy_price: doc.data().buy_price,
                    sale_price_more: doc.data().sale_price_more,
                    sale_price_less: doc.data().sale_price_less,
                    item_created_date: doc.data().item_created_date,
                    item_expired_date: doc.data().item_expired_date,
                    itemImage: doc.data().itemImage,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                 }));
                 itemsWritable.set(items);
             });
         }catch(err){
             console.log('error', err);
         }
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
    getById: async (id: string) => {
        let item: any = {};
        const itemDoc = await doc(database, 'items', id);
        item = await getDoc(itemDoc);
        return item.data();
    }
};
