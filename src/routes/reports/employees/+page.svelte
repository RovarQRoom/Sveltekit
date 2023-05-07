<script lang="ts">
	import { employeesWritable } from './../../../store';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { employeesHandlers } from '../../../store';
	import type { EmployeeModal } from '../../../components/Dtos';

  let employees: EmployeeModal[] = [];
      onMount(async () => {
        await getData();
      });

      $: {
        if ($employeesWritable) {
          employees = $employeesWritable;
        }
      }

      async function getData(){
        await employeesHandlers.getAllEmployees();
        return {
          employees:employees
        }
      }
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
            {#if employee.employeeImage}
            <TableBodyCell><Avatar src={employee.employeeImage} alt="Employee Image" rounded/></TableBodyCell>
            {/if}
            <TableBodyCell>{employee.name}</TableBodyCell>
            <TableBodyCell>{employee.address}</TableBodyCell>
            <TableBodyCell>{employee.dob}</TableBodyCell>
            <TableBodyCell>{employee.email}</TableBodyCell>
            <TableBodyCell>{employee.gender}</TableBodyCell>
            <TableBodyCell>{employee.phone}</TableBodyCell>
            <TableBodyCell>{employee.createdAt.toDate().toLocaleDateString()}</TableBodyCell>
            {#if employee.updatedAt != null}
            <TableBodyCell>{employee.updatedAt.toDate().toLocaleDateString()}</TableBodyCell>
            {/if}
            {#if employee.deletedAt != null}
            <TableBodyCell>{employee.deletedAt.toDate().toLocaleDateString()}</TableBodyCell>
            {/if}
        </TableBodyRow>
      </TableBody>
        {/each}
      </div>
</Table>