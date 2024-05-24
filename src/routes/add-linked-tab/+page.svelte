<div class="m-6">
  <h1 class="text-2xl">Add New Linked Tab</h1>
  <div class="border-[1px] bg-gray-100 my-2"></div>

  <div class="my-4">
    <div class="flex flex-col gap-2">
      <span>Tab Name</span>
      <input bind:value={name} type="text" placeholder="Name" class="input input-bordered w-full max-w-xs">
    </div>

    <div class="flex flex-col my-4 gap-2">
      <span>Tab URL</span>
      <input bind:value={url} type="text" placeholder="URL" class="input input-bordered w-full max-w-xs">
    </div>

    <button on:click={handleSave} class="my-4 border bg-[#3C5B6F] text-white px-4 py-1.5 rounded-md flex items-center gap-1 w-fit">
      <img src="/images/plus.svg" alt="">
      <span>{loading ? 'Saving...' : 'Save'}</span>
    </button>
  </div>

  {#if successMessage}
    <p>{successMessage}</p>
  {/if}
  
  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

</div>

<script>
  import { addLinkedTab } from "$lib/firebase";

  let name = ''
  let url = ''

  let loading = false
  let successMessage = ''
  let errorMessage = ''

  const handleSave = async () => {
    loading = true
    const res = await addLinkedTab(name, url)
    
    if (res.success) successMessage = 'Tab added successfully!';
    else errorMessage = 'Failed to add tab'

    loading = false
    name = ''
    url = ''
  }

</script>