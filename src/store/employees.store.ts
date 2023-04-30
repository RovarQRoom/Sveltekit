import { getAuth, updateProfile } from 'firebase/auth';
import type {EmployeeDto, EmployeeUpdateDto} from '../components/Dtos';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { authHandlers } from './store';
import { rolesHandlers } from './roles.store';


const employeesCollection = collection(database, 'employees');

export const employeesHandlers = {
    addEmployee: async (employee: EmployeeDto) => {
        console.log('employee', employee);
        try{
            const users = await authHandlers.getUserByPhonenumber(employee.phone);
            const roles = await rolesHandlers.getEmployeeRole();

            if(users){
                await updateDoc(doc(database, 'users', users.id), {role_details:{...employee, userid: users.id},roles: roles.roles, type: roles.roleType});
                console.log('User Updated Successfully');

                await addDoc(employeesCollection, {...employee, userid: users.id, role: roles});
                console.log('Employee Added Successfully');
                
            }else{
                await addDoc(employeesCollection, {...employee});
                console.log('Employee Added Successfully');
            }


        }catch(err){
            console.log('error', err);
        }
    },
    updateEmployee: async (employee: EmployeeUpdateDto, id:string) => {
        const employeesDoc = doc(database, 'employees', id);
        await updateDoc(employeesDoc, {...employee});
        console.log('updated' , employeesDoc);
    },
    deleteEmployee: async (id:string) => {
        const employeesDoc = doc(database, 'employees', id);
        await updateDoc(employeesDoc,{updatedAt: new Date(),deletedAt: new Date()});
        console.log('deleted' , employeesDoc);
    },
    getAllEmployeesExist: async () => {
        const employees: any[] = [];

        let user: any = {};
        if(!auth.currentUser?.uid) return;
            const userDoc = doc(database, 'users', auth.currentUser?.uid);
            user = await getDoc(userDoc);
            if(user.data().type.includes('admin')){
                const queryUser = query(employeesCollection, where('deletedAt', '==', null));

                const querySnapshot = await getDocs(queryUser);
                querySnapshot.forEach((doc) => {
                    employees.push({...doc.data(), id: doc.id});
                });
                console.log('employees', employees);
                return {employees:employees, employeesCount: employees.length};
            }else{
                const queryUser = query(employeesCollection, where('userid', '==', auth.currentUser?.uid), where('deletedAt', '==', null));
                const querySnapshot = await getDocs(queryUser);
                querySnapshot.forEach((doc) => {
                    employees.push({...doc.data(), id: doc.id});
                });
                console.log('employees', employees);
             return {employees:employees, employeesCount: employees.length};
            }

    },
    getAllEmployees: async () => {
        const employees = [] as any;
        let user: any = {};
        if(!auth.currentUser?.uid) return;
            const userDoc = doc(database, 'users', auth.currentUser?.uid);
            user = await getDoc(userDoc);
            if(user.data().type.includes('admin')){
                const queryUser = query(employeesCollection);

                const querySnapshot = await getDocs(queryUser);
                querySnapshot.forEach((doc) => {
                    employees.push({...doc.data(), id: doc.id});
                });
                console.log('employees', employees);
                return employees;
            }else{
                const queryUser = query(employeesCollection, where('userid', '==', auth.currentUser?.uid));

                const querySnapshot = await getDocs(queryUser);
                querySnapshot.forEach((doc) => {
                    employees.push({...doc.data(), id: doc.id});
                });
                console.log('employees', employees);
                return employees; 
            }
        
    },
    getById: async (id: string) => {
        let employee: any = {};
        const employeeDoc = await doc(database, 'employees', id);
        employee = await getDoc(employeeDoc);
        
        return employee.data();
    }
};
