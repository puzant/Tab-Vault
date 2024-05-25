<div class="modal modal-open">
  <div class="modal-box">
    <h2 class="font-bold text-lg">Delete Linked Tab</h2>
    <p class="py-4">Are you sure you want to delete this Linked Tab?.</p>
    
    <div class="modal-action">
      <button class="btn btn-error" on:click={handleDeleteLinkedTab}><span class="text-white">Yes</span></button>
      <button class="btn" on:click={onClose}>Close</button>
    </div>
  </div>
</div>

<script>
  import { createEventDispatcher } from "svelte";
  import { deleteLinkedTab } from "$lib/firebase";
  
  export let selectedTab
  export let onClose
  const dispatch = createEventDispatcher();


  const handleDeleteLinkedTab = async () => {
    const res = await deleteLinkedTab(selectedTab)
    if (res.success) {
      dispatch('deleteEvent', { message: 'Linked Tab deleted successfully' });
    }
  }
</script>

