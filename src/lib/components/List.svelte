<script lang="ts">
  import { isTypeAdvisor, isTypePlaylist, isTypeText, type TypeListSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import { linear } from 'svelte/easing';

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
          <h6 class="col col--6of12">{i.fields.position} <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.00014 7.46826C4.30168 7.46826 3.73428 8.03412 3.73428 8.73412C3.73428 9.43412 4.30168 9.99997 5.00014 9.99997C5.6986 9.99997 6.266 9.43412 6.266 8.73412C6.266 8.03412 5.70014 7.46826 5.00014 7.46826Z" fill="black"/>
<path d="M10.0003 4.99974C10.0003 4.30129 9.4329 3.73389 8.73444 3.73389C8.03598 3.73389 7.46858 4.30129 7.46858 4.99974C7.46858 5.6982 8.03444 6.2656 8.73444 6.2656C9.43444 6.2656 10.0003 5.69974 10.0003 4.99974Z" fill="black"/>
<path d="M5.00014 2.46793C5.6986 2.46793 6.266 1.91622 6.266 1.23372C6.266 0.551223 5.70014 -0.000488281 5.00014 -0.000488281C4.30014 -0.000488281 3.73428 0.552726 3.73428 1.23372C3.73428 1.91472 4.30168 2.46793 5.00014 2.46793Z" fill="black"/>
<path d="M1.23421 3.73389C0.553213 3.73389 0 4.30129 0 4.99974C0 5.6982 0.55171 6.2656 1.23421 6.2656C1.91671 6.2656 2.46842 5.69974 2.46842 4.99974C2.46842 4.29974 1.91671 3.73389 1.23421 3.73389Z" fill="black"/>
<path d="M7.46858 3.71781C7.46858 3.02808 6.90979 2.46777 6.21854 2.46777C5.5273 2.46777 4.96851 3.02656 4.96851 3.71628C4.96851 3.02656 4.4082 2.46777 3.71848 2.46777C3.02875 2.46777 2.46844 3.02656 2.46844 3.71781C2.46844 4.40905 3.02723 4.96632 3.71695 4.96784C3.02723 4.96784 2.46844 5.52815 2.46844 6.21787C2.46844 6.9076 3.02723 7.4679 3.71848 7.4679C4.40973 7.4679 4.96851 6.90912 4.96851 6.21939C4.96851 6.90912 5.5273 7.4679 6.21854 7.4679C6.90979 7.4679 7.46858 6.90912 7.46858 6.21787C7.46858 5.52662 6.90979 4.96784 6.22007 4.96784C6.90979 4.96784 7.46858 4.40905 7.46858 3.71781ZM4.97003 6.21635C4.97003 5.52662 4.41125 4.96784 3.72 4.96632C4.40973 4.96632 4.96851 4.40753 4.97003 3.71781C4.97003 4.40753 5.52882 4.96632 6.21854 4.96632C5.52882 4.96632 4.97003 5.52662 4.97003 6.21635Z" fill="black"/>
</svg> {i.fields.certifications}</h6>
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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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