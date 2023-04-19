<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { storesHandlers } from '../../../store';
  
    let stores: any[] = [];
      onMount(async () => {
        stores = await storesHandlers.getAllStores();
      });
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
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>