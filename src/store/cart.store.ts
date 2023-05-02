import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, database, realTimeDb } from "../components/lib/firebase/firebase";
import type { CartDTO } from "../components/Dtos";
import { get, ref, set, update } from "firebase/database";
import { goto } from "$app/navigation";

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

        // const cartRef = ref(realTimeDb, `carts/${cart.userid}`);
        // set(cartRef, {
        //     ...cart
        //     });

        // console.log("Cart Added Successfully in Realtime Database");
        
    },
    updateCart: async (cart: CartDTO, id:string) => {
        const cartDoc = doc(database, "carts", id);
        await updateDoc(cartDoc, {...cart});
        console.log("updated", cart);
    },
    checkCarts: async () => {
        try {
            let cart: any = {};
            const cartDocs = query(cartsCollection, where("userid", "==", auth.currentUser?.uid), where("deletedAt", "==", null),limit(1));
            const cartSnapshot = await getDocs(cartDocs);
            cartSnapshot.forEach((doc) => {
                cart = {...doc.data(), id: doc.id};
            });
            console.log("cart", cart);
            return cart;
        } catch (err) {
            console.log("error", err);
        }
    },
    getCart: async (id:string) => {
        try {
            let cart: any = {};
            const cartDoc = await doc(database, "carts", id);

            cart = await getDoc(cartDoc);
            if(cart.data().deletedAt === null) {
                console.log("orders", cart.data());
                
                return cart.data();
            }else{
                goto("/home");
                throw new Error("Cart is Not Available");
            }
        } catch (err) {
            console.log("error", err);
        }

        // Realtime Database Which is The Old One
        // const userId = auth.currentUser?.uid;
        // const cartRef = ref(realTimeDb, `carts/${userId}`);
        // const cart = await get(cartRef);

        // console.log("cart", cart.val());
        

        // return cart.val();
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
            
            console.log("cart", cart.data());
            

            await updateDoc(cartDoc, {
                updatedAt: new Date(),
                deletedAt: new Date()
            });

            console.log("Cart Deleted Successfully", cart.data());
            

        } catch (err) {
            console.log("error", err);
        }
    }
};