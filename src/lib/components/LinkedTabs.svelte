<div class="">
  <div class=" flex justify-between">
    <h1 class="text-xl">Linked Tabs ({linkedTabs.length})</h1>
    
    <div class="flex gap-2 items-center">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-sm m-1">
          <img class="w-6 cursor-pointer" src="/images/filter.svg" alt="">
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {#each filtersList as filter}
            <li on:click={() => addFilter(filter)}><a>{filter.name}</a></li>
          {/each}
        </ul>
      </div>
      
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-sm m-1">
          <img class="w-6 cursor-pointer" src="/images/sort.svg" alt="">
        </div>
        <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Name</a></li>
        </ul>
      </div>
    </div> 
  </div>

  <div class="flex gap-2">
    {#each $filters as filter}
      <div class="cursor-pointer badge badge-neutral badge-lg gap-2">
        <svg on:click={() => removeFilter(filter)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        {filter.name}
      </div>
    {/each}
  </div>

  <label class="input input-sm input-bordered flex items-center gap-2 my-3">
    <input bind:value={searchValue} type="text" class="grow" placeholder="Search Tabs" />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
  </label>
  
  {#if loading}
    <span class="loading loading-dots loading-lg"></span>

    {:else if linkedTabs.length > 0}
      <div class="my-2 grid grid-cols-1 md:grid-cols-3 gap-2">
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
              <img on:click={() => toggleEditTabModal(tab)} class="inline cursor-pointer" src="/images/pencil.svg" alt="">
              <img on:click={() => toggleDeleteTabModal(tab.id)} class="inline cursor-pointer" src="/images/trash.svg" alt="">
            </div>
          </div>
        {/each}
      </div>
    
    {:else} <p>No tabs available.</p>
  {/if}

  
  {#if confirmDeleteTab}
   <DeleteLinkTabModal 
      onClose={toggleDeleteTabModal} 
      selectedTab={selectedTab} 
      on:deleteEvent={toggleDeleteTabModal} 
    />
  {/if}

  {#if editTabDialog}
    <EditLinkedTabModal 
      onClose={toggleEditTabModal}
      selectedTab={selectedTab} 
      on:editEvent={toggleEditTabModal}
    />
  {/if}

</div>

<script lang="ts">
  import { filtersList } from '$lib';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store'
  import { onSnapshot, collection, query, where } from 'firebase/firestore';
  import { getLinkedTabs, db } from "$lib/firebase";
  import DeleteLinkTabModal from './DeleteLinkedTabModal.svelte'
  import EditLinkedTabModal from './EditLinkedTabModal.svelte'

  let selectedTab = null
  let linkedTabs: any = [];
  let hoverStates: boolean[] = []
  const filters = writable([])
  
  let loading = true;
  let error = null;
  let confirmDeleteTab = false
  let editTabDialog = false
  let searchValue = ''

  onMount(async () => {
    try {
      linkedTabs = await getLinkedTabs();
      hoverStates = linkedTabs.map(() => false);
      const colRef = collection(db, 'linked-tabs');

      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        linkedTabs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        hoverStates = linkedTabs.map(() => false);
      });
      
      return () => unsubscribe();
    } catch (err) {
      error = 'Failed to fetch linked tabs';
    } finally {
      loading = false;
    }
  });

  const addFilter = (filter) => {
    filters.update(currentFilters => {
      if (!currentFilters.includes(filter)) {
        return [...currentFilters, filter]
      }
      return currentFilters
    })
  }

  const removeFilter = (filterToRemove) => {
    filters.update(currentFilters => {
      return currentFilters.filter(filter => filter !== filterToRemove)
    })
  }

  const toggleDeleteTabModal = (tabId: string) => {
    selectedTab = tabId
    confirmDeleteTab = !confirmDeleteTab
  }

  const toggleEditTabModal = (tab) => {
    selectedTab = tab
    editTabDialog = !editTabDialog
  }

  const handleMouseEnter = (index: any) => {
    hoverStates = hoverStates.map((state, i) => i === index ? true : state);
  }

  const handleMouseLeave = (index: any) => {
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