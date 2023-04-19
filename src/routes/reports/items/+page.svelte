<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar, Search, Button, P} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { itemsHandlers } from '../../../store';
  
    let items: any[] = [];
    let date1: Date, date2: Date;
      onMount(async () => {
        items = await itemsHandlers.getAllItems();
        console.log(items[0].createdAt.toDate().toLocaleDateString());
        
      });

      async function filterByDate(){
        if(date1 && date2){
          console.log(date1, date2);
          
          items = await itemsHandlers.getAllItemsByDate(date1, date2);
        };
      }
  
    </script>


<form class="flex flex-row justify-center gap-2 m-2">
  <div class="flex flex-row justify-around w-1/3">
    <P size="lg" weight="semibold" style="width: inherit;">From Date: </P>
      <input type="date" bind:value={date1} class="bg-gray-50 border mx-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
  </div>
  <div class="flex flex-row justify-around w-1/3">
    <P size="lg" weight="semibold" style="width: inherit;">To Date: </P>
      <input type="date" bind:value={date2} class="bg-gray-50 border mx-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
  </div>
  <div class="">
    <Button color="alternative" pill={true} on:click={filterByDate} class="">Submit</Button>
  </div>
</form>
<Table class="flex flex-nowrap">
  <div class="divide-y" id="table-width">
    <TableHead class="contents">
      <TableHeadCell class="!p-4">
            </TableHeadCell>
            <TableHeadCell>Item Image</TableHeadCell>
            <TableHeadCell>Item Name</TableHeadCell>
            <TableHeadCell>Item Details</TableHeadCell>
            <TableHeadCell>Item Type</TableHeadCell>
            <TableHeadCell>Item Quantity</TableHeadCell>
            <TableHeadCell>Item Price</TableHeadCell>
            <TableHeadCell>Item Sales Price More Than 100</TableHeadCell>
            <TableHeadCell>Item Sales Price Less Than 100</TableHeadCell>
            <TableHeadCell>Item Created Date</TableHeadCell>
            <TableHeadCell>Item Expired Date</TableHeadCell>
            <TableHeadCell>Item Created At</TableHeadCell>
            <TableHeadCell>Item Updated At</TableHeadCell>
            <TableHeadCell>Item Deleted At</TableHeadCell>
          </TableHead>
          {#each items as item}
          <TableBody >
            <TableBodyRow>
              <TableBodyCell class="!p-4">
              </TableBodyCell>
              <TableBodyCell><Avatar src={item.itemImage} alt="Item Image" rounded/></TableBodyCell>
              <TableBodyCell>{item.name}</TableBodyCell>
              <TableBodyCell>{item.detail}</TableBodyCell>
              <TableBodyCell>{item.type}</TableBodyCell>
              <TableBodyCell>{item.quantity}</TableBodyCell>
              <TableBodyCell>{item.buy_price}</TableBodyCell>
              <TableBodyCell>{item.sale_price_more}</TableBodyCell>
              <TableBodyCell>{item.sale_price_less}</TableBodyCell>
              <TableBodyCell>{item.item_created_date}</TableBodyCell>
              <TableBodyCell>{item.item_expired_date}</TableBodyCell>
              <TableBodyCell>{item.createdAt.toDate().toLocaleDateString()}</TableBodyCell>
              {#if item.updatedAt}
              <TableBodyCell>{item.updatedAt.toDate().toLocaleDateString()}</TableBodyCell>
              {/if}
              {#if item.deletedAt}
              <TableBodyCell>{item.deletedAt.toDate().toLocaleDateString()}</TableBodyCell>
              {/if}
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>