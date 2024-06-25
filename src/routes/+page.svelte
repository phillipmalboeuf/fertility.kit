<script lang="ts">
  import Page from './[page]/+page.svelte'

	import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<Page {data} />

<style lang="scss">
</style>


<!-- 
<div class="padded flex flex--thick_gapped flex--column mid">
  <h1>Certified Integrative Fertility and Hormones coach, specializing in support for those pursuing IVF/FET, IUI, egg freezing, and third-party reproduction.</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div> -->