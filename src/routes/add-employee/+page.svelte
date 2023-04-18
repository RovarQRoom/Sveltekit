<script lang="ts">
  import {EmployeeDto} from "../../components/Dtos";
  import { auth } from "../../components/lib/firebase/firebase";
  import { employeesHandlers} from "../../store/employees.store";
  import { Label, Input, Fileupload, Button, Select, Avatar } from 'flowbite-svelte'
	import { authStore } from "../../store/store";
  let employee = {userId: "", name: "", address: "", dob: new Date(), email: "", gender: "", phone: "", createdAt: new Date() };


  let gender = [
    {value:"male", name: "Male"},
    {value:"female", name: "Female"}
  ]
  
  async function addEmployee() {
    console.log(auth.currentUser?.uid);
    let myEmployeeDto = new EmployeeDto(
        employee.userId = auth.currentUser?.uid || "",
        employee.name,
        employee.email,
        employee.phone,
        employee.address,
        employee.dob,
        employee.gender,
        employee.createdAt,
        ); 
    try {
      await employeesHandlers.addEmployee(myEmployeeDto);
    } catch (error) {
      console.log(error);
    }
  }

  function updateEmployeeData(event: any) {
    employee = { ...employee, [event.target.name]: event.target.value };
  }

  function pictureUpdate(event: any) {
      const img = document.querySelector('#image');
      const files = document.querySelector('#files') as HTMLInputElement;

      files.addEventListener('change', function() {
        console.log("You Are Here", files);
        
          // this refer to the file
          if(this.files === null) {
              return;
          }
          const choosedFile = this.files[0] || null;
          
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
{#if !$authStore.loading}
 <div class="employee-form">
    <div class="employee-data m-5">
        <div class="employee-img my-3">
            <Label class="pb-2" for='small_size' >Employee Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image" rounded/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} />
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
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateEmployeeData} bind:value={employee.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={addEmployee}>+ Add Employee</Button>
    </div>
</div> 
{/if}