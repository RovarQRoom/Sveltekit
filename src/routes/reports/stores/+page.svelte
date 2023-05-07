<script lang="ts">
	import { storesWritable } from './../../../store';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { storesHandlers } from '../../../store';
	import type { StoreModal } from '../../../components/Dtos';
  
      let stores: StoreModal[] = [];
      onMount(async () => {
        await getData();
      });

      $: {
        if ($storesWritable) {
          stores = $storesWritable;
        }
      }

      async function getData(){
        await storesHandlers.getAllStores();
        return {
          stores:stores
        }
      }
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
              {#if store.storeImage}
              <TableBodyCell><Avatar src={store.storeImage} alt="Store Image" rounded/></TableBodyCell>
              {/if}
              <TableBodyCell>{store.name}</TableBodyCell>
              <TableBodyCell>{store.address}</TableBodyCell>
              <TableBodyCell>{store.email}</TableBodyCell>
              <TableBodyCell>{store.phone}</TableBodyCell>
              <TableBodyCell>{store.detail}</TableBodyCell>
              <TableBodyCell>{store.createdAt}</TableBodyCell>
              {#if store.updatedAt}
              <TableBodyCell>{store.updatedAt}</TableBodyCell>
              {/if}
              {#if store.deletedAt}
              <TableBodyCell>{store.deletedAt}</TableBodyCell>
              {/if}
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>