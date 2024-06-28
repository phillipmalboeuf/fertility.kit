<script lang="ts">
  import { isTypeText, isTypeGallery } from '$lib/clients/content_types'
  import Text from '$lib/components/Text.svelte'
  import Gallery from '$lib/components/Gallery.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#if data.page.fields.content}
{#each data.page.fields.content as item, i}
<section class="padded">
  {#if isTypeText(item)}
  <Text {item} full={['disclaimer'].includes(data.page.fields.id)} />
  {:else if isTypeGallery(item)}
  <Gallery {item} />
  {/if}
</section>
{/each}
{/if}