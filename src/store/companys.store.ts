import type { CreateCompanyDto, CompanyModal, CompanyUpdateModal } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, getDoc, query, where, onSnapshot } from 'firebase/firestore';
import { authHandlers } from './store';
import { rolesHandlers } from './roles.store';
import { writable } from 'svelte/store';

export const companiesWritable = writable<CompanyModal[]>([]);

const companysCollection = collection(database, 'company');

export const companysHandlers = {
    addCompany: async (company: CreateCompanyDto) => {
        console.log('company', company);
        try{
            const users = await authHandlers.getUserByPhonenumber(company.phone);
            const roles = await rolesHandlers.getCompanyRole();

            if(users){
                await updateDoc(doc(database, 'users', users.id), {role_details:{...company, userid: users.id},roles: roles.roles, type: roles.roleType});
                console.log('User Updated Successfully');

                await addDoc(companysCollection, {...company, userid: users.id, role: roles});
                console.log('Company Added Successfully');
                
            }else{
                await addDoc(companysCollection, {...company});
                console.log('Company Added Successfully');
            }


        }catch(err){
            console.log('error', err);
        }
    },
    updateStore: async (company: CompanyUpdateModal, id:string) => {
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
        if(!auth.currentUser) return;
        const user = await getDoc(doc(database, 'users', auth.currentUser.uid));

        let queryCompanies;
        if(user.data()?.type === 'admin'){
            queryCompanies = query(companysCollection, where('deletedAt', '==', null));
        }else{
            queryCompanies = query(companysCollection, where('deletedAt', '==', null), where('userid', '==', auth.currentUser.uid));
        }
        try{
            onSnapshot(queryCompanies, (querySnapshot) => {
             const companies: CompanyModal[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    address: doc.data().address,
                    detail: doc.data().detail,
                    companyImage: doc.data().companyImage,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                 }));
          
                 companiesWritable.set(companies);
             });
         }catch(err){
             console.log('error', err);
         }
    },

    getAllCompanys: async () => {
        if(!auth.currentUser) return;
        const user = await getDoc(doc(database, 'users', auth.currentUser.uid));

        let queryCompanies;
        if(user.data()?.type === 'admin'){
            queryCompanies = query(companysCollection);
        }else{
            queryCompanies = query(companysCollection, where('userid', '==', auth.currentUser.uid));
        }
        try{
            onSnapshot(queryCompanies, (querySnapshot) => {
             const companies: CompanyModal[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    address: doc.data().address,
                    detail: doc.data().detail,
                    companyImage: doc.data().companyImage,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                    deletedAt: doc.data().deletedAt,
                 }));
          
                 companiesWritable.set(companies);
             });
         }catch(err){
             console.log('error', err);
         }
    },
    getById: async (id: string) => {
        let company: any = {};
        const companyDoc = await doc(database, 'company', id);
        company = await getDoc(companyDoc);
        return company.data();
    }
};
