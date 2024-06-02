<nav class="bg-[#153448] text-white p-4 flex justify-between">
	<div class="flex gap-8">
		<a href="/">Home</a>
		<a href="/add-linked-tab">Add Linked Tabs</a>
	</div>
</nav>
	
<div class="flex w-[90%] border border-indigo-400 mx-auto">
	<div class="border p-2">
		<div class="flex flex-col gap-2">
			<div class="bg-[#3C5B6F] text-white px-4 py-1.5 rounded-md">SIGN UP</div>
			<div class="border border-[#3C5B6F] text-[#3C5B6F] px-4 py-1.5 rounded-md">LOG IN</div>
		</div>
	</div>

	<slot></slot>
</div>



<script>
  import "../app.css";
</script>