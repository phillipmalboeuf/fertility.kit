<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte';

  let { item, full }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    full?: boolean
  } = $props()
</script>

<section id={item.fields.id} class:boxed={item.fields.boxed}>
  {#if item.fields.media?.length}
  {#each item.fields.media as media, i}
  <figure>
    <Media {media} mobileMedia={item.fields.mobileMedia?.length >= i - 1 ? item.fields.mobileMedia[i] : undefined} />
  </figure>
  {/each}
  {/if}

  {#if item.fields.subtitle}
  <h6>{item.fields.subtitle}</h6>
  <hr>
  {/if}

  {#if item.fields.title}<h2>{item.fields.title}</h2>{/if}
  {#if item.fields.body}
  <main class:full>
    <Rich body={item.fields.body} />
  </main>
  {/if}

  {#snippet icon()}
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.66365 5.35547L10.7447 8.43649L7.66365 11.5175L7.24401 11.1015L9.61459 8.73097H4.65625V8.142H9.61459L7.24401 5.77142L7.66365 5.35547Z" fill="currentColor"/>
  <circle cx="7.65015" cy="8.34985" r="7.36754" transform="rotate(-90 7.65015 8.34985)" stroke="currentColor" stroke-width="0.565217"/>
  </svg>
  {/snippet}

  <!-- {#if item.fields.links?.length}
  <nav class="flex flex--thick_gapped">
    {#each item.fields.links as link}
    <Link {link} more={icon} />
    {/each}
  </nav>
  {/if} -->

  {#if item.fields.navigation}
  <nav class="flex flex--thick_gapped">
    {#if item.fields.navigation.fields.title}
    <h6 class="col col--5of12 col--mobile--12of12">{item.fields.navigation.fields.title}</h6>
    {/if}

    {#each item.fields.navigation.fields.links as link}
    <Link {link} more={icon} />
    {/each}
  </nav>
  {/if}
</section>

<style lang="scss">
  section {

    h2,
    figure {
      margin-bottom: $s1;
    }

    main {

      &:not(.full) {
        column-count: 2;
        column-gap: $s3;
      }

      :global(p) {
        margin: $s1 0;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    nav {
      align-items: flex-end;

      :global(a) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: calc($s7 * 3);
        gap: $s1;
        border-bottom: 1px solid;
        padding: $s-3 0;

        font-family: $heading_font;
        line-height: 1;
      }
    }
  }
</style>