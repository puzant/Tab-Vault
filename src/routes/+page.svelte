<div class="p-3">
  <h1 class="text-2xl">Your Library</h1>
  <div class="border-[1px] bg-gray-100 my-2"></div>

  <div class="flex flex-col md:flex-row gap-2 my-4">
    <a href="/add-linked-tab" class="border bg-secondary text-white px-4 py-1.5 rounded-md flex items-center gap-1 w-fit">
      <img src="/images/plus.svg" alt="">
      <span>Link New Tab</span>
    </a>
  
    <button class="border bg-secondary text-white px-4 py-1.5 rounded-md flex items-center gap-1 w-fit">
      <img src="/images/plus.svg" alt="">
      <span>Upload PDF Tab</span>
    </button>
  
    <button class="border bg-secondary text-white px-4 py-1.5 rounded-md flex items-center gap-1 w-fit">
      <img src="/images/plus.svg" alt="">
      <span>Upload Image Tab</span>
    </button>
  </div>

  <LinkedTabs />
</div>

<script>
  import LinkedTabs from "$lib/components/LinkedTabs.svelte";
  import PDFTabs from "$lib/components/PDFTabs.svelte"

</script>