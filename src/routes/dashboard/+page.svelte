<script lang="ts">
	import { employeesWritable, itemsWritable, companiesWritable, storesWritable } from './../../store';
	import type { CompanyModal, EmployeeModal, ItemModal, StoreModal } from './../../components/Dtos';
  import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button, P, Spinner } from "flowbite-svelte";
	import { companysHandlers, employeesHandlers, itemsHandlers, mostWantedItemHandlers, storesHandlers } from "../../store";
	import { onMount } from 'svelte';


  let employees: EmployeeModal[] = [];
  let items: ItemModal[] = [];
  let companys: CompanyModal[] = [];
  let stores: StoreModal[] = [];

  onMount(async () => {
    await getData();
  });

  $:{
    if($employeesWritable){
      employees = $employeesWritable;
    }
    if($itemsWritable){
      items = $itemsWritable;
    }
    if($companiesWritable){
      companys = $companiesWritable;
    }
    if($storesWritable){
      stores = $storesWritable;
    }
  }

  async function getData(){
    await employeesHandlers.getAllEmployeesExist();
    await itemsHandlers.getAllItemsExist();
    await companysHandlers.getAllCompanysExist();
    await storesHandlers.getAllStoresExist();
    const { CheapestItem, MostExpensiveItem, MostSellingItem } = await mostWantedItemHandlers.getMostWantedItems() as any;    
    return {
      employees,
      items,
      companys,
      stores,
      CheapestItem,
      MostExpensiveItem,
      MostSellingItem
    };
  }
  
</script>


{#if $employeesWritable && $itemsWritable && $companiesWritable && $storesWritable}
<div class="flex flex-row flex-wrap justify-around m-5">

    <Card padding='sm' class="w-full my-2">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem href="/reports/employees">Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn.iconscout.com/icon/free/png-512/office-staff-9-1184344.png?f=avif&w=256" class="w-24 h-24" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white"><a href="/add-employee">Employees</a></h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{employees.length}</span>
        </div>
      </Card>
      <Card padding='sm' class="w-full my-2">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem href="/reports/items">Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn-icons-png.flaticon.com/512/859/859270.png" class="w-24 h-24" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white"><a href="/add-item">Items</a></h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{items.length}</span>
        </div>
      </Card>
      <Card padding='sm' class="w-full my-2">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem href="/reports/companies">Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn-icons-png.flaticon.com/512/993/993854.png" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white"><a href="/add-company">Company</a></h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{companys.length}</span>
        </div>
      </Card>
      <Card padding='sm' class="w-full my-2">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem href="/reports/stores">Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn-icons-png.flaticon.com/512/869/869636.png" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white"><a href="/add-store">Store</a></h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{stores.length}</span>
        </div>
      </Card>
    </div>

    {#await getData()}
    <div class="flex justify-around center absolute left-1/2 top-1/2">
      <Spinner color="purple" size={'64'}/>
    </div>
    {:then {MostSellingItem, MostExpensiveItem, CheapestItem}}
    <div class="flex flex-row flex-wrap justify-evenly m-5">
        <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-64">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              {#each MostSellingItem as item}
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Most Selling Items</h5>
              <Avatar size="xl" src="{item.itemImage}" rounded/>
              <div class="m-6">
                <span class=" dark:text-gray-700 text-lg font-bold">{item.itemName}</span>
              </div>
                <span class="text-gray-800 dark:text-gray-800 text-lg font-bold">Top Selling: {item.itemQuantity}</span>
                  {/each}
            </div>
          </Card>
          <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-64">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              {#each CheapestItem as item}
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Cheapist Item</h5>
              <Avatar size="xl" src="{item.itemImage}" rounded/>
              <div class="m-6">
                <span class=" dark:text-gray-700 text-lg font-bold">{item.itemName}</span>
              </div>
                <span class="text-gray-800 dark:text-gray-800 text-lg font-bold">Item Price: {item.itemPrice}</span>
                  {/each}
            </div>
          </Card>
          <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-64">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              {#each MostExpensiveItem as item}
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Expensive Item</h5>
              <Avatar size="xl" src="{item.itemImage}" rounded/>
              <div class="m-6">
                <span class=" dark:text-gray-700 text-lg font-bold">{item.itemName}</span>
              </div>
                <span class="text-gray-800 dark:text-gray-800 text-lg font-bold">Item Price: {item.itemPrice}</span>
                  {/each}
            </div>
          </Card>
          <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
    </div>
    {/await}
    {:else}
    <div class="flex justify-around center absolute left-1/2 top-1/2">
      <Spinner color="purple" size={'64'}/>
    </div>
    {/if}