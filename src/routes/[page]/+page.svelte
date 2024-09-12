<script lang="ts">
  import { isTypeText, isTypeGallery, isTypeList } from '$lib/clients/content_types'
  import Text from '$lib/components/Text.svelte'
  import Gallery from '$lib/components/Gallery.svelte'
  import List from '$lib/components/List.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#if data.page.fields.content}
{#each data.page.fields.content as item, i}
<section class:testis={data.page.fields.id === 'testimonials'} class:gallery={isTypeGallery(item)} class:boxed={(isTypeText(item) || isTypeList(item)) && item.fields.boxed} style:background-color={(isTypeText(item) || isTypeList(item)) ? item.fields.color : isTypeGallery(item) ? '#fff' : undefined}>
  <div class="padded--thick">
    {#if isTypeText(item)}
    <Text {item} full={['disclaimer'].includes(data.page.fields.id)} first={i === 0} />
    {:else if isTypeList(item)}
    <List {item} full={['disclaimer'].includes(data.page.fields.id)} />
    {:else if isTypeGallery(item)}
    <Gallery {item} preview={i !== 0} currentTag={data.tag} format={data.format} />
    {/if}
  </div>
</section>
{/each}
{/if}

<style lang="scss">
  section {
    transition: background-color 1333ms;

    &:global(:has(+ .background)) {
      padding-left: 0 !important;
      background-color: transparent !important;
    }

    &.boxed {
      // border-top: 1px solid;
      // border-bottom: 1px solid;

      @media (min-width: $mobile) {
        > div {
          border-left: 1px solid;
        }
      }

      + .boxed {
        border-top: none;

        > div {
          border-top: 1px solid;
        }
      }

      &:not(:has(+ .boxed)) {
        // border-bottom: 1px solid;
      }
    }

    &.testis {
      > div {
        border-top: none !important;
      }
    }
  }
</style>