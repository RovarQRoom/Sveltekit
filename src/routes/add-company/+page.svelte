<script lang="ts">
  import { CompanyDto } from "../../components/Dtos/Companys.DTO";
  import { auth } from "../../components/lib/firebase/firebase";
  import { Label, Input, Fileupload, Button, Select, Avatar, Textarea } from 'flowbite-svelte'
	import { companysHandlers } from "../../store/companys.store";
	import { authStore } from "../../store/store";
  let company = {userId: "", name: "", address: "",phone: "", email: "",detail:"", createdAt: new Date() };

  let textareaprops = {
    id: 'details',
    name: 'details',
    label: 'Company Details',
    rows: 3,
    placeholder: 'Write About The Company Details...',
  };

  
  async function addCompany() {
    console.log(auth.currentUser?.uid);
    let myCompanyDto = new CompanyDto(
        company.userId = auth.currentUser?.uid || "",
        company.name,
        company.address,
        company.phone,
        company.email,
        company.detail,
        company.createdAt,
        ); 
    try {
      await companysHandlers.addCompany(myCompanyDto);
    } catch (error) {
      console.log(error);
    }
  }

  function updateCompanyData(event: any) {
    company = { ...company, [event.target.name]: event.target.value };
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
  <div class="company-form">
    <div class="company-data m-5">
        <div class="company-img my-3">
            <Label class="pb-2" for='small_size' >Company Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Company Name</Label>
                <Input on:input={updateCompanyData} bind:value={company.name} type="text" id="name" placeholder="John"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Company Address</Label>
                <Input on:input={updateCompanyData} bind:value={company.address} type="text" id="address" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Company Phone Number</Label>
                <Input on:input={updateCompanyData} bind:value={company.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
            </div>
            <div>
                <Label for="detail" class="mb-2">Company Details</Label>
                <Textarea {...textareaprops} bind:value={company.detail} />
            </div>
        </div>
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateCompanyData} bind:value={company.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={addCompany}>+ Add Company</Button>
    </div>
</div> 
{/if}
