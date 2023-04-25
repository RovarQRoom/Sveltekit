import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, database } from "../components/lib/firebase/firebase";
import type { MostWantedItemDTO } from "../components/Dtos";

const mostWantedItemCollection = collection(database, "most_wanted_items");

export const mostWantedItemHandlers = {
    addMostWantedItem: async (mostWantedItem: MostWantedItemDTO) => {

        const queryMostWantedItem = query(mostWantedItemCollection, where('itemId', '==', mostWantedItem.itemId));
        const mostWantedItemChecker = await getDocs(queryMostWantedItem);

        if(mostWantedItemChecker.size > 0){
            console.log("Item Already Exist");
            const oldItemData: any[] = [];

            const ItemDoc = doc(database, "most_wanted_items", mostWantedItemChecker.docs[0].id);
            const queryDoc = query(mostWantedItemCollection, where('itemId', '==', mostWantedItem.itemId));
            await getDocs(queryDoc).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    oldItemData.push({...doc.data(), id: doc.id});
                });
            });
            console.log("oldItemData", oldItemData);

            await updateDoc(ItemDoc, {
                itemQuantity: mostWantedItem.itemQuantity + oldItemData[0].itemQuantity,
                overhaul_price: mostWantedItem.overhaul_price + oldItemData[0].overhaul_price,
                updatedAt: new Date(),
                oldData: {...oldItemData[0]}
            });

            console.log("Most Wanted Item Updated Successfully");
        }else{
            try {
                await addDoc(mostWantedItemCollection, {...mostWantedItem});
                
                console.log("Most Wanted Item Added Successfully");
            } catch (err) {
                console.log("error", err);
            } 
        }

    },
    getMostWantedItems: async () => {
            try {
                const CheapestItem = [] as any;
                const MostSellingItem = [] as any;
                const MostExpensiveItem = [] as any;
                const queryCheapestItem = query(mostWantedItemCollection, where('deletedAt', '==', null) , orderBy('itemPrice', 'asc'), limit(1));
                const queryMostExpensiveItem = query(mostWantedItemCollection, where('deletedAt', '==', null) , orderBy('itemPrice', 'desc'), limit(1));
                const queryMostSellingItem = query(mostWantedItemCollection, where('deletedAt', '==', null) , orderBy('itemQuantity', 'desc'), limit(1));


                let querySnapshot = await getDocs(queryCheapestItem);
            querySnapshot.forEach((doc) => {
                CheapestItem.push({...doc.data(), id: doc.id});
            });

            querySnapshot = await getDocs(queryMostExpensiveItem);
            querySnapshot.forEach((doc) => {
                MostExpensiveItem.push({...doc.data(), id: doc.id});
            });

            querySnapshot = await getDocs(queryMostSellingItem);
            querySnapshot.forEach((doc) => {
                MostSellingItem.push({...doc.data(), id: doc.id});
            });

            return {CheapestItem:CheapestItem[0], MostExpensiveItem:MostExpensiveItem[0], MostSellingItem:MostSellingItem[0]};
            } catch (err) {
                console.log("error", err);
            }
    }
};
