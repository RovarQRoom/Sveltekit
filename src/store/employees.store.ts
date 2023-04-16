import type EmployeeDto from '../components/Dtos/Employees.DTO';
import { auth, database } from '../components/lib/firebase/firebase';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';


const employeesCollection = collection(database, 'employees');

export const employeesHandlers = {
    addEmployee: async (employee: EmployeeDto) => {
        console.log('employee', employee);
        try{
            await addDoc(employeesCollection, {...employee});
            console.log('Employee Added Successfully');
            
        }catch(err){
            console.log('error', err);
        }
    },
    updateEmployee: async (employee: any, id:string) => {
        const employeesDoc = doc(database, 'employees', id);
        await updateDoc(employeesDoc, employee);
    },
    deleteEmployee: async (id:string) => {
        const employeesDoc = doc(database, 'employees', id);
        await updateDoc(employeesDoc,{deletedAt: new Date()});
        console.log('deleted' , employeesDoc);
    },
    getAllEmployeesExist: async () => {
        const employees = [] as any;
        const queryUser = query(employeesCollection, where('userid', '==', auth.currentUser?.uid), where('deletedAt', '==', null));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
        });

        console.log('employees', employees);
        return {employees, employeesCount: employees.length};
    },
    getAllEmployees: async () => {
        const employees = [] as any;
        const queryUser = query(employeesCollection, where('userid', '==', auth.currentUser?.uid));

        const querySnapshot = await getDocs(queryUser);
        querySnapshot.forEach((doc) => {
            employees.push({...doc.data(), id: doc.id});
        });
        console.log('employees', employees);
        return employees;
    },
    getById: async (id: string) => {
        let employee: any = {};
        const employeeDoc = await doc(database, 'employees', id);
        employee = await getDoc(employeeDoc);
        return employee;
    }
};
