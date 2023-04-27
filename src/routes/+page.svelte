<script lang="ts">
	import { onMount } from "svelte";
	import { authHandlers } from "../store";
	import { auth } from "../components/lib/firebase/firebase";
	import { goto } from "$app/navigation";



    onMount(async () => {
        if(!auth.currentUser) return;
        const user = await authHandlers.getUserById(auth.currentUser.uid);

        if(user){
            if(user.roles.includes('admin')){
                goto('/dashboard');
            }else{
                goto('/home');
            }
        }
        
        
    });
</script>
