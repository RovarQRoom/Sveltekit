import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../components/lib/firebase/firebase";

export const imageHandlers = {
    uploadImage: async (file: File) => {
        console.log('file', file);
        const fileRef = ref(storage, `images/${file.name}`);
        await uploadBytes(fileRef, file);
        console.log('uploaded');
        
        const url = await getDownloadURL(fileRef);
        return url;
    }
};