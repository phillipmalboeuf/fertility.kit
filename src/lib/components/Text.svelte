<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'

  let { item }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section id={item.fields.id}>
  <h2>{item.fields.title}</h2>

  {#if item.fields.body}
  <main class="flex flex--gapped flex--column">
    <Rich body={item.fields.body} />
  </main>
  {/if}
</section>

<style lang="scss">
  section {

    h2 {
      margin-bottom: $s1;
    }
  }
</style>