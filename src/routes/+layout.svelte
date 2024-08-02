<div>
	<nav class="bg-primary text-white p-4 flex justify-between items-center">
		<h1 class="text-2xl">Tab Vault</h1>

		<div class="flex gap-8">
			<a href="/">Home</a>
			{#if isAuthenticated}
				<span on:click={logout}>Logout</span>
			{:else} 
				<a href="/login">Login</a>
			{/if}
			
			{#if isAuthenticated}
				<div class="avatar placeholder">
					<div class="bg-indigo-500 text-neutral-content rounded-full w-7">
						<span class="text-xl">P</span>
					</div>
				</div> 
			{/if}
		</div>
	</nav>
		
	<div class='grid grid-cols-12 mx-auto gap-4 w-full'>
		<Sidebar />
	
		<div class='col-span-10'>
			<slot></slot>
		</div>
	</div>
</div>

<script>
	import Sidebar from '$lib/components/Sidebar.svelte'
	import { logout } from '$lib/firebase'
	import { user } from '$lib/authStore'
	import clsx from 'clsx';
	import "../app.css";
	
  $: isAuthenticated = $user !== null;
</script>