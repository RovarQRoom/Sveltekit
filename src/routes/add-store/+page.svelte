<script lang="ts">
	import { authStore } from './../../store/store';
     import { auth } from "../../components/lib/firebase/firebase";
     import { Label, Input, Fileupload, Button, Avatar, Textarea } from 'flowbite-svelte'
	import StoreDto from "../../components/Dtos/Stores.DTO";
	import { storesHandlers } from "../../store/stores.store";
     let store = {userId: "", name: "", address: "",phone: "", email: "",detail:"", createdAt: new Date() };
   
     let textareaprops = {
       id: 'details',
       name: 'details',
       label: 'Store Details',
       rows: 3,
       placeholder: 'Write About The Store Details...',
     };
   
     
     async function addStore() {
       console.log(auth.currentUser?.uid);
       let myCompanyDto = new StoreDto(
           store.userId = auth.currentUser?.uid || "",
           store.name,
           store.address,
           store.phone,
           store.email,
           store.detail,
            store.createdAt,
           ); 
       try {
         await storesHandlers.addStore(myCompanyDto);
       } catch (error) {
         console.log(error);
       }
     }
   
     function updateStoreData(event: any) {
       store = { ...store, [event.target.name]: event.target.value };
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
               <Label class="pb-2" for='small_size' >Store Image</Label>
               <div class="flex space-x-4 m-3">
                   <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
               </div>
               <Fileupload id="files" size='sm' on:click={pictureUpdate} />
           </div>
           <div class="grid gap-6 mb-6 md:grid-cols-2">
                 <div>
                     <Label for="name" class="mb-2">Store Name</Label>
                   <Input on:input={updateStoreData} bind:value={store.name} type="text" id="name" placeholder="John"/>
                 </div>
                 <div>
                   <Label for="address" class="mb-2">Store Address</Label>
                   <Input on:input={updateStoreData} bind:value={store.address} type="text" id="address" placeholder="Address"/>
               </div>
               <div>
                   <Label for="phone" class="mb-2">Store Phone Number</Label>
                   <Input on:input={updateStoreData} bind:value={store.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
               </div>
               <div>
                   <Label for="detail" class="mb-2">Store Details</Label>
                   <Textarea {...textareaprops} bind:value={store.detail} />
               </div>
           </div>
           <div class="mb-6">
               <Label for="email" class="mb-2">Email Address</Label>
               <Input on:input={updateStoreData} bind:value={store.email} type="email" id="email" placeholder="john.doe@company.com"/>
           </div>
               <Button on:click={addStore}>+ Add Store</Button>
       </div>
   </div> 
   {/if}
   