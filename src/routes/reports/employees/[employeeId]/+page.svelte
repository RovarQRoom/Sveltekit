<script lang="ts">
	import { authStore } from './../../../../store/store';
     import { page } from '$app/stores';
	import { Avatar, Fileupload, Label, Input, Select, Button } from 'flowbite-svelte';
	import { EmployeeUpdateDto } from '../../../../components/Dtos';
	import { employeesHandlers } from '../../../../store';
	import { onMount } from 'svelte';
    let employeeUpdate = { name: "", address: "",  email: "", phone: "", updatedAt: new Date() };

    onMount(async () => {
        const employeeId = $page.params.employeeId;
        const employee = await employeesHandlers.getById(employeeId);
        employeeUpdate = {...employee, updatedAt: new Date()};
    });

        async function updateEmployee() {
            const employeeId = $page.params.employeeId;
        let myEmployeeDto = new EmployeeUpdateDto(
            employeeUpdate.name,
            employeeUpdate.email,
            employeeUpdate.phone,
            employeeUpdate.address,
            employeeUpdate.updatedAt
        ); 
    try {
      await employeesHandlers.updateEmployee(myEmployeeDto,employeeId);
    } catch (error) {
      console.log(error);
    }
  }

  function updateEmployeeData(event: any) {
    employeeUpdate = { ...employeeUpdate, [event.target.name]: event.target.value };
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
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Employee Name</Label>
                <Input on:input={updateEmployeeData} bind:value={employeeUpdate.name} type="text" id="name" placeholder="John"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Employee Address</Label>
                <Input on:input={updateEmployeeData} bind:value={employeeUpdate.address} type="text" id="address" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Phone Number</Label>
                <Input on:input={updateEmployeeData} bind:value={employeeUpdate.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
            </div>
        </div>
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateEmployeeData} bind:value={employeeUpdate.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={updateEmployee}>Update Employee</Button>
    </div>
</div> 
{/if}