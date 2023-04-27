<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { auth, database, functions } from '../components/lib/firebase/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { authHandlers, authStore } from '../store/store';
	import { Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import '../app.css';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';


	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	const nonAuthRoutes = ['/login'];
	const clientRoutes = ['/home', '/profile', '/cart/{cartId}'];

	onMount(async () => {
		const currentPath = window.location.pathname;
		const unSubscribe = auth.onAuthStateChanged(async (user:any) => {
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				goto(`/login`);
			}

			if (user && nonAuthRoutes.includes(currentPath)) {
				goto('/dashboard');
				return;
			}

			let dataToSetStore = {};

			const docRef = user ? doc(database, 'users', user.uid) : null;
			if (!docRef) return;
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				dataToSetStore = {
					phoneNumber: user?.phoneNumber,
					roles:[
						'client'
					]
				};

				const userRef = user ? doc(database, 'users', user.uid) : null;
				if (!userRef) return;

				await setDoc(userRef, dataToSetStore, { merge: true });
			} else {
				const userData = docSnap.data();
				dataToSetStore = userData;
			}
			authStore.update((current) => {
				return {
					...current,
					user: user,
					data: dataToSetStore,
					loading: false
				};
			});
		});
	});
</script>

{#if !$authStore.loading}
{#if $page.url.pathname !== '/login'}
	<nav
		class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		<div class="max-w-screen-xl flex flex-wrap justify-center items-center mx-auto p-4">
			{#if auth.currentUser?.photoURL}
			<Avatar
				id="user-drop"
				src={auth.currentUser?.photoURL}
				dot={{ color: 'green' }}/>
			{:else}
			<Avatar id="user-drop" src="https://cdnen.samurai-gamers.com/wp-content/uploads/2023/03/20145403/sg-re4-remake-ashley-graham-character-icon.jpg" />
			{/if}
			<Dropdown triggeredBy="#user-drop">
				<DropdownHeader>
					{#if auth.currentUser?.displayName}
					<span class="block text-sm"> {auth.currentUser?.displayName} </span>
					{:else}
					<span class="block text-sm"> Ashley Gramham </span>
					{/if}
					{#if auth.currentUser?.email}
					<span class="block truncate text-sm font-medium"> Your Email </span>
					{:else}
					<span class="block truncate text-sm font-medium">{auth.currentUser?.email}</span>
					{/if}
				</DropdownHeader>
				<DropdownItem href="/dashboard">Dashboard</DropdownItem>
				<DropdownItem href="/profile/settings">Settings</DropdownItem>
				<DropdownDivider />
				<DropdownItem on:click={authHandlers.logout}>Sign out</DropdownItem>
			</Dropdown>
		</div>
	</nav>
{/if}
<div class="h-full flex " style="height: calc(100vh - 72px);">
	{#if $page.url.pathname !== '/login'}
		<div>
			<Sidebar class="h-full">
				<SidebarWrapper class="h-full">
					<SidebarGroup class="space-y-8">
						<!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -->
					{#if $authStore.data.roles.includes('admin') || $authStore.data.roles.includes('store') || $authStore.data.roles.includes('company')}
						<SidebarItem label="Dashboard" class="hover:bg-slate-400 transition-all" href="/dashboard">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
									/><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Add Employees" {spanClass} class="hover:bg-slate-400 transition-all" href="/add-employee">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
									/></svg
								>
							</svelte:fragment>
							<svelte:fragment slot="subtext">
								<span
									class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
									>Pro</span
								>
							</svelte:fragment>
						</SidebarItem>
						{#if $authStore.data.roles.includes('admin') || $authStore.data.roles.includes('store')}
						<SidebarItem label="Add Item" class="flex-1 whitespace-nowrap hover:bg-slate-400 transition-all" href="/add-item">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						{/if}
						{#if $authStore.data.roles.includes('admin')}
						<SidebarItem
							label="Add Company"
							href="/add-company"
							class="flex-1 whitespace-nowrap hover:bg-slate-400 transition-all"
						>
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						{/if}
						{#if $authStore.data.roles.includes('admin') || $authStore.data.roles.includes('company')}
						<SidebarItem 
						label="Add Store" 
						href="/add-store"
						class="flex-1 whitespace-nowrap hover:bg-slate-400 transition-all">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						{/if}
						<SidebarItem label="Reports" href="/reports" class="flex-1 whitespace-nowrap hover:bg-slate-400 transition-all">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -->
						{:else if $authStore.data.roles.includes('client')}
						<SidebarItem 
						label="Home" 
						href="/home"
						class="flex-1 whitespace-nowrap hover:bg-slate-400 transition-all">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Carts" href="/cart/" class="flex-1 whitespace-nowrap hover:bg-slate-400 transition-all">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -->
						{/if}
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</div>
		{/if}
		<div class="w-full">
			<slot />
		</div>
	</div>
	{/if}
	
<style>
	.h-screen{
		height: 100vh ;
	}
</style>