<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { itemsHandlers } from '../../../store';
  
    let items: any[] = [];
      onMount(async () => {
        items = await itemsHandlers.getAllItems();
      });
  
    </script>
    
    <Table class="flex flex-nowrap">
      <div class="divide-y" id="table-width">
          <TableHead class="contents">
            <TableHeadCell class="!p-4">
              <Checkbox />
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
                <Checkbox />
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
              <TableBodyCell>{item.createdAt}</TableBodyCell>
              <TableBodyCell>{item.updatedAt}</TableBodyCell>
              <TableBodyCell>{item.deletedAt}</TableBodyCell>
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>