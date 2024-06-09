<div>
  <h1 class="text-xl">Linked Tabs ({linkedTabs.length})</h1>

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
  import { onMount } from 'svelte';
  import { get } from 'svelte/store'
  import { filtersStore } from '$lib/filtersStore'
  import { onSnapshot } from 'firebase/firestore';
  import { queryBuilder, getLinkedTabs } from "$lib/firebase";
  import DeleteLinkTabModal from './DeleteLinkedTabModal.svelte'
  import EditLinkedTabModal from './EditLinkedTabModal.svelte'


  let selectedTab = null
  let linkedTabs: any = [];
  let hoverStates: boolean[] = []
  
  let loading = true;
  let error = null;
  let confirmDeleteTab = false  
  let editTabDialog = false
  let searchValue = ''

  const loadTabs = async () => {
    try {
      linkedTabs = await getLinkedTabs();
      hoverStates = linkedTabs.map(() => false);      
    } catch(err) {
      error = 'Failed to fetch linked tabs';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadTabs();

    const unsubscribe = onSnapshot(queryBuilder(), (snapshot) => {
      linkedTabs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      hoverStates = linkedTabs.map(() => false);
    });

    return () => unsubscribe();
  });

  $: {
    if ($filtersStore) loadTabs();
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