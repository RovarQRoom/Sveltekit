import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, database } from "../components/lib/firebase/firebase";
import type { MostWantedItemDTO } from "../components/Dtos";

const mostWantedItemCollection = collection(database, "reciepts");

export const mostWantedItemHandlers = {
    addMostWantedItem: async (mostWantedItem: MostWantedItemDTO) => {
        console.log("Most Wanted Item ", mostWantedItem);
        try {
            await addDoc(mostWantedItemCollection, {...mostWantedItem});
            
            console.log("Most Wanted Item Added Successfully");
        } catch (err) {
            console.log("error", err);
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