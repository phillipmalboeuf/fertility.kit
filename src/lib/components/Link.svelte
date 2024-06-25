<script lang="ts">
  import type { TypeLinkSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'

  import { openDialog } from '$lib/helpers'

  let { link, className = undefined, more = undefined }: {
    link: Entry<TypeLinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    more?: Snippet
    className?: string
  } = $props()
</script>

<a class={className} href={link.fields.destination} {...link.fields.external && { target: '_blank', rel: 'external' }}
  onclick={e => {
    if (link.fields.destination.includes('/explore')) {
      openDialog(e)
    }
  }}>{link.fields.label}{#if more}{@render more()}{/if}</a>