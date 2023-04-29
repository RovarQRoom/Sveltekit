import { RecaptchaVerifier, signInWithPhoneNumber, signOut, type ConfirmationResult, type UserCredential, type User, updateProfile } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth, database} from '../components/lib/firebase/firebase';
import type { ProfileUpdateDTO } from '../components/Dtos/Profile.DTO';
import { doc, getDoc, getDocs, updateDoc, collection, query, where, limit } from 'firebase/firestore';


export const authStore = writable<{
    user: User |null;
    confirmationResult?: null | ConfirmationResult;
    loading: boolean;
    data: any;
}>({
	user: null,
    confirmationResult: null ,
	loading: true,
	data: {}
});

const usersCollection = collection(database,'users');

export const authHandlers = {
	signup: async (phoneNumber: string) => {
        console.log('phoneNumber', phoneNumber);
        try{
            const recaptcha = new RecaptchaVerifier(
                'sign-in-button',
                {
                    size: 'invisible'
                },
                auth
            );
         const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);

         authStore.update((store) => {
             store.confirmationResult = confirmationResult ? confirmationResult : null;
             return store;
         });
        }catch(err: any){
            console.log('err', err);
        }
     // set confirmationResult in store
	},
    confirm: async (code: string,confirmationResult: ConfirmationResult) => {
        console.log('code', code);
        // get confirmationResult from store
       const userCredential:UserCredential = await confirmationResult.confirm(code);
     
        authStore.update((store) => {
            store.user = userCredential.user;
            return store;
        });

    },
	logout: async () => {
		await signOut(auth);
	},
    getUserById: async (id: string) => {
        const userDoc = doc(database, 'users', id);
        
        const user = await getDoc(userDoc);
        return user.data();
    },
    getUserByPhonenumber: async (phonenumber: string) => {
        const users = [] as any;
        const queryUser = query(usersCollection, where('phoneNumber', '==', phonenumber), limit(1));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            users.push({...doc.data(), id: doc.id});
        });

        console.log('Users', users);

        return users[0];
    },
    addAdminRoleToUser: async (phoneNumber: string) => {
        const users = [] as any;
        const queryUser = query(usersCollection, where('phoneNumber', '==', phoneNumber));
        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            users.push({...doc.data(), id: doc.id});
        });
        console.log('Users Admin Role', users);

        await updateDoc(doc(database, 'users', users[0].id), {
            roles: ['admin']
        });
        
        console.log('User roles updated'); 
    },
    addCompanyRoleToUser: async (phoneNumber: string) => {
        const users = [] as any;
        const queryUser = query(usersCollection, where('phoneNumber', '==', phoneNumber));
        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            console.log('doc', doc.data());
            
            users.push({...doc.data(), id: doc.id});
        });
        console.log('Users Company Role', users);

        await updateDoc(doc(database, 'users', users[0].id), {
            roles: ['company']
        });
        
        console.log('User roles updated'); 
    },
    addStoreRoleToUser: async (phoneNumber: string) => {
        const users = [] as any;
        const queryUser = query(usersCollection, where('phoneNumber', '==', phoneNumber));
        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            users.push({...doc.data(), id: doc.id});
        });
        console.log('Users Store Role', users);

        await updateDoc(doc(database, 'users', users[0].id), {
            roles: ['store']
        });
        
        console.log('User roles updated'); 
    }
};

export const profileHandlers = {
    updateProfile: async (profile:ProfileUpdateDTO) => {
        const user = auth.currentUser;
        if(user){
            
            try {
                await updateProfile(user, {
                    displayName: profile.name,
                    photoURL: profile.photoURL,
                });
                console.log('Updated Profile');
                
                // if(profile.email !== user.email && profile.email !== ''){
                //     await signInWithCredential(auth, user.uid);
                //     await updateEmail(user, profile.email);
                //      console.log('Updated Email');
                // }
            } catch (error) {
                console.log('error', error);
            }         
        }
    }
}
