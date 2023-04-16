<script lang="ts">
    import { addDoc, collection, doc } from "firebase/firestore";
    import { auth, database } from "../../components/lib/firebase/firebase";
	import { Avatar, Fileupload, Label, Input, Select, Button } from "flowbite-svelte";
	import ItemDto from "../../components/Dtos/Items.DTO";
	import { itemsHandlers } from "../../store/items.store";
	import { authStore } from "../../store/store";
  
    let itemDto = { userId:"", name: "", detail: "", type: "", quantity: 0, buyingPrice: "", salesPriceUp: "", salesPriceDown: "" };
  
    let types = [
    {value:"oil", name: "Oil"},
    {value:"water", name: "Water"},
    {value:"rice", name: "Rice"},
    {value:"jam", name: "Jam"},
    {value:"bean", name: "Bean"},
  ]
  
  async function addItem() {
    console.log(auth.currentUser?.uid);
    let myItemDto = new ItemDto(
        itemDto.userId = auth.currentUser?.uid || "",
        itemDto.name,
        itemDto.detail,
        itemDto.type,
        itemDto.quantity,
        itemDto.buyingPrice,
        itemDto.salesPriceUp,
        itemDto.salesPriceDown
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

  function pictureUpdate(event: any) {
      const img = document.querySelector('#image');
      const files = document.querySelector('#files') as HTMLInputElement;

      files.addEventListener('change', function() {
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
  <div class="item-form">
    <div class="item-data m-5">
        <div class="item-img my-3">
            <Label class="pb-2" for='small_size' >Item Image</Label>
            <div class="flex space-x-4 m-3">
                <Avatar src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" size="lg" id="image"/>
            </div>
            <Fileupload id="files" size='sm' on:click={pictureUpdate} />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <Label for="name" class="mb-2">Item Name</Label>
                <Input on:input={updateItemData} bind:value={itemDto.name} type="text" id="name" placeholder="Oreo"/>
              </div>
              <div>
                <Label for="address" class="mb-2">Item Detail</Label>
                <Input on:input={updateItemData} bind:value={itemDto.detail} type="text" id="detail" placeholder="Address"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Item Quantity</Label>
                <Input on:input={updateItemData} bind:value={itemDto.quantity} type="number" id="quantity" placeholder="0-100"/>
            </div>
            <div>
                <Label for="phone" class="mb-2">Item Buying Price</Label>
                <Input on:input={updateItemData} bind:value={itemDto.buyingPrice} type="text" id="buyingPrice" placeholder="1$ - 1000$"/>
            </div>
        </div>
        <Label>Select Item Type
            <Select on:input={updateItemData} class="mt-2 mb-2" items={types} bind:value={itemDto.type} />
        </Label>
        <div class="mb-6">
            <Label for="email" class="mb-2">Item Sale Price More Than 100</Label>
            <Input on:input={updateItemData} bind:value={itemDto.salesPriceUp} type="text" id="salePriceMore" placeholder="1 - 1,000,000"/>
        </div>
        <div class="mb-6">
            <Label for="email" class="mb-2">Item Sale Price Less Than 100</Label>
            <Input on:input={updateItemData} bind:value={itemDto.salesPriceDown} type="text" id="salePriceLess" placeholder="1 - 1,000,000"/>
        </div>
            <Button on:click={addItem}>+ Add Item</Button>
    </div>
</div> 
    {/if}