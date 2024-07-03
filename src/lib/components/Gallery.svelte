<script lang="ts">
  import { isTypePlaylist, isTypeText, type TypeGallerySkeleton, type TypePlaylistSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  import type { MouseEventHandler } from 'svelte/elements'

  import { page } from '$app/stores'
  
  import Rich from './Rich.svelte'
  import Text from './Text.svelte'
  import Media from './Media.svelte'
  
  import { openDialog } from '$lib/helpers'
  import Playlist from './Playlist.svelte'
  import Slider from './Slider.svelte'

  let { item, preview, currentTag, format }: {
    item: Entry<TypeGallerySkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
    currentTag?: string,
    format?: string,
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

  let dialog = $derived($page.state.href?.includes('/explore'))

  const dialogClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (dialog) {
      openDialog(e)
    }
  }
</script>

<section id={item.fields.id} class:slider={preview} class:dialog>
  <!-- <h2>{item.fields.title}</h2> -->

  <!-- {#if item.fields.body}
  <main class="flex flex--gapped flex--column">
    <Rich body={item.fields.body} />
  </main>
  {/if} -->

  {#if !preview}
  <details>
    <summary>
      Explore

      <aside class="buttons flex flex--middle">
        <a href="?format=feed{currentTag ? `&tag=${currentTag}` : ''}" class:active={format === 'feed'} class="button button--none" onclick={dialogClick}>
          <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>
          <small class="strong">Feed</small>
        </a>
        
        <a href="?format=thumbnails{currentTag ? `&tag=${currentTag}` : ''}" class:active={!format || format === 'thumbnails'} class="button button--none" onclick={dialogClick}>
          <svg width="6" height="6" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>
          <small class="strong">Thumbnails</small>
        </a>
      </aside>
    </summary>
    <nav class="flex flex--tight_gapped flex--column">
      <h6>Filter by Category</h6>
      <a href="?{format ? `format=${format}` : ''}" onclick={dialogClick}>All</a>
      {#each Object.values($page.data.tags) as tag}
      <a href="?tag={tag.sys.id}{format ? `&format=${format}` : ''}" class:active={$page.url.search === `?tag=${tag.sys.id}` || currentTag === tag.sys.id} onclick={dialogClick}>{tag.name}</a>
      {/each}
    </nav>
  </details>
  {/if}

  <Slider disabled={!preview} slidesPerView={2.25}>
    <ol class="list--nostyle {preview ? 'slider__container' : 'flex flex--column'}{format === 'feed' ? ' flex--gapped' : ''}">
      <!-- {#each item.fields.content.filter(i => !$page.url.searchParams.get('tag') || i.metadata.tags.find(t => t.sys.id === $page.url.searchParams.get('tag'))) as i} -->
      {#each item.fields.content as i}
      <li class="slide">
        {#if preview || format !== 'feed'}
        <a href="/explore/{i.fields.id}" class="padded" onclick={dialogClick}>
          <div class="flex flex--gapped flex--spaced">
            <h6 class="col col--6of12">{i.metadata.tags.length ? i.metadata.tags.map(t => $page.data.tags[t.sys.id].name).join(', ') : 'Tag'}</h6>
            <u>Show More</u>
            {#if isTypeText(i) && i.fields.media?.length}
            <figure class="col col--3of12">
              <Media media={i.fields.media[0]} width={200} ar={1} />
            </figure>
            {/if}
            <h5 class="col col--9of12"><strong>{i.fields.title}</strong></h5>
          </div>
        </a>
        {:else}
        <div class="padded">
          <h6>{i.metadata.tags.length ? i.metadata.tags.map(t => $page.data.tags[t.sys.id].name).join(', ') : 'Tag'}</h6>

          {#if isTypeText(i)}
          <Text item={i} small full />
          {:else if isTypePlaylist(i)}
          <Playlist item={i} />
          {/if}
        </div>
        {/if}
        <!-- {#if preview}
        
        {:else}
        <details class="padded" open={format === 'feed'}>
          {@render summary(i)}
          
          {#if isTypeText(i)}
          <Text item={i} />
          {:else if isTypePlaylist(i)}
          <Playlist item={i} />
          {/if}
        </details>
        {/if} -->
      </li>
      {/each}
    </ol>
  </Slider>
</section>

<style lang="scss">

  section {
    position: relative;

    &.dialog {
      margin: calc($s7 * -1) calc($s5 * -1);
    }

    &:not(.dialog):not(.slider) {
      border: 1px solid $grey;
      border-radius: $s0;

      details {
        border-top-left-radius: $s0;
        border-top-right-radius: $s0;
      }
    }

    details {
      position: sticky;
      top: 0;
      z-index: 2;
      padding: $s1;
      background-color: $light;
      border-bottom: 1px solid;

      summary {
        font-family: $heading_font;
        cursor: pointer;
      }
      
      &[open] {
        summary {
          margin-bottom: $s1;
        }
      }
    }

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

    .buttons {
      position: absolute;
      top: 6px;
      right: 0;
      width: auto;

      .button {
        color: $grey;
        padding: $s1 $s0;

        &:hover,
        &:focus,
        &.active {
          color: currentColor;
        }

        // @media (min-width: $mobile) {
        //   small {
        //     font-size: 0;
        //   }
        // }
      }
    }

    ol {
      li {
        width: 100%;
        border-bottom: 1px solid $grey;

        &:last-child {
          border-bottom: none;
        }

        a {
          display: block;
          font-family: $heading_font;

          u,
          h6 {
            font-weight: normal;
            font-size: $s-1;
          }

          h5 {
            font-size: $s0;
          }
        }
      }

      &.flex--gapped {
        padding: $s1;

        li {
          border: 1px solid $grey;
          border-radius: $s0;

          h6 {
            font-size: $s-1;
            margin-bottom: $s0;
          }
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
          border: 1px solid $grey;
          border-radius: $s0;
        }
      }
    }
  }
</style>