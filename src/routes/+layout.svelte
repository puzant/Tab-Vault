<div>
	<nav class="bg-[#153448] text-white p-4 flex justify-between items-center">
		<h1 class="text-2xl">Tab Vault</h1>

		<div class="flex gap-8">
			<a href="/">Home</a>
			<a href="/">Chords</a>
			<a href="/">Tuteriols</a>
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
		
	<div class={containerWidth}>
		{#if isAuthenticated}
			<Sidebar />
		{/if}
	
		<div class={slotWidth}>
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

	$: containerWidth = clsx('grid grid-cols-12 mx-auto gap-4', {
		'w-full': !isAuthenticated,
		'w-[80%]': isAuthenticated
	})

	$: slotWidth = clsx('', {
		'col-span-12': !isAuthenticated,
		'col-span-10': isAuthenticated
	})
</script>