<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { companysHandlers } from '../../../store';
  
    let employees: any[] = [];
      onMount(async () => {
        employees = await companysHandlers.getAllEmployees();
      });
  
      const deleteEmployee = (id: string) => async () => {
        await companysHandlers.deleteEmployee(id);
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
          {#each employees as employee}
          <TableBody >
            <TableBodyRow>
              <TableBodyCell class="!p-4">
                <Checkbox />
              </TableBodyCell>
              <TableBodyCell>{employee.name}</TableBodyCell>
              <TableBodyCell>{employee.address}</TableBodyCell>
              <TableBodyCell>{employee.dob}</TableBodyCell>
              <TableBodyCell>{employee.email}</TableBodyCell>
              <TableBodyCell>{employee.gender}</TableBodyCell>
              <TableBodyCell>{employee.phone}</TableBodyCell>
              <TableBodyCell>{employee.createdAt}</TableBodyCell>
              <TableBodyCell>{employee.updatedAt}</TableBodyCell>
              <TableBodyCell>{employee.deletedAt}</TableBodyCell>
              {#if !employee.deletedAt}
              <TableBodyCell>
                <a href="/reports/employees/{employee.id}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
                <button on:click={deleteEmployee(employee.id)} class="font-medium text-red-600 hover:underline dark:text-red-500" >
                  Remove
                </button></TableBodyCell>
            {/if}
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>