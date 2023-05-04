<script lang="ts">
	import { employeesWritable } from './../../store';
  import { employeesHandlers} from "../../store/employees.store";
  import { Label, Input, Fileupload, Button, Select, Avatar, Sidebar, SidebarWrapper, SidebarGroup, SidebarItem, Search, Spinner } from 'flowbite-svelte'
	import { imageHandlers } from "../../store";
	import { onMount } from "svelte";
	import { algoliaConfig } from "$lib";
	import { auth } from '../../components/lib/firebase/firebase';
	import type { EmployeeModal } from '../../components/Dtos';
  let employee = {name: "", address: "", dob: new Date(), email: "", gender: "", phone: "", createdAt: new Date() };

  let fileUpload: File;

  let gender = [
    {value:"male", name: "Male"},
    {value:"female", name: "Female"}
  ]

  let employees: EmployeeModal[] = [];

    let searchClient;
    let index: any;

    let query = '';

  onMount(async () => {
    await getData();
      searchClient = algoliaConfig.algoliaSerach;
      index = searchClient.initIndex('employees');
      index.search(query).then(console.log);
  });

  $: {
    if ($employeesWritable) {
			employees = $employeesWritable;
		}
    if(query !== '') {
        searchItem();
      }else{
        searchItem();
      }
    }

    async function searchItem() {
    if(query === '') {
      const employeesResult = await employeesHandlers.getAllEmployeesExist() as any;
    if (employeesResult){
      const { employees: emp} = employeesResult;
      employees = emp;
    }
    }else {
        const result = await index.search(query);
        employees = result.hits;
    } 
  }

  async function getData() {
		await employeesHandlers.getAllEmployeesExist();

		return {
			employees: employees,
		};
	}
  
  async function addEmployee() {
    let imageURL = await imageHandlers.uploadImage(fileUpload);
    let EmployeeDto = {
      userId: auth.currentUser?.uid as string, 
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      dob: employee.dob,
      gender: employee.gender,
      employeeImage: imageURL,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null 
    };
    try {
      console.log("Employee Data: ",EmployeeDto);
      
      await employeesHandlers.addEmployee(EmployeeDto);
    } catch (error) {
      console.log(error);
    }
  }

  function updateEmployeeData(event: any) {
    employee = { ...employee, [event.target.name]: event.target.value };
  }

  async function deleteEmployee(id: string) {
    console.log(id);
    
      await employeesHandlers.deleteEmployee(id);
    };

  function pictureUpdate() {
      const img = document.querySelector('#image');
      const files = document.querySelector('#files') as HTMLInputElement;

      files.addEventListener('change', function() {
        console.log("You Are Here", files);
        
          // this refer to the file
          if(this.files === null) {
              return;
          }
          const choosedFile = this.files[0] || null;
          fileUpload = choosedFile;
          
          console.log(choosedFile);
          
          if (choosedFile) {
              const reader = new FileReader();

              reader.addEventListener('load', function() {
                  if(img === null) {
                      return;
                  }
                  img?.setAttribute('src', reader.result as string);
              });
              reader.readAsDataURL(choosedFile);
          }
      })
  }
</script>

{#if employees.length >= 0}

 <div class="employee-form flex flex-row justify-between" >
    <div class="employee-data m-5">
        <div class="employee-img my-3">
            <Label class="pb-2" for='small_size' >Employee Image</Label>
            <div class="flex space-x-4 m-3" id="logo">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image" rounded/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} bind:file={fileUpload} accept="image/*"/>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Employee Name</Label>
                <Input on:input={updateEmployeeData} bind:value={employee.name} type="text" id="name" placeholder="John"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Employee Address</Label>
                <Input on:input={updateEmployeeData} bind:value={employee.address} type="text" id="address" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Phone Number</Label>
                <Input on:input={updateEmployeeData} bind:value={employee.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
            </div>
            <div>
                <Label for="DoB" class="mb-2">Date of Birth</Label>
                    <input bind:value={employee.dob} type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </div>
        <Label>Select Gender
            <Select on:input={updateEmployeeData} class="mt-2 mb-2" items={gender} bind:value={employee.gender} />
        </Label>
        <div class="mb-3">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateEmployeeData} bind:value={employee.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={addEmployee}>+ Add Employee</Button>
    </div>
    <div style="height: calc(100vh - 72px);">
          <Sidebar class="sidebar h-full m-3">
            <SidebarWrapper class="h-full">
              <SidebarGroup class="h-full">
                <Search bind:value={query}></Search>
                {#each employees as employee}
                  <div class="flex flex-row justify-between py-2 px-2 rounded-lg hover:bg-slate-200 transition-all">
                    {#if employee.employeeImage == null}
                      <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" rounded border/><a class="m-2 text-sm" href="/reports/employees/{employee.id}">{employee.name}</a>
                    {:else}
                    <Avatar src={employee.employeeImage} rounded border/><a class="m-2 text-sm" href="/reports/employees/{employee.id}">{employee.name}</a>
                    {/if}
                      <button on:click={()=>deleteEmployee(employee.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
                        Remove
                      </button>
                  </div>
                {/each}
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
      </div> 
    </div>
    {:else}
<div class="flex justify-around center absolute left-1/2 top-1/2">
	<Spinner color="purple" size={'64'} />
</div>
{/if}