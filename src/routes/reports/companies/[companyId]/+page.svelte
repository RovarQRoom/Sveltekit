<script lang="ts">
	import { authStore } from './../../../../store/store';
     import { page } from '$app/stores';
	import { Avatar, Fileupload, Label, Input, Select, Button, Textarea } from 'flowbite-svelte';
	import { CompanyUpdateDto } from '../../../../components/Dtos';
	import { companysHandlers } from '../../../../store';
	import { onMount } from 'svelte';
    let companyUpdate = { name: "", email: "", address: "", phone: "",  detail:"", updatedAt: new Date() };

    let textareaprops = {
    id: 'details',
    name: 'details',
    label: 'Company Details',
    rows: 3,
    placeholder: 'Write About The Company Details...',
    };

    onMount(async () => {
        const companyId = $page.params.companyId;
        const company = await companysHandlers.getById(companyId);
        companyUpdate = {...company , updatedAt: new Date()};
    });

        async function updateCompany() {
            const companyId = $page.params.companyId;
            console.log(companyId);
            
        let myCompanyDto = new CompanyUpdateDto(
            companyUpdate.name,
            companyUpdate.email,
            companyUpdate.phone,
            companyUpdate.address,
            companyUpdate.detail,
            companyUpdate.updatedAt
        ); 
    try {
      await companysHandlers.updateCompany(myCompanyDto,companyId);
    } catch (error) {
      console.log(error);
    }
  }

  function updateCompanyData(event: any) {
    companyUpdate = { ...companyUpdate, [event.target.name]: event.target.value };
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
            <Label class="pb-2" for='small_size' >Company Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Company Name</Label>
                <Input on:input={updateCompanyData} bind:value={companyUpdate.name} type="text" id="name" placeholder="John"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Company Address</Label>
                <Input on:input={updateCompanyData} bind:value={companyUpdate.address} type="text" id="address" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Phone Number</Label>
                <Input on:input={updateCompanyData} bind:value={companyUpdate.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
            </div>
            <div>
                <Label for="detail" class="mb-2">Company Details</Label>
                <Textarea {...textareaprops} bind:value={companyUpdate.detail} />
            </div>
        </div>
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateCompanyData} bind:value={companyUpdate.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={updateCompany}>Update Company</Button>
    </div>
</div> 
{/if}