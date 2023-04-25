
<script lang="ts">
	import { onMount } from "svelte";
	import { cartsHandlers, ordersHandlers, recieptHandlers} from "../../../../store";
	import { page } from "$app/stores";
	import { Button, Span } from "flowbite-svelte";
	import { OrderDTO, RecieptDTO } from "../../../../components/Dtos";
	import { auth } from "../../../../components/lib/firebase/firebase";
	import { goto } from "$app/navigation";

    let cart: any | undefined;
    let quantity = 0;

 onMount(async () => {
        const cartId = $page.params.cartId;
        cart = await cartsHandlers.getCart(cartId);
        
        console.log("OnMount Cart: ", cart); 
    });

    async function incrementQunatity(id: string, index: number) {
        await cartsHandlers.incrementQunatity(id, index);
        window.location.reload();
    }

    async function decrementQunatity(id: string, index: number) {
        console.log(id);
        
        await cartsHandlers.decrementQunatity(id, index);
        window.location.reload();
    }

    async function confirmOrder(){
        const orderDto: OrderDTO = new OrderDTO(
        auth.currentUser?.uid || "",
        cart,
        cart.price,
        "Pending",
        new Date(),
        );

        cartsHandlers.deleteCartAfterOrder($page.params.cartId);
        console.log("Cart Deleted Successfully");

        await ordersHandlers.addOrder(orderDto);

        const recieptDto: RecieptDTO = new RecieptDTO(
        auth.currentUser?.uid || "",
        cart,
        cart.item,
        orderDto,
        new Date()
        )

        recieptHandlers.addReciept(recieptDto);

        goto("/home");
    }

</script>
<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-3">
    <div class="flex items-center justify-between mb-4">
        <div class="flex-shrink-0">
            <img class="w-8 h-8" src="https://cdn-icons-png.flaticon.com/512/4219/4219909.png" alt="Neil image">
        </div>
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Orders</h5>
        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
   </div>

   <div class="flow-root">
    {#if cart}
        {#each cart.item as item, index}
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={item.itemImage} alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.detail}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex justify-start">
                            <button on:click={()=>decrementQunatity($page.params.cartId,index)}>
                                <svg fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                                  </svg>
                            </button>
                            {item.quantity}
                            <button on:click={()=>incrementQunatity($page.params.cartId,index)}>
                                <svg fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                  </svg>
                            </button>
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {parseInt(item.buy_price) * item.quantity} IQD
                    </div>
                </div>
            </li>
        </ul>
        {/each}
    {/if}
    <Span class='ml-3'>Order Total: {cart?.price} IQD</Span>
   </div>
   <div class="flex justify-center mt-3">
       <Button on:click={confirmOrder} shadow="teal" gradient color="blue">Confirm Order</Button>
   </div>
</div>
