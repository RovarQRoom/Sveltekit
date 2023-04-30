import type { CompanyDto, CompanyUpdateDto } from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { authHandlers } from './store';
import { rolesHandlers } from './roles.store';


const companysCollection = collection(database, 'company');

export const companysHandlers = {
    addCompany: async (company: CompanyDto) => {
        console.log('company', company);
        // try{
        //     await addDoc(companysCollection, {...company});
        //     console.log('Company Added Successfully');
            
        // }catch(err){
        //     console.log('error', err);
        // }
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
        let user: any = {};
        if(!auth.currentUser?.uid) return;
            const userDoc = doc(database, 'users', auth.currentUser?.uid);
            user = await getDoc(userDoc);
            if(user.data().type.includes('admin')){
                const queryUser = query(companysCollection, where('deletedAt', '==', null));

                const querySnapshot = await getDocs(queryUser);
                querySnapshot.forEach((doc) => {
                    companys.push({...doc.data(), id: doc.id});
                });
                console.log('employees', companys);
                return {companys:companys, companysCount: companys.length};
            }else{
                const queryUser = query(companysCollection, where('userid','==',auth.currentUser?.uid) ,where('deletedAt', '==', null));
        
                const querySnapshot = await getDocs(queryUser);
                querySnapshot.forEach((doc) => {
                    companys.push({...doc.data(), id: doc.id});
                });
                console.log('companys', companys);
                return {companys, companysCount: companys.length};
            }
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
