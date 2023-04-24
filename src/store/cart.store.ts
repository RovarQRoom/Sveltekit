import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../components/lib/firebase/firebase";
import type { CartDTO } from "../components/Dtos";

const cartsCollection = collection(database, "carts");

export const cartsHandlers = {
    addCart: async (cart: CartDTO) => {
        console.log("Cart ", cart);
        try {
            await addDoc(cartsCollection, {...cart});
            console.log("Cart Added Successfully");
        } catch (err) {
            console.log("error", err);
        }
    },
    getCart: async (id:string) => {
        try {
            let cart: any = {};
            const cartDoc = await doc(database, "carts", id);
            
            cart = await getDoc(cartDoc);
            console.log("orders", cart.data());
            
            return cart.data();
        } catch (err) {
            console.log("error", err);
        }
    },
    incrementQunatity: async (id:string,index:number) => {
        try {
            let cart: any = {};
            const cartDoc = await doc(database, "carts", id);

            cart = await getDoc(cartDoc);
            
            const items = cart.data().item;
            const item = cart.data().item[index];
            console.log("you can Increment");
            item.quantity = item.quantity + 1;

            items[index] = item;
            
            
            await updateDoc(cartDoc, {
                item:items,
                price: cart.data().price + parseInt(cart.data().item[index].buy_price),
                updatedAt: new Date()
            });

        } catch (err) {
            console.log("error", err);
        }
    },
    decrementQunatity: async (id:string, index:number) => {
        try {
            let cart: any = {};
            let cantDecrement = false;
            const cartDoc = await doc(database, "carts", id);

            cart = await getDoc(cartDoc);
            
            const items = cart.data().item;
            const item = cart.data().item[index];
            if(item.quantity > 1){
                console.log("you can decrement");
                
                item.quantity = item.quantity - 1;
            }else{
                console.log("you can't decrement");
                cantDecrement = true;
                item.quantity = 1;
            }

            items[index] = item;
            
            if(!cantDecrement){
            await updateDoc(cartDoc, {
                item:items,
                price: cart.data().price - parseInt(cart.data().item[index].buy_price),
                updatedAt: new Date()
            });
        }

        } catch (err) {
            console.log("error", err);
        }
    },
    deleteCartAfterOrder: async (id:string) => {
        try {
            let cart: any = {};
            const cartDoc = await doc(database, "carts", id);

            cart = await getDoc(cartDoc);
            
            await updateDoc(cartDoc, {
                deletedAt: new Date()
            });

        } catch (err) {
            console.log("error", err);
        }
    }
};