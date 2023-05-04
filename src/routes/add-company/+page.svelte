<script lang="ts">
	import { companiesWritable } from './../../store';
  import { CreateCompanyDto } from "../../components/Dtos/Companys.DTO";
  import { auth } from "../../components/lib/firebase/firebase";
  import { Label, Input, Fileupload, Button, Avatar, Textarea, Sidebar, SidebarWrapper, SidebarGroup, Search, Spinner } from 'flowbite-svelte'
	import { companysHandlers } from "../../store/companys.store";
	import { imageHandlers } from "../../store";
	import { onMount } from "svelte";
	import { algoliaConfig } from "$lib";
  let companyDTO = {userId: "", name: "", address: "",phone: "", email: "",detail:"", createdAt: new Date() };

  let fileUpload: File;

  let textareaprops = {
    id: 'details',
    name: 'details',
    label: 'Company Details',
    rows: 3,
    placeholder: 'Write About The Company Details...',
  };

  let companies: any[] = [];

  let searchClient;
    let index: any;

    let query = '';

  onMount(async () => {
    await getData();
    console.log("Data : ",companies);
    searchClient = algoliaConfig.algoliaSerach;
      index = searchClient.initIndex('companies');
      index.search(query).then(console.log);
  });


  $: {
    if ($companiesWritable) {
      companies = $companiesWritable;
    }
    if(query !== '') {
        searchItem();
      }else{
        searchItem();
      }
    }

    async function getData(){
      await companysHandlers.getAllCompanysExist();
      return {
        companies:companies
      }
    }

    async function searchItem() {
    if(query === '') {
      const companysResult = await companysHandlers.getAllCompanysExist() as any;
    if(!companysResult) return;
      companies = companysResult.companys;
    }else {
        const result = await index.search(query);
        companies = result.hits;
        console.log(companies);
    } 
  }

  
  async function addCompany() {
    let imageURL = await imageHandlers.uploadImage(fileUpload);
    let myCompanyDto = new CreateCompanyDto(
        companyDTO.userId = auth.currentUser?.uid || "",
        companyDTO.name,
        companyDTO.email,
        companyDTO.phone,
        companyDTO.address,
        companyDTO.detail,
        imageURL,
        companyDTO.createdAt,
        ); 
    try {
      await companysHandlers.addCompany(myCompanyDto);
    } catch (error) {
      console.log(error);
    }
  }

  function updateCompanyData(event: any) {
    companyDTO = { ...companyDTO, [event.target.name]: event.target.value };
  }

  async function deleteCompanies(id: string) {
    console.log(id);
      await companysHandlers.deleteCompany(id);
    };

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
  {#if companies.length >= 0}
  <div class="company-form flex flex-row justify-between">
    <div class="company-data m-5">
        <div class="company-img my-3">
            <Label class="pb-2" for='small_size' >Company Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} bind:file={fileUpload} accept="image/*"/>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Company Name</Label>
                <Input on:input={updateCompanyData} bind:value={companyDTO.name} type="text" id="name" placeholder="John"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Company Address</Label>
                <Input on:input={updateCompanyData} bind:value={companyDTO.address} type="text" id="address" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Company Phone Number</Label>
                <Input on:input={updateCompanyData} bind:value={companyDTO.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
            </div>
            <div>
                <Label for="detail" class="mb-2">Company Details</Label>
                <Textarea {...textareaprops} bind:value={companyDTO.detail} />
            </div>
        </div>
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateCompanyData} bind:value={companyDTO.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={addCompany}>+ Add Company</Button>
    </div>
    <div style="height: calc(100vh - 72px);">
      <Sidebar class="sidebar h-full m-3">
        <SidebarWrapper class="h-full">
          <SidebarGroup class="h-full">
            <Search bind:value={query}></Search>
            {#each companies as company}
              <div class="flex flex-row justify-between py-2 px-2 rounded-lg hover:bg-slate-200 transition-all">
                <Avatar src={company.companyImage} rounded border /><a class="m-2 text-sm" href="/reports/companies/{company.id}">{company.name}</a>
                <button on:click={()=>deleteCompanies(company.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
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
