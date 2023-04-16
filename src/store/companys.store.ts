import type CompanyDto from '../components/Dtos/Companys.DTO';
import { database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';


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
    updateCompany: async (company: any, id:string) => {
        const companysDoc = doc(database, 'company', id);
        await updateDoc(companysDoc, company);
    },
    deleteCompany: async (id:string) => {
        const companysDoc = doc(database, 'company', id);
        await deleteDoc(companysDoc);
        console.log('deleted');
    },
    getAllCompanys: async () => {
        const companys = [] as any;

        const querySnapshot = await getDocs(companysCollection);
        querySnapshot.forEach((doc) => {
            companys.push({...doc.data(), id: doc.id});
        });
        console.log('companys', companys);
        return {companys, companysCount: companys.length};
    },
    getById: async (id: string) => {
        let company: any = {};
        const companyDoc = await doc(database, 'company', id);
        company = await getDoc(companyDoc);
        return company;
    }
};
