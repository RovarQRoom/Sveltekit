<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { companysHandlers } from '../../../store';
  
    let companies: any[] = [];
      onMount(async () => {
        companies = await companysHandlers.getAllCompanys();
      });
  
      const deleteEmployee = (id: string) => async () => {
        await companysHandlers.deleteCompany(id);
      };
  
    </script>
    
    <Table class="flex flex-nowrap">
      <div class="divide-y" id="table-width">
          <TableHead>
            <TableHeadCell class="!p-4">
              <Checkbox />
            </TableHeadCell>
            <TableHeadCell>Company Name</TableHeadCell>
            <TableHeadCell>Company Address</TableHeadCell>
            <TableHeadCell>Company Email</TableHeadCell>
            <TableHeadCell>Company Phone</TableHeadCell>
            <TableHeadCell>Company Details</TableHeadCell>
            <TableHeadCell>Company Created At</TableHeadCell>
            <TableHeadCell>Company Updated At</TableHeadCell>
            <TableHeadCell>Company Deleted At</TableHeadCell>
          </TableHead>
          {#each companies as company}
          <TableBody >
            <TableBodyRow>
              <TableBodyCell class="!p-4">
                <Checkbox />
              </TableBodyCell>
              <TableBodyCell>{company.name}</TableBodyCell>
              <TableBodyCell>{company.address}</TableBodyCell>
              <TableBodyCell>{company.email}</TableBodyCell>
              <TableBodyCell>{company.phone}</TableBodyCell>
              <TableBodyCell>{company.detail}</TableBodyCell>
              <TableBodyCell>{company.createdAt}</TableBodyCell>
              <TableBodyCell>{company.updatedAt}</TableBodyCell>
              <TableBodyCell>{company.deletedAt}</TableBodyCell>
              {#if !company.deletedAt}
              <TableBodyCell>
                <a href="/reports/companies/{company.id}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
                <button on:click={deleteEmployee(company.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
                  Remove
                </button></TableBodyCell>
            {/if}
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>