<script lang="ts">
	import { authStore } from "../../store";
    import { Card, Button, Indicator } from "flowbite-svelte";
  </script>

  <div class="cards flex flex-wrap justify-center">
    {#if $authStore.data.type.includes('admin') || $authStore.data.type.includes('company') || $authStore.data.type.includes('store')}
    {#if $authStore.data.type.includes('admin') || $authStore.data.type.includes('company')}
    <div class="m-5 w-1/4">
        <Card class="">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">Companies</h5>
            <p class="m-3 pr-2 font-normal text-gray-700 dark:text-gray-400 leading-tight flex justify-items-end text-lg">
              <Indicator color="green" class="m-3"/>No New Notifications
            </p>
            <Button class="w-full" href="/reports/companies">
              Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Button>
          </Card>
        </div>
        {/if}
    
        <div class="m-5 w-1/4">
          <Card>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Stores</h5>
            <p class="m-3 pr-2 font-normal text-gray-700 dark:text-gray-400 leading-tight flex justify-items-end text-lg">
              <Indicator color="green" class="m-3"/>No New Notifications
            </p>
            <Button class="w-full" href="/reports/stores">
              Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Button>
          </Card>
        </div>

          <div class="m-5 w-1/4">
          <Card>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sales</h5>
            <p class="m-3 pr-2 font-normal text-gray-700 dark:text-gray-400 leading-tight flex justify-items-end text-lg">
              <Indicator color="green" class="m-3"/>No New Notifications
            </p>
            <Button class="w-full" href="/reports/sales">
              Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Button>
          </Card>
        </div>

        {#if $authStore.data.type.includes('admin') || $authStore.data.type.includes('store')}
        <div class="m-5 w-1/4">
            <Card>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Expire</h5>
              <p class="m-3 pr-2 font-normal text-gray-700 dark:text-gray-400 leading-tight flex justify-items-end text-lg">
                <Indicator color="green" class="m-3"/>No New Notifications
              </p>
              <Button class="w-full" href="/reports/expire">
                Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Button>
            </Card>
          </div>
          {/if}

          {#if $authStore.data.type.includes('admin') || $authStore.data.type.includes('store')}
          <div class="m-5 w-1/4">
            <Card>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Items</h5>
              <p class="m-3 pr-2 font-normal text-gray-700 dark:text-gray-400 leading-tight flex justify-items-end text-lg">
                <Indicator color="green" class="m-3"/>No New Notifications
              </p>
              <Button class="w-full" href="/reports/items">
                Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Button>
            </Card>
          </div>
          {/if}

          <div class="m-5 w-1/4">
            <Card>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Employees</h5>
              <p class="m-3 pr-2 font-normal text-gray-700 dark:text-gray-400 leading-tight flex justify-items-end text-lg">
                <Indicator color="green" class="m-3"/>No New Notifications
              </p>
              <Button class="w-full" href="/reports/employees">
                Read more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Button>
            </Card>
          </div>
          {/if}
  </div>