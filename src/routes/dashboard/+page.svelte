<script lang="ts">
	import { authStore } from "../../store/store";
  import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { companysHandlers, employeesHandlers, itemsHandlers, mostWantedItemHandlers, storesHandlers } from "../../store";
	import { auth, functions } from "../../components/lib/firebase/firebase";
	import { httpsCallable } from "firebase/functions";

  let phoneNumber = ""; 

  let employees = [];
  let employeesCount = 0;

  let items = [];
  let itemsCount = 0;

  let companys = [];
  let companysCount = 0;

  let stores = [];
  let storesCount = 0;

  let cheapestItem: any[] = [];
  let mostExpensiveItem: any[] = [];
  let mostSellingItem: any[] = [];

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

      const { stores:st, storesCount:stCount } = await storesHandlers.getAllStoresExist();
      stores = st;
      storesCount = stCount;

      const { CheapestItem:cheap, MostExpensiveItem:expensive, MostSellingItem:selling } = await mostWantedItemHandlers.getMostWantedItems() as any;
          cheapestItem = cheap;
          mostExpensiveItem = expensive;
          mostSellingItem = selling;

          auth.onAuthStateChanged((user) => {
            user?.getIdTokenResult().then((idTokenResult:any) => {
				        // user.admin = idTokenResult.claims.admin;
                if (idTokenResult.claims.admin) {
                  console.log('Admin', idTokenResult.claims);
                } else {
                  console.log('Not Admin', idTokenResult.claims);
                }
              });
          });
  });

  function makeMeAdmin() {
		const addAdminRole = httpsCallable(functions, 'addAdminRole');
		addAdminRole({ phoneNumber: phoneNumber })
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	}
  
</script>

<div class="admin flex flex-col m-3 justify-center w-1/2">
  <input type="text" bind:value={phoneNumber}>
    <button on:click={makeMeAdmin} class="bg-slate-600 h-8 rounded-xl m-2 text-white">Make Me An Admin</button>
  </div>

<div class="flex flex-row flex-wrap justify-between m-5">
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

    <div class="flex flex-wrap justify-between m-5">
        <Card padding='sm' class="w-full my-2">
            <div class="flex">
              <MenuButton />
              <Dropdown class="w-64">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Export data</DropdownItem>
              </Dropdown>
            </div>
            <div class="flex flex-col items-center pb-4">
              {#each mostSellingItem as item}
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Most Selling Items</h5>
              <Avatar size="lg" src="{item.itemImage}" rounded/>
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
