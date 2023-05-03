
<script lang="ts">
  import { Card, Button, Rating, Badge, Spinner } from "flowbite-svelte";
	import { cartsHandlers, itemsHandlers } from "../../store";
	import type { ItemModel } from "../../components/Dtos";

    let items: ItemModel[] = [];
    async function getData(){
    items = (await itemsHandlers.getAllItemsExistClientSide())?.items;
    return {
      items: items
    };
  }

  async function addToCart(index: number){
    let item = items[index];
    let cartItem = {
      id: item.id,
      userid: item.userid,
      name: item.name,
      detail: item.detail,
      item_image: item.itemImage,
      item_price: parseInt(item.buy_price),
      total_price: parseInt(item.buy_price),
      quantity: 1,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };
    cartsHandlers.addCart(cartItem );
  }
</script>
  
  {#await getData()}
  <div class="flex justify-around center absolute left-1/2 top-1/2">
    <Spinner color="purple" size={'64'}/>
  </div>
  
  {:then {items}}
  <div class="flex flex-wrap justify-evenly">
  {#each items as item , index }
  <div class="m-2">
    <div class="m-2">
        <Card padding="none">
            <a href="/" class="flex justify-center">
                <img class="p-3 rounded-t h-full w-64" src={item.itemImage} alt="product 1" />
            </a>
          <div class="px-5 pb-5">
            <a href="/">
              <h5 class='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                {item.name}
              </h5>
            </a>
            <Rating rating={Number("5")} size="18" class="mt-2.5 mb-5">
              <Badge slot="text" class="ml-3">5</Badge>
            </Rating>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">{item.buy_price} IQD</span>
              <Button class="m-2" on:click={() => addToCart(index)}>Add To Cart</Button>
            </div>
          </div>
        </Card>
    </div>
  </div>
  {/each}
</div>
{:catch error}
  <p>{error.message}</p>
{/await}
 