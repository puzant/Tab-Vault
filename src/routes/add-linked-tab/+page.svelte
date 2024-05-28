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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:w-[70%]">
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Tab Name:</span>
        <input bind:value={name} type="text" placeholder="Name" class="input input-bordered">
      </div>
  
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Composer:</span>
        <input type="text" placeholder="Composer" class="input input-bordered ">
      </div>

      <div class="flex flex-col gap-2">
        <span class="font-semibold">Style:</span>
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn m-1 w-full">Style</div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
  
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Tab URL:</span>
        <input bind:value={url} type="text" placeholder="URL" class="input input-bordered">
      </div>
  
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Difficulty:</span>

        <div class="dropdown">
          <div tabindex="0" role="button" class="btn m-1 w-full">Difficulty</div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span class="font-bold">Priority:</span>

        <div class="dropdown">
          <div tabindex="0" role="button" class="btn m-1 w-full">Priority</div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 my-4">
      <span>With Capo:</span>
      <input type="checkbox" class="toggle toggle-info toggle-md" checked />
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

  //  tab data
  let name = ''
  let url = ''
  let composer = ''
  let style = ''
  let difficulty = ''
  let priority = ''
  let with_capo = false

  let loading = false
  let successMessage = ''
  let errorMessage = ''

  const handleSave = async () => {
    loading = true
    const payload = {
      name: name,
      url: url,
      composer: composer,
      style: style,
      difficulty: difficulty,
      priority: priority,
      with_capo: with_capo
    }

    const res = await addLinkedTab(payload)
    
    if (res.success) successMessage = 'Tab added successfully!';
    else errorMessage = 'Failed to add tab'

    loading = false
    name = ''
    url = ''
  }

</script>