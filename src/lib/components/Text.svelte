<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Star from './Star.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()

  let desktop = $state(false)

  onMount(() => {
    if (window.innerWidth > 888) {
      desktop = true
    }
  })
</script>

<section class:boxed={item.fields.boxed} >
  {#if item.fields.media?.length}
  {#each item.fields.media as media, i}
  <figure>
    <Media {media} mobileMedia={item.fields.mobileMedia?.length >= i - 1 ? item.fields.mobileMedia[i] : undefined} />
  </figure>
  {/each}
  {/if}

  {#if item.fields.subtitle}
  <h6 id={item.fields.id}>{item.fields.subtitle}</h6>
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
  {#if first}
  <h2>{item.fields.title}</h2>
  {:else}
  <h3>{item.fields.title}</h3>
  {/if}
  {/if}
  {/if}
  {/if}
  {#if item.fields.body}
  {#if item.fields.rightColumn?.content.length}
  <main class:full={true} class="flex flex--thick_gapped">
    <div class="col col--7of12 col--mobile--12of12">
      <Rich body={item.fields.body} />
    </div>
    <div class="col col--5of12 col--mobile--12of12">
      <details open={desktop}>
        <summary class="flex flex--middle flex--gapped"><svg width="33" height="10" viewBox="0 0 33 10">
<path d="M4.58317 0.209228C2.05424 0.209228 -0.000162214 2.26363 -0.000162325 4.79256C-0.000162436 7.32148 2.05424 9.37589 4.58317 9.37589C7.1121 9.37589 9.1665 7.32707 9.1665 4.79256C9.1665 2.25805 7.11768 0.209228 4.58317 0.209228Z" />
<path d="M11.9168 4.79256C11.9168 7.32386 13.9689 9.37589 16.5002 9.37589C19.0315 9.37589 21.0835 7.32386 21.0835 4.79256C21.0835 2.26125 19.0315 0.209228 16.5002 0.209228C13.9689 0.209228 11.9168 2.26125 11.9168 4.79256Z" />
<path d="M33 4.79256C33 2.26363 30.9512 0.209228 28.4167 0.209228C25.8822 0.209228 23.8333 2.25805 23.8333 4.79256C23.8333 7.32707 25.8877 9.37589 28.4167 9.37589C30.9456 9.37589 33 7.32707 33 4.79256Z" /></svg> <h6 class="col">Read More</h6></summary>
        <Rich body={item.fields.rightColumn} />
      </details>
    </div>
  </main>
  {:else}
  <main class:full class="columns-{item.fields.columns || 2}">
    <Rich body={item.fields.body} />
  </main>
  {/if}
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
    h3,
    h5,
    h6:not(:has(+ hr)),
    figure,
    hr {
      margin-bottom: $s5;

      @media (max-width: $mobile) {
        margin-bottom: $s3;
      }
    }

    figure {
      :global(img),
      :global(video) {
        max-height: 75vh;
      }
    }

    hr {
      margin-top: $s0;
    }

    h2,
    h3 {
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

        @media (max-height: $mobile) {
          margin: calc($s5 * -1) calc($s5 * -1) $s5;
        }

        @media (max-width: $mobile) {
          margin: calc($s2 * -1) calc($s1 * -1) $s1;
          padding: calc($s0) calc($s1);
        }
      }

      figure + h6.split {
        margin-top: calc($s5 * -1);

        @media (max-width: $mobile) {
          margin-top: calc(($s2 * -1) + 2px);
        }
      }

      figure:has(+ h6.split) {
        margin-top: calc(($s2 * -1) + 2px);

        @media (max-width: $mobile) {
          margin-top: 0;
        }
      }
    }

    main {

      &.flex {
        --gap: #{$s5};

        @media (max-width: $mobile) {
          --gap: 0;
        }
      }

      &:not(.full):not(.columns-1) {
        @media (min-width: $mobile) {
          column-count: 2;
          column-gap: $s3;
          
          &.columns-3 {
            column-count: 3;

            &:global(:has(blockquote)) {
              // column-count: unset;
              // display: grid;
              // grid-auto-flow: column dense;
              // grid-template-rows: repeat(3, 1fr);
              
              // column-gap: $s4;

              // :global(p),
              // :global(blockquote) {
              //   margin-top: 0;
              // }

              // :global(blockquote) {
              //   // grid-row: span 2;
              // }
            }
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

      :global(p),
      :global(h1),
      :global(h2),
      :global(h3),
      :global(h4),
      :global(h5),
      :global(h6),
      :global(blockquote) {
        margin: $s1 0;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    details {
      summary {
        h6 {
          margin: 0;
        }
      }

      &[open] {
        summary {
          display: none;

          & + :global(p) {
            margin-top: 0;
          }
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