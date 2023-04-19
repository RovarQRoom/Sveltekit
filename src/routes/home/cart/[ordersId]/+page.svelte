
<script lang="ts">
	import { onMount } from "svelte";
	import { ordersHandlers } from "../../../../store";
	import { page } from "$app/stores";
	import type { OrderDTO } from "../../../../components/Dtos";
	import { P, Span } from "flowbite-svelte";

    let order: OrderDTO | undefined;
    let price = 0;

 onMount(async () => {
        const orderId = $page.params.ordersId;
        order = await ordersHandlers.getOrders(orderId);

        if(!order || !order.item) return;
        for (let index = 0; index < order?.item.length; index++) {
            price += parseInt(order?.item[index].buy_price);
        }
        console.log(order);
        
    });

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
    {#if order}
        {#each order.item as item}
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
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {item.buy_price} IQD
                    </div>
                </div>
            </li>
        </ul>
        {/each}
    {/if}
    <Span class='ml-3'>Order Total: {price} IQD</Span>
   </div>
</div>
