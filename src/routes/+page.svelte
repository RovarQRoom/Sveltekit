<!-- <script lang="ts">
    import { Card } from "flowbite-svelte";
import type { PageData } from "./$types";

    // Simple API Post Call
    // async function subscribe(event: Event) {
    //     const form = event.target as HTMLFormElement;
    //     const data = new FormData(form);
    //     console.log(data);

    //     await fetch("/api/users", {
    //         method: "POST",
    //         body: data,
    //     });
    // }
    export let data: PageData;

    $:({ employees } = data);
</script>

<h1>{employees.length}</h1>
{#each employees as employee}
<Card>
    <h1>Employees</h1>
    <ul>
        <li>
            <a href="/reports/employees/{employee.id}">
                {employee.name}
            </a>
        </li>
    </ul>
</Card>
{/each}

<!-- <h1>Newsletter</h1>
<form on:submit|preventDefault={subscribe}>
    <input type="email" name="email" >
<button>Subscribe</button>
</form> --> -->