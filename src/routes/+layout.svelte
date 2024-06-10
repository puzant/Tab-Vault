<nav class="bg-[#153448] text-white p-4 flex justify-between items-center">
	<h1 class="text-2xl">Tab Vault</h1>
	<div class="flex gap-8">
		<a href="/">Home</a>
		<a href="/">Chords</a>
		<a href="/">Tuteriols</a>
		<a href="/">Login</a>
		<div class="avatar placeholder">
			<div class="bg-indigo-500 text-neutral-content rounded-full w-7">
				<span class="text-xl">P</span>
			</div>
		</div> 
	</div>
</nav>
	
<div class="grid grid-cols-12 w-[90%] mx-auto">
	<!-- <Sidebar /> -->

	<div class="col-span-10">
		<slot></slot>
	</div>
</div>

<script>
	// import Sidebar from '$lib/components/Sidebar.svelte'
</script>