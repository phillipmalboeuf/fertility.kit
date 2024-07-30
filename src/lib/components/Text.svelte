<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Star from './Star.svelte'

  let { item, full, small }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    full?: boolean
    small?: boolean
  } = $props()
</script>

<section id={item.fields.id} class:boxed={item.fields.boxed} >
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

  {#if item.fields.title}
  {#if item.fields.title.includes(' * ')}
  {@const split = item.fields.title.split(' * ')}
  <h6 class="split">{split[0]} <Star /> <br>{split.length > 1 && split[1]}</h6>
  {:else}
  {#if small}
  <h5>{item.fields.title}</h5>
  {:else}
  <h2>{item.fields.title}</h2>
  {/if}
  {/if}
  {/if}
  {#if item.fields.body}
  <main class:full class:mid={item.fields.bigger} class="columns-{item.fields.columns || 2}">
    <Rich body={item.fields.body} />
  </main>
  {/if}

  {#snippet icon()}
  <svg width="16" height="16" viewBox="0 0 16 16">
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
    <div class="col col--1of12"></div>
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
    h5,
    h6:not(:has(+ hr)),
    figure,
    hr {
      margin-bottom: $s5;

      @media (max-width: $mobile) {
        margin-bottom: $s3;
      }
    }

    hr {
      margin-top: $s0;
    }

    h2 {
      @media (min-width: $mobile) {
        padding-right: $s7;
      }
    }

    h6.split {
      :global(svg) {
        margin: 0 $s-3;
      }

      @media (min-width: $mobile) {
        br {
          display: none;
        }
      }
    }

    &.boxed {
      h6.split {
        margin: calc($s7 * -1) calc($s5 * -1) $s5;
        padding: calc($s0) calc($s5);
        border-bottom: 1px solid;

        @media (max-width: $mobile) {
          margin: calc($s2 * -1) calc($s1 * -1) $s1;
          padding: calc($s0) calc($s1);
        }
      }

      figure + h6.split {
        margin-top: calc($s4 * -1);

        @media (max-width: $mobile) {
          margin-top: calc($s2 * -1);
        }
      }

      figure:has(+ h6.split) {
        margin-top: calc($s2 * -1);

        @media (max-width: $mobile) {
          margin-top: 0;
        }
      }
    }

    main {

      &:not(.full):not(.columns-1) {
        @media (min-width: $mobile) {
          column-count: 2;
          column-gap: $s3;
          
          &.columns-3 {
            column-count: 3;
            column-gap: $s3;
          }

          :global(*) {
            break-inside: avoid-column;
          }
          :global(hr:has(+ hr)) {
            break-after: column;
          }
        }

        @media (max-width: $mobile) {
          :global(hr + hr) {
            display: none;
          }
        }
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
      margin-top: $s4;

      h6 {
        margin-bottom: 0;
      }

      :global(a) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: calc($s7 * 3);
        gap: $s1;
        border-bottom: 1px solid;
        padding: $s-3 0;

        font-weight: 600;
        font-family: $heading_font;
        line-height: 1;

        @media (max-width: $mobile) {
          width: 100%;
        }
      }
    }
  }
</style>