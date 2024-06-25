<script lang="ts">
  import { isTypeText, type TypeGallerySkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  import { page } from '$app/stores'
  
  import Rich from './Rich.svelte'
  import Text from './Text.svelte'
  import Media from './Media.svelte'
  
  import { openDialog } from '$lib/helpers'

  let { item }: {
    item: Entry<TypeGallerySkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
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

<section id={item.fields.id}>
  <!-- <h2>{item.fields.title}</h2> -->

  <!-- {#if item.fields.body}
  <main class="flex flex--gapped flex--column">
    <Rich body={item.fields.body} />
  </main>
  {/if} -->
  <nav>
    <a href="?" onclick={(e) => {
      if ($page.state.href?.includes('/explore')) {
        openDialog(e)
      }
    }}>All</a>
    {#each Object.values($page.data.tags) as tag}
    <a href="?tag={tag.sys.id}" onclick={(e) => {
      if ($page.state.href?.includes('/explore')) {
        openDialog(e)
      }
    }}>{tag.name}</a>
    {/each}
  </nav>

  <ol class="list--nostyle">
    <!-- {#each item.fields.content.filter(i => !$page.url.searchParams.get('tag') || i.metadata.tags.find(t => t.sys.id === $page.url.searchParams.get('tag'))) as i} -->
    {#each item.fields.content as i}
    <li>
      <details>
        <summary class="flex flex--gapped flex--spaced">
          <h6 class="col col--6of12">{i.metadata.tags.map(t => $page.data.tags[t.sys.id].name).join(', ')}</h6>
          <u>Show More</u>
          {#if isTypeText(i) && i.fields.media?.length}
          <figure class="col col--3of12">
            <Media media={i.fields.media[0]} width={200} ar={1} />
          </figure>
          {/if}
          <h6 class="col col--9of12"><strong>{i.fields.title}</strong></h6>
        </summary>
        {#if isTypeText(i)}
        <Text item={i} />
        {/if}
      </details>
    </li>
    {/each}
  </ol>
</section>

<style lang="scss">
  section {
    
    details {
      summary {
        cursor: pointer;

        h6 {
          text-transform: capitalize;
        }
      }
    }
  }
</style>