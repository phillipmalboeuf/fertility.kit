<script lang="ts">
	import '../styles/styles.scss'

	import Dialog from '$lib/components/Dialog.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	import { page } from '$app/stores'
	import type { Snippet } from 'svelte'

	import type { LayoutData } from './$types'
  let { data, children }: {
		data: LayoutData,
		children: Snippet
	} = $props()
</script>

<svelte:head>
	{#if $page.data.page?.fields}
	<title>{$page.data.page.fields.title}</title>
	<!-- <meta name="description" content={$page.data.page.fields.description} /> -->
	{/if}
</svelte:head>

<div class="{$page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {$page.url.pathname.replaceAll('/', '-')}" style:--color={$page.data.page?.fields.color}>
	<Dialog />
	<Header navigation={data.navigations['navigation']} /> 

	<main>
		{@render children()}
	</main>

	<Footer navigation={data.navigations['navigation']}
		footer={data.navigations['footer']}
		social={data.navigations['social']}
		work={data.navigations['work']}
		disclaimers={data.navigations['disclaimers']} />
</div>

<style lang="scss">
	div {
		background-color: var(--color);
		transition: background-color 666ms;
	}

	main {
		// width: 75vw;
		// margin-left: auto;
		min-height: 100vh;

		:global(> section) {
			padding-left: calc(25% - ($s4 / 2));
		}
	}
</style>
