<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Link from './Link.svelte'
  import Logo from './Logo.svelte'

  let { navigation, social, footer, work, disclaimers }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    social: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    disclaimers: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="padded flex flex--thick_gapped">
  <div class="col col--3of12">
    <a href="/">
      <Logo />
    </a>
  </div>
  <div class="col col--2of12">
    <nav class="flex flex--column">
      {#each footer.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
  <div class="col col--2of12">
    <nav class="flex flex--column">
      {#each social.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
  <div class="col col--4of12">
    <nav class="flex flex--tight_gapped flex--column">
      {#if work.fields.title}
      <h5 class="h--alt">{work.fields.title}</h5>
      {/if}
      {#each work.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
  <div class="col col--3of12"></div>
  <div class="col col--4of12">
    <nav class="flex flex--thick_gapped disclaimers">
      {#each disclaimers.fields.links as link}
      <Link {link} className='col col--6of12' />
      {/each}
    </nav>
  </div>
</footer>

<style lang="scss">
  footer {
    border-top: 2px solid;
    background-color: $light;

    nav {
      font-family: $heading_font;

      &:not(.disclaimers) {  
        font-weight: bold;
      }

      &.disclaimers {
        font-size: $s-1;
      }
    }
  }
</style>