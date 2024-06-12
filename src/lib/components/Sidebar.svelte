<div class="col-span-2 border p-3">
  <div>
    <h1 class="text-xl">Difficulty</h1>

    <div class="form-control flex-flex-col gap-2 my-2">
      {#each difficultiesList as difficulty}
        <label class="flex gap-2 items-center cursor-pointer">
          <input 
            type="checkbox" 
            on:change={() => updateDifficultyFilter(difficulty)}
            checked={$filtersStore.difficulty == difficulty}
            class="checkbox checkbox-sm" 
          />
          <span class="label-text">{difficulty}</span>
        </label>
      {/each}
    </div>
  </div>

  <div class="divider"></div>

  <div class="flex items-center gap-3">
    <span>With Capo:</span>
    <input 
      type="checkbox" 
      on:change={updateWithCapoFilter}
      checked={$filtersStore.withCapo} 
      class="toggle toggle-info toggle-sm" 
    />
  </div>

  <div class="divider"></div>

  <div>
    <h1 class="text-xl">Styles</h1>

    <div class="my-2 flex gap-2 flex-wrap">
      {#each stylesList as style}
        <span 
          on:click={() => updateStylesFilter(style)} 
          class={clsx("badge badge-primary badge-sm badge-outline cursor-pointer p-3", {
            'selected': $filtersStore.styles === style
          })}
          >
          {style}
        </span>
      {/each}
    </div>
  </div>
</div>

<script>
	import { difficultiesList, stylesList } from '$lib'
	import { filtersStore } from '$lib/filtersStore';
	import clsx from 'clsx'

	const updateDifficultyFilter = (difficulty) => {
    filtersStore.update(filters => ({
      ...filters,
      difficulty: filters.difficulty === difficulty ? null : difficulty
    }));
  }

	const updateWithCapoFilter = () => {
		filtersStore.update(filters => ({
      ...filters,
      withCapo: !filters.withCapo
    }));
	}

	const updateStylesFilter = (style) => {
		filtersStore.update(filters => {
    filters.styles = filters.styles === style ? null : style;
    return filters;
  });
	}

</script>

<style>
	.selected {
		background-color: rgb(84, 81, 132);
		border: 1px solid #fff;
		color: #fff;
	}
</style>