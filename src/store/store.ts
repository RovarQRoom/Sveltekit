import { RecaptchaVerifier, signInWithPhoneNumber, signOut, type ConfirmationResult, type UserCredential, type User } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../components/lib/firebase/firebase';



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
       const userCredential:UserCredential =   await  confirmationResult.confirm(code);
     
        authStore.update((store) => {
            store.user = userCredential.user;
            return store;
        });
    },
	logout: async () => {
		await signOut(auth);
	}
};
