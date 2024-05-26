<div class="">
  <div class=" flex justify-between">
    <h1 class="text-xl">Linked Tabs ({linkedTabs.length})</h1>
    
    <div class="flex gap-2 items-center">
      <img class="w-6 cursor-pointer" src="/images/filter.svg" alt="">
      <img class="w-6 cursor-pointer" src="/images/sort.svg" alt="">
    </div> 
  </div>

  
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

<script>
  import { onMount } from 'svelte';
  import { onSnapshot, collection } from 'firebase/firestore';
  import DeleteLinkTabModal from './DeleteLinkedTabModal.svelte'
  import EditLinkedTabModal from './EditLinkedTabModal.svelte'
  import { getLinkedTabs, db } from "$lib/firebase";

  let selectedTab = null
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

  const toggleDeleteTabModal = (tabId) => {
    selectedTab = tabId
    confirmDeleteTab = !confirmDeleteTab
  }

  const toggleEditTabModal = (tab) => {
    selectedTab = tab
    editTabDialog = !editTabDialog
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