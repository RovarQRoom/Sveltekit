
<script lang="ts">
	import { Alert, Button, Kbd, Span, Spinner } from "flowbite-svelte";
	import { cartsHandlers } from "../../../store";
	import type { CartItemModel } from "../../../components/Dtos";
    import { Trash } from 'svelte-heros-v2';

    let cartItems: CartItemModel[] = [];
    let total = 0;
    async function getData(){
         cartItems = await cartsHandlers.getCartItems() as CartItemModel[];
        console.log(cartItems);
        
        // Calculate total price
        total = cartItems.reduce((acc, item) => acc + item.total_price, 0);
    
        return {
            cartItems: cartItems,
            total: total
        };
    }

    function increaseQunatity(index: number) {
        cartItems[index].quantity++;
        cartItems[index].total_price = cartItems[index].quantity * cartItems[index].item_price;
        cartsHandlers.updateCartItem(cartItems[index], cartItems[index].id);
        window.location.reload();
    }

    function decreaseQunatity(index: number) {
        cartItems[index].quantity--;
        cartItems[index].total_price = cartItems[index].quantity * cartItems[index].item_price;
        cartsHandlers.updateCartItem(cartItems[index], cartItems[index].id);
        window.location.reload();
    }

    function deleteCartItem(index: number) {
        cartsHandlers.deleteCartItem(cartItems[index].id);
        window.location.reload();
    }
    
</script>
{#await getData()}
<div class="flex justify-around center absolute left-1/2 top-1/2">
    <Spinner color="purple" size={'64'}/>
  </div>
  {:then {cartItems}}
  <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-3">
      <div class="flex items-center justify-between mb-4">
          <div class="flex-shrink-0">
              <img class="w-8 h-8" src="https://cdn-icons-png.flaticon.com/512/4219/4219909.png" alt="Neil image">
            </div>
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Cart Items</h5>
            <a href="/home" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                View all
            </a>
        </div>
        
        <div class="flow-root">
            {#each cartItems as cartItem, index}
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={cartItem.item_image} alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {cartItem.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {cartItem.detail}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex justify-start">
                            <button on:click={()=>decreaseQunatity(index)}>
                                <svg fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                                  </svg>
                            </button>
                            {cartItem.quantity}
                            <button on:click={()=>increaseQunatity(index)}>
                                <svg fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                  </svg>
                            </button>
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {cartItem.item_price * cartItem.quantity} IQD
                        <Trash size="20" class="text-red-500 cursor-pointer hover:text-red-900 transition-all" on:click={()=>deleteCartItem(index)}/>
                    </div>
                </div>
            </li>
        </ul>
        {/each}
    <Span class='ml-3'>Order Total: {total} IQD</Span>
   </div>
   <div class="flex justify-center mt-3">
       <Button shadow="teal" gradient color="blue">Confirm Order</Button>
   </div>
</div>
{/await}
