<div class="modal modal-open">
  <div class="modal-box">
    <h2 class="font-bold text-lg">Edit Linked Tab</h2>

    <form on:submit={handleEditLinkedTab}>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <span>Name</span>
          <input bind:value={name} type="text" placeholder="Name" class="input input-bordered">
          {#if tabNameError}<span class="text-red-500 font-semibold">{tabNameError}</span>{/if}
        </div>
  
        <div class="flex flex-col gap-2">
          <span>URL</span>
          <input bind:value={url} type="text" placeholder="Name" class="input input-bordered">
          {#if tabURLError}<span class="text-red-500 font-semibold">{tabURLError}</span>{/if}
        </div>
  
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Composer:</span>
          <input bind:value={composer} type="text" placeholder="Composer" class="input input-bordered ">
        </div>
  
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Difficulty:</span>
  
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn m-1 w-full">{difficulty || "Choose a difficulty"}</div>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
              {#each difficultiesList as d}
              <li on:click={() => difficulty = d}><a href="">{d}</a></li>
              {/each}
            </ul>
          </div>
        </div>
  
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Priority:</span>
  
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn m-1 w-full">{priority || "Choose a priority"}</div>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
              {#each prioritiesList as p}
                <li on:click={() => priority = p}><a href="">{p}</a></li>
              {/each}
            </ul>
          </div>
        </div>
  
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Style:</span>
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn m-1 w-full">{style || "Choose a style"}</div>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                {#each stylesList as s}
                <li on:click={() => style = s}><a href="">{s}</a></li>
                {/each}
              </ul>
            </div>
        </div>
  
        <div class="flex items-center gap-2 my-4">
          <span>With Capo:</span>
          <input bind:checked={with_capo} type="checkbox" class="toggle toggle-info toggle-md" />
        </div>
  
      </div>
  
      <div class="modal-action">
        <button class="btn btn-primary"><span class="text-white">Save</span></button>
        <button class="btn" on:click={onClose}>Close</button>
      </div>
    </form>
  </div>
</div>

<script>
  import { createEventDispatcher } from "svelte";
  import { editLinkedTab } from "$lib/firebase";
  import { isValidUrl, prioritiesList, difficultiesList, stylesList } from "$lib"

  export let selectedTab
  export let onClose

  const dispatch = createEventDispatcher();

  let name = selectedTab.name
  let url = selectedTab.url
  let composer = selectedTab.composer
  let priority = selectedTab.priority
  let style = selectedTab.style
  let difficulty = selectedTab.difficulty
  let with_capo = selectedTab.with_capo

  let tabNameError = ""
  let tabURLError = ""

  const validateTabName = () => {
    tabNameError = !name.length ? "Tab name can't be empty" : ""
  }

  const validateTabUrl = () => {
    if (!url.length) {
      tabURLError = "Tab URL can't be empty";
    } else if (!isValidUrl(url)) {
      tabURLError = "Please enter a valid URL";
    } else {
      tabURLError = '';
    }
  };

  const handleEditLinkedTab = async (e) => {
    e.preventDefault()
    validateTabName()
    validateTabUrl()

    if (!tabNameError && !tabURLError) {
      let payload = {
      name: name,
      url: url,
      id: selectedTab.id,
      composer: composer,
      priority: priority,
      style: style,
      difficulty: difficulty,
      with_capo: with_capo
    }

    const res = await editLinkedTab(payload)
    if (res.success) {
      dispatch('editEvent', { message: 'Linked Tab Edited successfully' });
    }
    }  
  }
</script>