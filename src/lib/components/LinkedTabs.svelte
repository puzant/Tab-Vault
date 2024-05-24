<div>
  <h1 class="text-xl">Linked Tabs</h1>

  {#if loading}
    <span class="loading loading-dots loading-lg"></span>


    {:else if linkedTabs.length > 0}
      <div class="my-2 grid grid-cols-3 gap-2">
        {#each linkedTabs as tab, index (tab.id)}
          <div
            role="button"
            tabindex="0"
            on:mouseenter={() => handleMouseEnter(index)}
            on:mouseleave={() => handleMouseLeave(index)}
            class="text-blue-500 flex gap-1 w-fit hover:transform hover:translate-x-2 transition-transform duration-300" 
            
          >
            <img src="/images/link.svg" alt="">
            <a href={tab.url} target="_blank">{tab.name}</a>
            
            <div class:visible={hoverStates[index]} class="tab-options">
              <img on:click={() => editTabDialog = true} class="inline cursor-pointer" src="/images/pencil.svg" alt="">
              <img on:click={() => confirmDeleteTab = true} class="inline cursor-pointer" src="/images/trash.svg" alt="">
            </div>
          </div>
        {/each}
      </div>
    
    {:else} <p>No tabs available.</p>
  {/if}

  
  {#if confirmDeleteTab}
    <div class="modal modal-open">
      <div class="modal-box">
        <h2 class="font-bold text-lg">Delete Linked Tab</h2>
        <p class="py-4">Are you sure you want to delete this Linked Tab?.</p>
        
        <div class="modal-action">
          <button class="btn btn-error" on:click={handleDeleteLinkedTab}><span class="text-white">Yes</span></button>
          <button class="btn" on:click={() => confirmDeleteTab = false}>Close</button>
        </div>
      </div>
    </div>
  {/if}

  {#if editTabDialog}
    <div class="modal modal-open">
      <div class="modal-box">
        <h2 class="font-bold text-lg">Edit Linked Tab</h2>
    
        <div class="flex flex-col gap-2 my-2">
          <span>Name</span>
          <input type="text" placeholder="Name" class="input input-bordered w-full">
        </div>

        <div class="flex flex-col gap-2">
          <span>URL</span>
          <input type="text" placeholder="Name" class="input input-bordered w-full">
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" on:click={handleEditLinkedTab}><span class="text-white">Save</span></button>
          <button class="btn" on:click={() => editTabDialog = false}>Close</button>
        </div>
      </div>
    </div>
  {/if}

</div>

<script>
  import { onMount } from 'svelte';
  import { getLinkedTabs, deleteLinkedTab, editLinkedTab } from "$lib/firebase";

  let linkedTabs = [];
  let hoverStates = []
  let loading = true;
  let error = null;
  let confirmDeleteTab = false
  let editTabDialog = false

  onMount(async () => {
    try {
      linkedTabs = await getLinkedTabs();
      hoverStates = linkedTabs.map(() => false);
    } catch (err) {
      error = 'Failed to fetch linked tabs';
      console.error(err);
    } finally {
      loading = false;
    }
  });

  const handleDeleteLinkedTab = async (tabId) => {
    const res = await deleteLinkedTab(tabId)
  }

  const handleEditLinkedTab = async (id, payload) => {
    const res = await editLinkedTab(id, payload)
  }

  const handleMouseEnter = (index) => {
    hoverStates = hoverStates.map((state, i) => i === index ? true : state);
  }

  const handleMouseLeave = (index) => {
    hoverStates = hoverStates.map((state, i) => i === index ? false : state);
  }
</script>

<style>
  .tab-options {
    opacity: 0;
     transition: opacity ease 0.3s;
  }

  .tab-options.visible {
    opacity: 1;
  }
</style>