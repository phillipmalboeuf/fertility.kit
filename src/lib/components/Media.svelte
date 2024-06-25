<script lang="ts">
  import type { Asset } from 'contentful'

  let {
    media,
    alt,
    width = 1666,
    ar = undefined,
    rounded = false,
    eager = false
  } : {
    media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
    alt?: string
    width?: number
    ar?: number
    rounded?: boolean
    eager?: boolean
  } = $props()

  // export let video: HTMLVideoElement = undefined

  function cdn(url: string) {
    return url
  }
</script>

{#if media}
{#if media.fields.file.contentType.startsWith('video/')}
<!-- svelte-ignore a11y-media-has-caption -->
<video class:rounded src="{cdn(media.fields.file.url)}" controls autoplay={eager} muted={eager} loop={eager}></video>
{:else if media.fields.file.contentType.startsWith('audio/')}
<!-- svelte-ignore a11y-media-has-caption -->
<audio class:rounded src="{cdn(media.fields.file.url)}" controls></audio>
{:else}
<!-- {JSON.stringify(media, null, 2)} -->
<picture>
  <source srcSet="{cdn(media.fields.file.url)}?w={width * 0.333}{ar ? `&fit=fill&h=${Math.round(width * 0.333 * ar)}` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.fields.file.url)}?w={width * 0.666}{ar ? `&fit=fill&h=${Math.round(width * 0.666 * ar)}` : ''}" media="(max-width: 1200px)" />
  <img class:rounded src="{cdn(media.fields.file.url)}?w={width}{ar ? `&fit=fill&h=${Math.round(width * ar)}` : ''}"
    style={`aspect-ratio: ${ar ? `${width} / ${Math.round(width * ar)}` : `${media.fields.file.details.image.width} / ${media.fields.file.details.image.height}`}`}
    alt="{alt || media.fields.title}" loading={eager ? "eager" : "lazy"} />
</picture>
{/if}
{/if}

<style lang="scss">
  img,
  video,
  audio {
    display: block;
    width: 100%;
    object-fit: cover;
    // border-radius: $radius;

    &.rounded {
      border-radius: $radius;
    }
  }

  video {
    // background-color: var(--background-inverse);
    // cursor: pointer;
  }
 
  audio::-webkit-media-controls-enclosure {
    // background-color: var(--background-inverse);
  }
</style>