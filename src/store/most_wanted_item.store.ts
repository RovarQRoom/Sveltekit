import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
                const mostWantedItem = [] as any;
                const queryMostWantedItem = query(mostWantedItemCollection, where('deletedAt', '==', null));

                const querySnapshot = await getDocs(queryMostWantedItem);
            querySnapshot.forEach((doc) => {
                mostWantedItem.push({...doc.data(), id: doc.id});
            });

            console.log('Most Wanted Item', mostWantedItem);
            return {mostWantedItem: mostWantedItem};
            } catch (err) {
                console.log("error", err);
            }
    }
};


export const checkItemExist= async (itemId:string) => {
        try {
            const mostWantedItemDoc = await doc(database, "most_wanted_items", itemId);
            const mostWantedItem = await getDoc(mostWantedItemDoc);

        } catch (err) {
            console.log("error", err);
        }
    }