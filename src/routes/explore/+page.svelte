<script lang="ts">
  import { page } from '$app/stores';
  import Media from '$lib/components/Media.svelte'
  import Page from '../[page]/+page.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let dialog = $derived($page.state.href?.includes('/explore'))
</script>

<Page {data} />

{#if !dialog && data.page.fields.background}
<figure class="background">
  <Media media={data.page.fields.background} eager />
</figure>
{/if}