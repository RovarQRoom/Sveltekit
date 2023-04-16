<script lang="ts">
	import { authStore } from "../../store/store";
  import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { companysHandlers, employeesHandlers, itemsHandlers, storesHandlers } from "../../store";


  let employees = [];
  let employeesCount = 0;

  let items = [];
  let itemsCount = 0;

  let companys = [];
  let companysCount = 0;

  let stores = [];
  let storesCount = 0;

  onMount(async () => {
      const { employees:emp, employeesCount:empCount } = await employeesHandlers.getAllEmployeesExist();
      employees = emp;
      employeesCount = empCount;

      const { items:it, itemsCount:itCount } = await itemsHandlers.getAllItemsExist();
      items = it;
      itemsCount = itCount;

      const { companys:comp, companysCount:compCount } = await companysHandlers.getAllCompanysExist();
      companys = comp;
      companysCount = compCount;

      const { stores:st, storesCount:stCount } = await storesHandlers.getAllStores();
      stores = st;
      storesCount = stCount;
  });
  
</script>
{#if !$authStore.loading}
<div class="flex flex-wrap gap-12 m-5">
    <Card padding='sm' class="w-96">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn.iconscout.com/icon/free/png-512/office-staff-9-1184344.png?f=avif&w=256" class="w-24 h-24" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white">Employees</h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{employeesCount}</span>
        </div>
      </Card>
      <Card padding='sm' class="w-96">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn-icons-png.flaticon.com/512/859/859270.png" class="w-24 h-24" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white">Items</h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{itemsCount}</span>
        </div>
      </Card>
      <Card padding='sm' class="w-96">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn-icons-png.flaticon.com/512/993/993854.png" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white">Company</h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{companysCount}</span>
        </div>
      </Card>
      <Card padding='sm' class="w-96">
        <div class="flex">
          <MenuButton />
          <Dropdown class="w-36">
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Export data</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4 h-full">
          <Avatar size="lg" src="https://cdn-icons-png.flaticon.com/512/869/869636.png" rounded/>
            <h5 class="m-5 text-xl font-medium text-gray-900 dark:text-white">Store</h5>
            <span class=" text-gray-800 dark:text-gray-800 text-lg font-bold">{storesCount}</span>
        </div>
      </Card>
</div>

    <div class="grid grid-cols-3 gap-6 m-5">
        <Card padding='sm'>
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="/images/profile-picture-3.webp" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm'>
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="/images/profile-picture-3.webp" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm'>
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="/images/profile-picture-3.webp" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm'>
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="/images/profile-picture-3.webp" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm'>
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="/images/profile-picture-3.webp" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
          <Card padding='sm'>
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-36">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              <Avatar size="lg" src="/images/profile-picture-3.webp" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                  <Button>Add friend</Button>
                  <Button color="light" class="dark:text-white">Message</Button>
                </div>
            </div>
          </Card>
    </div>
{/if}
