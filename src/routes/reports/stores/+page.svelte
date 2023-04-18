<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { storesHandlers } from '../../../store';
  
    let stores: any[] = [];
      onMount(async () => {
        stores = await storesHandlers.getAllStores();
      });
  
      const deleteEmployee = (id: string) => async () => {
        await storesHandlers.deleteStore(id);
      };
  
    </script>
    
    <Table class="flex flex-nowrap">
      <div class="divide-y w-full" id="table-width">
          <TableHead class="contents">
            <TableHeadCell class="!p-4">
              <Checkbox />
            </TableHeadCell>
            <TableHeadCell>Store Image</TableHeadCell>
            <TableHeadCell>Store Name</TableHeadCell>
            <TableHeadCell>Store Address</TableHeadCell>
            <TableHeadCell>Store Email</TableHeadCell>
            <TableHeadCell>Store Phone</TableHeadCell>
            <TableHeadCell>Store Details</TableHeadCell>
            <TableHeadCell>Store Created At</TableHeadCell>
            <TableHeadCell>Store Updated At</TableHeadCell>
            <TableHeadCell>Store Deleted At</TableHeadCell>
          </TableHead>
          {#each stores as store}
          <TableBody >
            <TableBodyRow>
              <TableBodyCell class="!p-4">
                <Checkbox />
              </TableBodyCell>
              <TableBodyCell><Avatar src={store.storeImage} alt="Store Image" rounded/></TableBodyCell>
              <TableBodyCell>{store.name}</TableBodyCell>
              <TableBodyCell>{store.address}</TableBodyCell>
              <TableBodyCell>{store.email}</TableBodyCell>
              <TableBodyCell>{store.phone}</TableBodyCell>
              <TableBodyCell>{store.detail}</TableBodyCell>
              <TableBodyCell>{store.createdAt}</TableBodyCell>
              <TableBodyCell>{store.updatedAt}</TableBodyCell>
              <TableBodyCell>{store.deletedAt}</TableBodyCell>
              {#if !store.deletedAt}
              <TableBodyCell>
                <a href="/reports/stores/{store.id}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
                <button on:click={deleteEmployee(store.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
                  Remove
                </button></TableBodyCell>
            {/if}
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>