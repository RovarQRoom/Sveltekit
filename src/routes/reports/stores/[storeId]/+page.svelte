<script lang="ts">
	import { authStore } from './../../../../store/store';
     import { page } from '$app/stores';
	import { Avatar, Fileupload, Label, Input, Button, Textarea } from 'flowbite-svelte';
	import { StoreUpdateDto } from '../../../../components/Dtos';
	import { imageHandlers, storesHandlers } from '../../../../store';
	import { onMount } from 'svelte';
    let storeUpdate = { name: "", email: "", address: "", phone: "",  detail:"", storeImage:"", updatedAt: new Date() };

    let textareaprops = {
    id: 'details',
    name: 'details',
    label: 'Company Details',
    rows: 3,
    placeholder: 'Write About The Company Details...',
    };

    let fileUpload: File;

    onMount(async () => {
        const storeId = $page.params.storeId;
        const store = await storesHandlers.getById(storeId);
        storeUpdate = {...store , updatedAt: new Date()};
    });

        async function updateStore() {
            const storeId = $page.params.storeId;
            let imageURL = await imageHandlers.uploadImage(fileUpload);
        let myStoreDto = new StoreUpdateDto(
            storeUpdate.name,
            storeUpdate.email,
            storeUpdate.phone,
            storeUpdate.address,
            storeUpdate.detail,
            imageURL,
            storeUpdate.updatedAt
        ); 
    try {
      await storesHandlers.updateStore(myStoreDto,storeId);
    } catch (error) {
      console.log(error);
    }
  }

  function updateStoreData(event: any) {
    storeUpdate = { ...storeUpdate, [event.target.name]: event.target.value };
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
 <div class="employee-form">
    <div class="employee-data m-5">
        <div class="employee-img my-3">
            <Label class="pb-2" for='small_size' >Store Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src={storeUpdate.storeImage} size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} bind:file={fileUpload} />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Store Name</Label>
                <Input on:input={updateStoreData} bind:value={storeUpdate.name} type="text" id="name" placeholder="John"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Store Address</Label>
                <Input on:input={updateStoreData} bind:value={storeUpdate.address} type="text" id="address" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Phone Number</Label>
                <Input on:input={updateStoreData} bind:value={storeUpdate.phone} type="tel" id="phone" placeholder="0770-111-1551"/>
            </div>
            <div>
                <Label for="detail" class="mb-2">Store Details</Label>
                <Textarea {...textareaprops} bind:value={storeUpdate.detail} />
            </div>
        </div>
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input on:input={updateStoreData} bind:value={storeUpdate.email} type="email" id="email" placeholder="john.doe@company.com"/>
        </div>
            <Button on:click={updateStore}>Update Store</Button>
    </div>
</div> 
{/if}