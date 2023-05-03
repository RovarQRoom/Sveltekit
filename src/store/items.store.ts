import type { ItemDto, ItemModel, ItemUpdateDto } from '../components/Dtos';
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
        const items: ItemModel[] = [];

        const queryUser = query(itemsCollection, where('userid', '==', auth.currentUser?.uid), where('deletedAt', '==', null));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                userid: doc.data().userid,
                name: doc.data().name,
                detail: doc.data().detail,
                type: doc.data().item_description,
                buy_price: doc.data().buy_price,
                quantity: doc.data().quantity,
                itemImage: doc.data().itemImage,
                sale_price_less: doc.data().sale_price_less,
                sale_price_more: doc.data().sale_price_more,
                item_created_date: doc.data().item_created_date,
                item_expired_date: doc.data().item_expired_date,
                item_store_qunatity: doc.data().item_store_qunatity,
            });
        });
        console.log('items', items);
        return {items, itemsCount: items.length};
    },
    getAllItemsExistClientSide: async () => {
        const items: ItemModel[] = [];
       const user  =  auth.currentUser;
       console.log('user', user);
        const queryUser = query(itemsCollection, where('deletedAt', '==', null));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                userid: doc.data().userid,
                name: doc.data().name,
                detail: doc.data().detail,
                type: doc.data().item_description,
                buy_price: doc.data().buy_price,
                quantity: doc.data().quantity,
                itemImage: doc.data().itemImage,
                sale_price_less: doc.data().sale_price_less,
                sale_price_more: doc.data().sale_price_more,
                item_created_date: doc.data().item_created_date,
                item_expired_date: doc.data().item_expired_date,
                item_store_qunatity: doc.data().item_store_qunatity,
            });
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
    getById: async (id: string) => {
        let item: any = {};
        const itemDoc = await doc(database, 'items', id);
        item = await getDoc(itemDoc);
        return item.data();
    }
};
