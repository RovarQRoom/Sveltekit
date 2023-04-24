<script lang="ts">
	import { authStore } from './../../store/store';
     import { auth } from "../../components/lib/firebase/firebase";
     import { Label, Input, Fileupload, Button, Avatar, Textarea, Sidebar, SidebarWrapper, SidebarGroup, Search } from 'flowbite-svelte'
	import { StoreDto } from "../../components/Dtos/Stores.DTO";
	import { storesHandlers } from "../../store/stores.store";
	import { imageHandlers } from '../../store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { algoliaConfig } from '$lib';
     let storeDTO = {userId: "", name: "", address: "",phone: "", email: "",detail:"", createdAt: new Date() };
   
     let fileUpload: File;

     let textareaprops = {
       id: 'details',
       name: 'details',
       label: 'Store Details',
       rows: 3,
       placeholder: 'Write About The Store Details...',
     };

     let stores: any[] = [];

     let searchClient;
    let index: any;

    let query = '';

     onMount(async () => {
       const { stores:store } = await storesHandlers.getAllStoresExist();
       stores = store;

       searchClient = algoliaConfig.algoliaSerach;
      index = searchClient.initIndex('stores');
      index.search(query).then(console.log);
     });

     $: if(query !== '') {
        searchItem();
      }else{
        searchItem();
      }

    async function searchItem() {
    if(query === '') {
      const { stores:store } = await storesHandlers.getAllStoresExist();
       stores = store;
    }else {
        const result = await index.search(query);
        stores = result.hits;
        console.log(stores);
    } 
  }
   
     
     async function addStore() {
      let imageURL = await imageHandlers.uploadImage(fileUpload);
      
       let myCompanyDto = new StoreDto(
           storeDTO.userId = auth.currentUser?.uid || "",
           storeDTO.name,
           storeDTO.email,
           storeDTO.phone,
           storeDTO.address,
           storeDTO.detail,
           imageURL,
           storeDTO.createdAt,
           ); 
       try {
         await storesHandlers.addStore(myCompanyDto);
         window.location.reload();
       } catch (error) {
         console.log(error);
       }
     }
   
     function updateStoreData(event: any) {
       storeDTO = { ...storeDTO, [event.target.name]: event.target.value };
     }

     const deleteEmployee = (id: string) => async () => {
        await storesHandlers.deleteStore(id);
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
     {#if !$authStore.loading}
   
     <div class="company-form flex flex-row justify-between">
       <div class="company-data m-5">
           <div class="company-img my-3">
               <Label class="pb-2" for='small_size' >Store Image</Label>
               <div class="flex space-x-4 m-3">
                   <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
               </div>
               <Fileupload id="files" size='sm' on:click={pictureUpdate} bind:file={fileUpload} accept="image/*"/>
           </div>
           <div class="grid gap-6 mb-6 md:grid-cols-2">
                 <div>
                     <Label for="name" class="mb-2">Store Name</Label>
                   <Input on:input={updateStoreData} bind:value={storeDTO.name} type="text" id="name" placeholder="John"/>
                 </div>
                 <div>
                   <Label for="address" class="mb-2">Store Address</Label>
                   <Input on:input={updateStoreData} bind:value={storeDTO.address} type="text" id="address" placeholder="Address"/>
               </div>
               <div>
                   <Label for="phone" class="mb-2">Store Phone Number</Label>
                   <Input on:input={updateStoreData} bind:value={storeDTO.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
               </div>
               <div>
                   <Label for="detail" class="mb-2">Store Details</Label>
                   <Textarea {...textareaprops} bind:value={storeDTO.detail} />
               </div>
           </div>
           <div class="mb-6">
               <Label for="email" class="mb-2">Email Address</Label>
               <Input on:input={updateStoreData} bind:value={storeDTO.email} type="email" id="email" placeholder="john.doe@company.com"/>
           </div>
               <Button on:click={addStore}>+ Add Store</Button>
       </div>
       <div style="height: calc(100vh - 72px);">
        <Sidebar class="sidebar h-full m-3">
          <SidebarWrapper class="h-full">
            <SidebarGroup class="h-full">
              <Search bind:value={query}></Search>
              {#each stores as store}
                <div class="flex flex-row justify-between py-2 px-2 rounded-lg hover:bg-slate-200 transition-all">
                  <Avatar src={store.storeImage} rounded border /><a class="m-2 text-sm" href="/reports/stores/{store.id}">{store.name}</a>
                  <button on:click={deleteEmployee(store.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
                    Remove
                  </button>
                </div>
              {/each}
            </SidebarGroup>
          </SidebarWrapper>
        </Sidebar>
    </div> 
   </div> 
   {/if}
   