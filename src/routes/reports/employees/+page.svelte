<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { employeesHandlers } from '../../../store';

  let employees: any[] = [];
    onMount(async () => {
      employees = await employeesHandlers.getAllEmployees();
      console.log(employees);
    });

    const deleteEmployee = (id: string) => async () => {
      await employeesHandlers.deleteEmployee(id);
    };

  </script>
  
  <Table class="flex flex-nowrap">
    <div class="divide-y" id="table-width">
        <TableHead class="contents">
          <TableHeadCell class="!p-4">
            <Checkbox />
          </TableHeadCell>
          <TableHeadCell>Employee Image</TableHeadCell>
          <TableHeadCell>Employee Name</TableHeadCell>
          <TableHeadCell>Employee Address</TableHeadCell>
          <TableHeadCell>Date of Birth</TableHeadCell>
          <TableHeadCell>Employee Email</TableHeadCell>
          <TableHeadCell>Employee Gender</TableHeadCell>
          <TableHeadCell>Employee Phone</TableHeadCell>
          <TableHeadCell>Employee Added At</TableHeadCell>
          <TableHeadCell>Employee Updated At</TableHeadCell>
          <TableHeadCell>Employee Deleted At</TableHeadCell>
        </TableHead>
        {#each employees as employee}
        <TableBody >
          <TableBodyRow>
            <TableBodyCell class="!p-4">
              <Checkbox />
            </TableBodyCell>
            <TableBodyCell><Avatar src={employee.employeeImage} alt="Employee Image" rounded/></TableBodyCell>
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