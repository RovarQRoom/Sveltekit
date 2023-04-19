<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { companysHandlers } from '../../../store';
  
    let companies: any[] = [];
      onMount(async () => {
        companies = await companysHandlers.getAllCompanys();
      });
    </script>
    
    <Table class="flex flex-nowrap">
      <div class="divide-y" id="table-width">
          <TableHead class="contents">
            <TableHeadCell class="!p-4">
              <Checkbox />
            </TableHeadCell>
            <TableHeadCell>Company Image</TableHeadCell>
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
              <TableBodyCell><Avatar src={company.companyImage} alt="Company Image" rounded/></TableBodyCell>
              <TableBodyCell>{company.name}</TableBodyCell>
              <TableBodyCell>{company.address}</TableBodyCell>
              <TableBodyCell>{company.email}</TableBodyCell>
              <TableBodyCell>{company.phone}</TableBodyCell>
              <TableBodyCell>{company.detail}</TableBodyCell>
              <TableBodyCell>{company.createdAt}</TableBodyCell>
              <TableBodyCell>{company.updatedAt}</TableBodyCell>
              <TableBodyCell>{company.deletedAt}</TableBodyCell>
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>