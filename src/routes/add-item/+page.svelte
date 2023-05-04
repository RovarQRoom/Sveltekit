<script lang="ts">
	import { itemsWritable } from './../../store';
  import { auth } from "../../components/lib/firebase/firebase";
	import { Avatar, Fileupload, Label, Input, Select, Button, Sidebar, SidebarWrapper, SidebarGroup, Search, Dropdown, DropdownItem, Spinner } from "flowbite-svelte";
	import {ItemDto, type ItemModal} from "../../components/Dtos/Items.DTO";
	import { itemsHandlers } from "../../store/items.store";
	import { imageHandlers } from "../../store";
	import { onMount } from "svelte";
	import { algoliaConfig } from "$lib";
  import { types } from "./Item_types/item_types";
  
    let itemDto = { userId:"", name: "", detail: "", type: "", item_store_quantity: 0, buyingPrice: "", salesPriceUp: "", salesPriceDown: "",itemCreatedDate: new Date(), itemExpiredDate: new Date(), createdAt: new Date() };
    let fileUpload: File;

    let items: ItemModal[] = [];

    let searchClient;
    let index: any;

    let query = '';

  onMount(async () => {
    await getData();
      searchClient = algoliaConfig.algoliaSerach;
      index = searchClient.initIndex('items');
      index.search(query).then(console.log);
  });

  $: {
    if ($itemsWritable) {
			items = $itemsWritable;
		}
    if(query !== '') {
        searchItem();
      }else{
        searchItem();
      }
  }

  async function getData() {
		await itemsHandlers.getAllItemsExist();

		return {
			items: items,
		};
	}
  
  async function addItem() {
    const imageURL = await imageHandlers.uploadImage(fileUpload);
    console.log(imageURL);
    
    let myItemDto = new ItemDto(
        itemDto.userId = auth.currentUser?.uid || "",
        itemDto.name,
        itemDto.detail,
        itemDto.type,
        itemDto.item_store_quantity,
        itemDto.buyingPrice,
        itemDto.salesPriceUp,
        itemDto.salesPriceDown,
        itemDto.itemCreatedDate,
        itemDto.itemExpiredDate,
        imageURL,
        itemDto.createdAt,
    ); 
    try {
      await itemsHandlers.addItem(myItemDto);
    } catch (error) {
      console.log(error);
    }
  }

  function updateItemData(event: any) {
    itemDto = { ...itemDto, [event.target.name]: event.target.value };
  }

   async function deleteItem(id: string) {
        await itemsHandlers.deleteItem(id);
        console.log("Item Deleted", id);
    };
  
  async function searchItem() {
    if(query === '') {
      const itemsResult = await itemsHandlers.getAllItemsExist() as any;
    if (itemsResult){
      const { employees: emp} = itemsResult;
      items = emp;
    }
    }else {
        const result = await index.search(query);
        items = result.hits;
    } 
  }

  function pictureUpdate() {
      const img = document.querySelector('#image');
      const files = document.querySelector('#files') as HTMLInputElement;
     
      files.addEventListener('change', function() {
          // this refer to the file
          if(this.files === null) {
              return;
          }
          const choosedFile = this.files[0] || null;
          fileUpload = choosedFile;
          console.log("File : ",choosedFile);
          
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
      });
  }
  
  </script>
    {#if items.length >= 0}
  <div class="item-form flex flex-row justify-between">
    <div class="item-data m-5">
        <div class="item-img my-3">
            <Label class="pb-2" for='small_size' >Item Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} bind:file={fileUpload} accept="image/*"/>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Item Name</Label>
                <Input on:input={updateItemData} bind:value={itemDto.name} type="text" id="name" placeholder="Oreo"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Item Detail</Label>
                <Input on:input={updateItemData} bind:value={itemDto.detail} type="text" id="detail" placeholder="Item Details..."/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Item Quantity</Label>
                <Input on:input={updateItemData} bind:value={itemDto.item_store_quantity} type="number" id="quantity" placeholder="0-100"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Item Buying Price</Label>
                <Input on:input={updateItemData} bind:value={itemDto.buyingPrice} type="text" id="buyingPrice" placeholder="1$ - 1000$"/>
            </div>
        </div>
        <Label>Select Item Type
            <Select on:input={updateItemData} class="mt-2 mb-2" items={types} bind:value={itemDto.type}/>
        </Label>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Sale Price More Than 100</Label>
            <Input on:input={updateItemData} bind:value={itemDto.salesPriceUp} type="text" id="salePriceMore" placeholder="1 - 1,000,000" required/>
        </div>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Sale Price Less Than 100</Label>
            <Input on:input={updateItemData} bind:value={itemDto.salesPriceDown} type="text" id="salePriceLess" placeholder="1 - 1,000,000" required/>
        </div>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Created Date</Label>
            <input bind:value={itemDto.itemCreatedDate} type="date" id="salePriceMore" placeholder="1-1-2000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div class="mb-6">
            <Label for="item_sale" class="mb-2">Item Expired Date</Label>
            <input bind:value={itemDto.itemExpiredDate} type="date" id="salePriceLess" placeholder="1-1-2023" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
            <Button on:click={addItem}>+ Add Item</Button>
    </div>
    <div style="height: calc(100vh - 72px);">
        <Sidebar class="sidebar h-full m-3">
          <SidebarWrapper class="h-full">
            <SidebarGroup class="h-full">
              <Search bind:value={query}></Search>
              {#each items as item}
                <div class="flex flex-row justify-between py-2 px-2 rounded-lg hover:bg-slate-200 transition-all">
                  <Avatar src={item.itemImage} rounded border /><a class="m-2 text-sm" href="/reports/items/{item.id}">{item.name}</a>
                  <button on:click={()=>deleteItem(item.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
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