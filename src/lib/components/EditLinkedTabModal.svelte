<div class="modal modal-open">
  <div class="modal-box">
    <h2 class="font-bold text-lg">Edit Linked Tab</h2>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <span>Name</span>
        <input bind:value={name} type="text" placeholder="Name" class="input input-bordered">
      </div>

      <div class="flex flex-col gap-2">
        <span>URL</span>
        <input bind:value={url} type="text" placeholder="Name" class="input input-bordered">
      </div>

      <div class="flex flex-col gap-2">
        <span class="font-semibold">Composer:</span>
        <input type="text" placeholder="Composer" class="input input-bordered ">
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

      <div class="flex items-center gap-2 my-4">
        <span>With Capo:</span>
        <input type="checkbox" class="toggle toggle-info toggle-md" checked />
      </div>

    </div>

    <div class="modal-action">
      <button class="btn btn-primary" on:click={handleEditLinkedTab}><span class="text-white">Save</span></button>
      <button class="btn" on:click={onClose}>Close</button>
    </div>
  </div>
</div>

<script>
  import { createEventDispatcher } from "svelte";
  import { editLinkedTab } from "$lib/firebase";

  export let selectedTab
  export let onClose

  const dispatch = createEventDispatcher();

  let name = selectedTab.name
  let url = selectedTab.url

  const handleEditLinkedTab = async () => {
    let payload = {
      name: name,
      url: url,
      id: selectedTab.id
    }
    const res = await editLinkedTab(payload)
    if (res.success) {
      dispatch('editEvent', { message: 'Linked Tab Edited successfully' });
    }
  }
</script>