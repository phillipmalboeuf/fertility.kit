<script lang="ts">
  import { page } from '$app/stores'
  import type { Entry } from 'contentful'
  import { isTypePlaylist, isTypeText, type TypePlaylistSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { MouseEventHandler } from 'svelte/elements'
  import { openDialog } from '$lib/helpers'

  import Playlist from '$lib/components/Playlist.svelte'
  import Text from '$lib/components/Text.svelte'
  import Media from '$lib/components/Media.svelte'
  
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let item: Entry<TypeTextSkeleton | TypePlaylistSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> = $derived(data.text || data.playlist)

  let dialog = $derived($page.state.href?.includes('/explore'))

  const dialogClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (dialog) {
      openDialog(e)
    }
  }
</script>

<section class:padded={dialog} class:dialog class:padded--thick={!dialog}>
  <nav class="flex">
    <a class="button button--none" href="/explore" onclick={dialogClick}><svg width="10" height="10" viewBox="0 0 10 10"><path d="M9.69141 4.53125V5.46875H1.79883L5.57227 9.24219L4.9043 9.9043L0 5L4.9043 0.0957031L5.57227 0.757812L1.79883 4.53125H9.69141Z"/></svg>
Back</a>
  </nav>
  <article class="padded">
    <h6>{item.metadata.tags.length ? item.metadata.tags.map(t => $page.data.tags[t.sys.id].name).join(', ') : 'Tag'}</h6>

    {#if isTypeText(item)}
    <Text {item} small full />
    {:else if isTypePlaylist(item)}
    <Playlist {item} />
    {/if}
  </article>
</section>

{#if !dialog && data.page.fields.background}
<figure class="background">
  <Media media={data.page.fields.background} eager />
</figure>
{/if}

<style lang="scss">
  section {
    &.dialog {
      margin: calc($s3 * -1);

      @media (max-width: $mobile) {
        margin: calc($s0 * -1);
      }
    }

    &:not(.dialog) {
      nav {
        border-top: 1px solid $grey;
        border-left: 1px solid $grey;
        border-right: 1px solid $grey;
        border-top-left-radius: $s0;
        border-top-right-radius: $s0;
      }

      article {
        border: 1px solid $grey;
        border-top: none;
        border-bottom-left-radius: $s0;
        border-bottom-right-radius: $s0;
      }
    }
  }
  
  nav {
    position: sticky;
    top: 0;
    z-index: 2;
    padding: $s1;
    background-color: $light;
    border-bottom: 1px solid;

    font-family: $heading_font;
    max-width: $max * 0.333;
    margin: 0 auto;
  }

  article {
    background-color: $light;
    max-width: $max * 0.333;
    margin: 0 auto;

    h6 {
      font-weight: normal;
      font-size: $s-1;
      margin-bottom: $s0;
    }

    :global(img),
    :global(video) {
      border-radius: $radius;
    }
  }
</style>