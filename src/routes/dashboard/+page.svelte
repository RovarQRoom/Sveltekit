<script lang="ts">
  import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button, P, Spinner } from "flowbite-svelte";
	import { companysHandlers, employeesHandlers, itemsHandlers, mostWantedItemHandlers, storesHandlers } from "../../store";

  async function getData(){
    const employeesCount = (await employeesHandlers.getAllEmployeesExist())?.employeesCount;
    const itemsCount = (await itemsHandlers.getAllItemsExist())?.itemsCount;
    const companysCount = (await companysHandlers.getAllCompanysExist())?.companysCount;
    const storesCount = (await storesHandlers.getAllStoresExist())?.storesCount;
    const { CheapestItem, MostExpensiveItem, MostSellingItem } = await mostWantedItemHandlers.getMostWantedItems() as any;    
    return {
      employeesCount,
      itemsCount,
      companysCount,
      storesCount,
      CheapestItem,
      MostExpensiveItem,
      MostSellingItem
    };
  }
  
</script>


{#await getData()}
<div class="flex justify-around center absolute left-1/2 top-1/2">
  <Spinner color="purple" size={'64'}/>
</div>
{:then {employeesCount, itemsCount, companysCount, storesCount, CheapestItem, MostExpensiveItem, MostSellingItem}}
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
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{employeesCount}</span>
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
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{itemsCount}</span>
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
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{companysCount}</span>
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
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{storesCount}</span>
        </div>
      </Card>
    </div>

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