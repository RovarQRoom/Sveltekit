<script lang="ts">
	import { authStore } from './../../../../store/store';
     import { page } from '$app/stores';
	import { Avatar, Fileupload, Label, Input, Button, Select } from 'flowbite-svelte';
	import { ItemUpdateDto } from '../../../../components/Dtos';
	import { imageHandlers, itemsHandlers } from '../../../../store';
	import { onMount } from 'svelte';
    let itemUpdate = { name: "", detail: "", type: "", quantity: 0, buy_price: "", sale_price_more: "", sale_price_less: "",item_created_date: new Date(), item_expired_date: new Date(),itemImage:"", updatedAt: new Date() };

    let fileUpload: File;

    let types = [
    {value:"oil", name: "Oil"},
    {value:"water", name: "Water"},
    {value:"rice", name: "Rice"},
    {value:"jam", name: "Jam"},
    {value:"bean", name: "Bean"},
    {value:"sugar", name: "Sugar"},
    {value:"salt", name: "Salt"},
    {value:"flour", name: "Flour"},
    {value:"spice", name: "Spice"},
    {value:"breads", name: "Breads"},
    {value:"cereals", name: "Cereals"},
    {value:"pasta", name: "Pasta"},
    {value:"sauce", name: "Sauce"},
    {value:"dairy", name: "Dairy"},
    {value:"meat", name: "Meat"},
    {value:"fish", name: "Fish"},
    {value:"vegetables", name: "Vegetables"},
    {value:"fruits", name: "Fruits"},
    {value:"nuts", name: "Nuts"},
    {value:"drinks", name: "Drinks"},
    {value:"alcohol", name: "Alcohol"},
    {value:"snacks", name: "Snacks"},
    {value:"desserts", name: "Desserts"},
    {value:"condiments", name: "Condiments"},
    {value:"other", name: "Other"},
  ]

    onMount(async () => {
        const itemId = $page.params.itemId;
        const item = await itemsHandlers.getById(itemId);
        itemUpdate = {...item, updatedAt: new Date()};
    });

        async function updateItem() {
            let imageURL = await imageHandlers.uploadImage(fileUpload);
            const itemId = $page.params.itemId;
        let myItemDto = new ItemUpdateDto(
            itemUpdate.name,
            itemUpdate.detail,
            itemUpdate.type,
            itemUpdate.quantity,
            itemUpdate.buy_price,
            itemUpdate.sale_price_more,
            itemUpdate.sale_price_less,
            itemUpdate.item_created_date,
            itemUpdate.item_expired_date,
            imageURL,
            itemUpdate.updatedAt
        ); 
    try {
      await itemsHandlers.updateItem(myItemDto,itemId);
    } catch (error) {
      console.log(error);
    }
  }

  function updateItemData(event: any) {
    itemUpdate = { ...itemUpdate, [event.target.name]: event.target.value };
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
 <div class="item-form">
    <div class="item-data m-5">
        <div class="item-img my-3">
            <Label class="pb-2" for='small_size' >Item Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src={itemUpdate.itemImage} size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} bind:file={fileUpload} />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Item Name</Label>
                <Input on:input={updateItemData} bind:value={itemUpdate.name} type="text" id="name" placeholder="Oreo"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Item Detail</Label>
                <Input on:input={updateItemData} bind:value={itemUpdate.detail} type="text" id="detail" placeholder="Item Details..."/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Item Quantity</Label>
                <Input on:input={updateItemData} bind:value={itemUpdate.quantity} type="number" id="quantity" placeholder="0-100"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Item Buying Price</Label>
                <Input on:input={updateItemData} bind:value={itemUpdate.buy_price} type="text" id="buyingPrice" placeholder="1$ - 1000$"/>
            </div>
        </div>
        <Label>Select Item Type
            <Select on:input={updateItemData} class="mt-2 mb-2" items={types} bind:value={itemUpdate.type} />
        </Label>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Sale Price More Than 100</Label>
            <Input on:input={updateItemData} bind:value={itemUpdate.sale_price_more} type="text" id="salePriceMore" placeholder="1 - 1,000,000"/>
        </div>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Sale Price Less Than 100</Label>
            <Input on:input={updateItemData} bind:value={itemUpdate.sale_price_less} type="text" id="salePriceLess" placeholder="1 - 1,000,000"/>
        </div>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Created Date</Label>
            <input bind:value={itemUpdate.item_created_date} type="date" id="salePriceMore" placeholder="1-1-2000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Expired Date</Label>
            <input bind:value={itemUpdate.item_expired_date} type="date" id="salePriceLess" placeholder="1-1-2023" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
            <Button on:click={updateItem}>Update Item</Button>
    </div>
</div> 
{/if}