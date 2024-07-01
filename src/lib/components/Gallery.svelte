<script lang="ts">
  import { isTypePlaylist, isTypeText, type TypeGallerySkeleton, type TypePlaylistSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  import { page } from '$app/stores'
  
  import Rich from './Rich.svelte'
  import Text from './Text.svelte'
  import Media from './Media.svelte'
  
  import { openDialog } from '$lib/helpers'
  import Playlist from './Playlist.svelte'
  import Slider from './Slider.svelte'

  let { item, preview }: {
    item: Entry<TypeGallerySkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    preview?: boolean
  } = $props()

  // let tags = $derived(Object.entries(item.fields.content.reduce((tags, i) => {
  //   i.metadata.tags.forEach(t => {
  //     if (tags[t.sys.id]) {
  //       return tags[t.sys.id] += 1
  //     }

  //     return tags[t.sys.id] = 1
  //   })
  //   return tags
  // }, {} as {
  //   [key: string]: number
  // })).sort((a, b) => a[1] - b[1]))
</script>

<section id={item.fields.id} class:slider={preview}>
  <!-- <h2>{item.fields.title}</h2> -->

  <!-- {#if item.fields.body}
  <main class="flex flex--gapped flex--column">
    <Rich body={item.fields.body} />
  </main>
  {/if} -->

  {#if !preview}
  <details class="padded">
    <summary>Explore</summary>
    <nav class="flex flex--tight_gapped flex--column">
      <h6>Filter by Category</h6>
      <a href="?" onclick={(e) => {
        if ($page.state.href?.includes('/explore')) {
          openDialog(e)
        }
      }}>All</a>
      {#each Object.values($page.data.tags) as tag}
      <a href="?tag={tag.sys.id}" class:active={$page.url.search === `?tag=${tag.sys.id}` || $page.state.href.includes(`?tag=${tag.sys.id}`)} onclick={(e) => {
        if ($page.state.href?.includes('/explore')) {
          openDialog(e)
        }
      }}>{tag.name}</a>
      {/each}
    </nav>
  </details>
  {/if}

  {#snippet summary(i: Entry<TypePlaylistSkeleton | TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">)}
  <summary class="flex flex--gapped flex--spaced">
  <h6 class="col col--6of12">{i.metadata.tags.length ? i.metadata.tags.map(t => $page.data.tags[t.sys.id].name).join(', ') : 'Tag'}</h6>
  <u>Show</u>
  {#if isTypeText(i) && i.fields.media?.length}
  <figure class="col col--3of12">
    <Media media={i.fields.media[0]} width={200} ar={1} />
  </figure>
  {/if}
  <h5 class="col col--9of12"><strong>{i.fields.title}</strong></h5>
</summary>
  {/snippet}

  <Slider disabled={!preview} slidesPerView={2.25}>
    <ol class="list--nostyle {preview ? 'slider__container' : 'flex flex--gapped flex--column'}">
      <!-- {#each item.fields.content.filter(i => !$page.url.searchParams.get('tag') || i.metadata.tags.find(t => t.sys.id === $page.url.searchParams.get('tag'))) as i} -->
      {#each item.fields.content as i}
      <li class="slide">
        {#if preview}
        <a href="/explore/{i.fields.id}" class="padded">
          {@render summary(i)}
        </a>
        {:else}
        <details class="padded">
          {@render summary(i)}
          
          {#if isTypeText(i)}
          <Text item={i} />
          {:else if isTypePlaylist(i)}
          <Playlist item={i} />
          {/if}
        </details>
        {/if}
      </li>
      {/each}
    </ol>
  </Slider>
</section>

<style lang="scss">
  summary {
    font-family: $heading_font;
    cursor: pointer;

    u:after {
      content: " More";
    }

    u,
    h6 {
      font-weight: normal;
      font-size: $s-1;
    }

    h5 {
      font-size: $s0;
    }
  }

  section {

    nav {
      font-family: $heading_font;

      h6 {
        opacity: 0.4;
      }

      a {
        border-bottom: 1.5px solid transparent;

        &:hover,
        &:focus,
        &.active {
          border-color: currentColor;
        }
      }
    }
    
    details {
      &[open] {
        :global(summary) {
          margin-bottom: $s1;

          :global(u):after {
            content: " Less";
          }
        }
      }
    }

    ol {

      li {
        width: 100%;
        border: 1px solid;
        border-radius: $s0;

        a {
          display: block;
        }
      }
    }

    &.slider {
      margin-right: calc($s3 * -1);
      
      // :global(.slider) {
      //   overflow: visible !important;
      // }

      ol {
        li {
          margin-right: $s0;
        }
      }
    }
  }
</style>