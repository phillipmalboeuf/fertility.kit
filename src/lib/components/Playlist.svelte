<script lang="ts">
  import type { TypePlaylistSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Audio from './Audio.svelte'

  let { item }: {
    item: Entry<TypePlaylistSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section id={item.fields.id} class:boxed={item.fields.boxed}>
  <ol class="list--nostyle">
    {#each item.fields.audioFiles as media}
    <li>
      <Audio {media} />
    </li>
    {/each}
  </ol>
</section>

<style lang="scss">
  ol {
    li {
      :global(button) {
        padding: $s-1 0;
        border-bottom: 1px solid;
      }
    }
  }
</style>