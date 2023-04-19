
<script lang="ts">
    import { Card, Button, Rating, Badge } from "flowbite-svelte";
	import { authStore, itemsHandlers } from "../../store";
	import { onMount } from "svelte";
	import { OrderDTO } from "../../components/Dtos";
	import { auth } from "../../components/lib/firebase/firebase";
	import { ordersHandlers } from "../../store";

    let items: any[] = [];
    let newItem: any[] = [];

    onMount(async () => {
      const { items:it} = await itemsHandlers.getAllItemsExist();
      items = it;
    });

    async function addOrder(item:any){
      newItem.push(item);
      console.log(newItem);
    }

    async function confirmOrder(){
      const orderDTO: OrderDTO = new OrderDTO(
      auth.currentUser?.uid || "",
      newItem,
      "pending",
      new Date(),
      );
      await ordersHandlers.addOrder(orderDTO);
    }
</script>
<div class="flex flex-wrap justify-evenly">
  {#each items as item }
  <div class="m-2">
    <div class="m-2">
        <Card padding="none">
            <a href="/" class="flex justify-center">
                <img class="p-8 rounded-t h-36 w-64" src={item.itemImage} alt="product 1" />
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
              <Button class="m-2" on:click={() => addOrder(item)}>Add To Cart</Button>
            </div>
          </div>
        </Card>
    </div>
  </div>
  {/each}
</div>
<div class="flex justify-center">
  <Button class="w-1/2" on:click={confirmOrder}>
    <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg> Buy Now
  </Button>
</div>
 