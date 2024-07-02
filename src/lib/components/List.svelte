<script lang="ts">
  import { isTypeAdvisor, isTypePlaylist, isTypeText, type TypeListSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Star from './Star.svelte'

  let { item, full }: {
    item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    full?: boolean
  } = $props()
</script>

<section id={item.fields.id} class:boxed={item.fields.boxed}>
  {#if item.fields.title}
  {#if item.fields.media?.length}
  <h5>{item.fields.title}</h5>
  {:else}
  <h2>{item.fields.title}</h2>
  {/if}
  {/if}

  <main class="flex flex--gapped">
    {#if item.fields.media?.length}
    {#each item.fields.media as media, i}
    <figure class="col col--4of12">
      <Media {media} mobileMedia={item.fields.mobileMedia?.length >= i - 1 ? item.fields.mobileMedia[i] : undefined} />
    </figure>
    {/each}
    {/if}
    <ol class:col--8of12={item.fields.media?.length} class="col list--nostyle flex flex--gapped">
      {#each item.fields.items as i}
      <li class="col col--6of12" class:col--12of12={isTypeAdvisor(i)}>
        {#if isTypeText(i)}
        <h6>{i.fields.title}</h6>
        {#if i.fields.body}
        <Rich body={i.fields.body} />
        {/if}
        {:else if isTypeAdvisor(i)}
        <a href={i.fields.link} class="flex flex--gapped" target="_blank" rel="external">
          <h3 class="col col--6of12">{i.fields.name}</h3>
          <h6 class="col col--6of12">{i.fields.position} <Star /> {i.fields.certifications}</h6>
        </a>
        {/if}
      </li>
      {/each}
    </ol>
  </main>
  <!-- {#if item.fields.body}
  <main class:full>
    <Rich body={item.fields.body} />
  </main>
  {/if} -->

  {#snippet icon()}
  <svg width="16" height="16" viewBox="0 0 16 16">
  <path d="M7.66365 5.35547L10.7447 8.43649L7.66365 11.5175L7.24401 11.1015L9.61459 8.73097H4.65625V8.142H9.61459L7.24401 5.77142L7.66365 5.35547Z" fill="currentColor"/>
  <circle cx="7.65015" cy="8.34985" r="7.36754" transform="rotate(-90 7.65015 8.34985)" stroke="currentColor" stroke-width="0.565217"/>
  </svg>
  {/snippet}

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

      :global(p) {
        margin: $s1 0;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    ol {
      li {
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