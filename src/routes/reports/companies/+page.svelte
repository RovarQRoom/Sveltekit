<script lang="ts">
	import { companiesWritable } from './../../../store';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Avatar, Spinner} from 'flowbite-svelte';
      import { onMount } from 'svelte';
      import { companysHandlers } from '../../../store';
	import type { CompanyModal } from '../../../components/Dtos';
  
    let companies: CompanyModal[] = [];
      onMount(async () => {
        await getData();
      });

      $: {
        if ($companiesWritable) {
          companies = $companiesWritable;
        }
      }

      async function getData(){
        await companysHandlers.getAllCompanys();
        return {
          companies:companies
        }
      }
    </script>
    
    {#if companies.length >= 0}
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
              {#if company.companyImage}
              <TableBodyCell><Avatar src={company.companyImage} alt="Company Image" rounded/></TableBodyCell>
              {:else}
              <TableBodyCell><Avatar src="https://via.placeholder.com/150" alt="Company Image" rounded/></TableBodyCell>
              {/if}
              <TableBodyCell>{company.name}</TableBodyCell>
              <TableBodyCell>{company.address}</TableBodyCell>
              <TableBodyCell>{company.email}</TableBodyCell>
              <TableBodyCell>{company.phone}</TableBodyCell>
              <TableBodyCell>{company.detail}</TableBodyCell>
              <TableBodyCell>{company.createdAt.toDate().toLocaleDateString()}</TableBodyCell>
              {#if company.updatedAt}
              <TableBodyCell>{company.updatedAt.toDate().toLocaleDateString()}</TableBodyCell>
              {/if}
              {#if company.deletedAt}
              <TableBodyCell>{company.deletedAt.toDate().toLocaleDateString()}</TableBodyCell>
              {/if}
          </TableBodyRow>
        </TableBody>
          {/each}
        </div>
  </Table>
  {:else}
  <div class="flex justify-around center absolute left-1/2 top-1/2">
    <Spinner color="purple" size={'64'}/>
  </div>
  {/if}