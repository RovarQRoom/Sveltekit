import {collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where} from "firebase/firestore";
import {auth, database} from "../components/lib/firebase/firebase";
import type { CartItemModel } from "../components/Dtos";
import { writable } from "svelte/store";

const cartCollection = collection(database, "cart_items");

export const cartsHandlers = {
    addCart: async (cartItem: CartItemModel) => {
        console.log("Cart ", cartItem);
        
        try {
          const docRef =   doc (database, "cart_items", cartItem.id + '_' + cartItem.userid);
        const currentDoc = await   getDoc(docRef);
        if(currentDoc.exists()){
            const quantity = currentDoc.data()?.quantity + cartItem.quantity;
            const price = quantity * cartItem.item_price;
            await updateDoc(docRef, {quantity:quantity,total_price:price,updatedAt: new Date()});
            console.log("Cart Updated Successfully");
        }else {
            await setDoc(docRef, {...cartItem});
            console.log("Cart Added Successfully");
        }
         
        } catch (err) {
            console.log("error", err);
        }
    },
    getCartItems: async () => {
        const user = auth.currentUser?.uid;
        const cartItems: CartItemModel[] = [];
        const queryUser = query(cartCollection, where("userid", "==", user), where("deletedAt", "==", null));

        try{
           onSnapshot(queryUser, (querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                cartItems.push({
                    id: doc.id,
                    userid: doc.data().userid,
                    name: doc.data().name,
                    detail: doc.data().detail,
                    item_image: doc.data().item_image,
                    item_price: doc.data().item_price,
                    total_price: doc.data().total_price,
                    quantity: doc.data().quantity,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                    });
                });
                console.log("Cart Items Outside", cartItems);
            });
            return cartItems;
        }catch(err){
            console.log('error', err);
        }
    },
    updateCartItem: async (cartItem: CartItemModel, id: string) => {
        try{
            const cartDoc = doc(database, "cart_items", id);
            await updateDoc(cartDoc, { ...cartItem });
            console.log("updated", cartItem);
        }catch(err){
            console.log('error', err);
        }
    },
    deleteCartItem: async (id: string) => {
        try{
            const cartDoc = doc(database, "cart_items", id);
            await deleteDoc(cartDoc);
            console.log("Deleted");
        }catch(err){
            console.log('error', err);
        }
    }

};