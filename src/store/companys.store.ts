import type { CompanyDto, CompanyUpdateDto } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';


const companysCollection = collection(database, 'company');

export const companysHandlers = {
    addCompany: async (company: CompanyDto) => {
        console.log('company', company);
        try{
            await addDoc(companysCollection, {...company});
            console.log('Company Added Successfully');
            
        }catch(err){
            console.log('error', err);
        }
    },
    updateStore: async (company: CompanyUpdateDto, id:string) => {
        const companysDoc = doc(database, 'company', id);
        await updateDoc(companysDoc, {...company});
        console.log('updated', company);
    },
    deleteCompany: async (id:string) => {
        const companysDoc = doc(database, 'company', id);
        await updateDoc(companysDoc, {updatedAt: new Date(),deletedAt: new Date()});
        console.log('deleted');
    },
    getAllCompanysExist: async () => {
        const companys = [] as any;
        const queryUser = query(companysCollection, where('userid','==',auth.currentUser?.uid) ,where('deletedAt', '==', null));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            companys.push({...doc.data(), id: doc.id});
        });
        console.log('companys', companys);
        return {companys, companysCount: companys.length};
    },

    getAllCompanys: async () => {
        const companys = [] as any;
        const queryUser = query(companysCollection, where('userid','==',auth.currentUser?.uid));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            companys.push({...doc.data(), id: doc.id});
        });
        console.log('companys', companys);
        return companys;
    },
    getById: async (id: string) => {
        let company: any = {};
        const companyDoc = await doc(database, 'company', id);
        company = await getDoc(companyDoc);
        return company.data();
    }
};
