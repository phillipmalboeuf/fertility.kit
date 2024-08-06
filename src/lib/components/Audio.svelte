<script lang="ts" context="module">
  const players: {
    [id: string]: HTMLAudioElement
  } = {}

  export function stopAll() {
    Object.values(players).forEach(p => p.pause())
    return true
  }
</script>

<script lang="ts">
  import type { Asset } from 'contentful'
  import { onMount } from 'svelte'

  let { media, play=false }: {
    media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
    play?: boolean
  } = $props()

  let audio: HTMLAudioElement
  let paused: boolean = $state(true)

  onMount(() => {
    // console.log(audio)
    players[media.sys.id] = audio
  })
</script>

<button class="button--none h5" onclick={() => {
  if (paused) {
    stopAll()
    audio.play()
  } else {
    audio.pause()
  }
}}>
  {#if play}
  {#if paused}Play{:else}Pause{/if}
  {:else}
  {media.fields.title}
  {#if paused}
  <svg width="14" height="14" viewBox="0 0 14 14">
    <path d="M9.83333 6.9L5 4V9.8L9.83333 6.9Z" fill="currentColor"/>
    <circle cx="7" cy="7" r="6.5" stroke="currentColor"/>
  </svg>
  {:else}
  <svg width="14" height="14" viewBox="0 0 15 15">
  <circle cx="7.5" cy="7.5" r="7" stroke="currentColor"/>
  <rect x="5" y="5" width="5" height="5" fill="currentColor"/>
  </svg>
  {/if}
  {/if}
</button>
<audio onpause={() => { paused = true }} onplay={() => { paused = false }} bind:this={audio} src={media.fields.file.url} data-title={media.fields.title}></audio>

<style lang="scss">
  button {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
</style>