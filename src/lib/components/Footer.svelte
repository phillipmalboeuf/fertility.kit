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

<footer class="padded--thick flex flex--thick_gapped">
  <div class="col col--3of12 col--mobile--12of12">
    <a href="/">
      <Logo />
    </a>
  </div>
  <div class="col col--2of12 col--mobile--12of12">
    <nav class="flex flex--column">
      {#each footer.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
  <div class="col col--2of12 col--mobile--12of12">
    <nav class="flex flex--column">
      {#each social.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
  <div class="col col--3of12 col--mobile--12of12">
    <nav class="flex flex--tight_gapped flex--column work">
      {#if work.fields.title}
      <h6 class="h--alt">{@html work.fields.title}</h6>
      {/if}
      {#each work.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
  <div class="col col--3of12 col--mobile--12of12"></div>
  <div class="col col--4of12 col--mobile--12of12">
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
    padding-top: $s5;
    padding-bottom: $s3;

    :global(svg) {
      width: 115px;
      
      @media (max-width: $mobile) {
        width: 115px;
      }
    }

    nav {
      font-family: $heading_font;

      @media (min-width: $mobile) {
        font-size: $s-1;
      }

      :global(a) {
        padding: 0.2em 0;
        transition: opacity 333ms;

        &:hover,
        &:focus {
          opacity: 0.5;
        }
      }

      &:not(.disclaimers) {  
        font-weight: bold;
      }

      &.disclaimers {
        font-size: $s-2;

        :global(a) {
          opacity: 0.4;

          &:hover,
          &:focus {
            opacity: 1;
          }
        }
      }

      &.work {
        

        :global(a) {
          border-bottom: 1.5px solid;
        }
      }
    }

    div:last-child {
      margin-top: $s2;
    }
  }
</style>