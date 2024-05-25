<div class="m-6">
  <h1 class="text-2xl">Add New Linked Tab</h1>
  <div class="border-[1px] bg-gray-100 my-2"></div>

  {#if successMessage}
    <div role="alert" class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{successMessage}</span>
    </div>
  {/if}
  
  {#if errorMessage}
    <div role="alert" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{errorMessage}</span>
    </div>
  {/if}

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

</div>

<script>
  import { isValidURL } from '$lib'
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