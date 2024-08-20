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
  {#if item.fields.media?.length}
  {#each item.fields.media as media, i}
  <figure>
    <Media {media} />
  </figure>
  {/each}
  {/if}
  
  <ol class="list--nostyle">
    {#each item.fields.audioFiles as media}
    <li>
      <Audio {media} />
    </li>
    {/each}
  </ol>

  {#if item.fields.link}
  <nav>
    <a href={item.fields.link} rel="external" target="_blank">{item.fields.linkLabel || item.fields.link}</a>
  </nav>
  {/if}
</section>

<style lang="scss">
  figure {
    margin-bottom: $s3;
  }

  nav {
    margin-top: $s3;
    font-family: $heading_font;
    font-weight: bold;

    @media (min-width: $mobile) {
      font-size: $s-1;
    }

    a {
      padding: 0.2em 0;
      border-bottom: 1.5px solid;
      transition: opacity 333ms;

      &:hover,
      &:focus {
        opacity: 0.5;
      }
    }
  }
  
  ol {
    li {
      :global(button) {
        padding: $s-1 0;
        border-bottom: 1px solid;
      }
    }
  }
</style>