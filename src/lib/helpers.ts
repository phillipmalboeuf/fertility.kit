import { goto, preloadData, pushState, replaceState } from '$app/navigation'
import type { MouseEventHandler } from 'svelte/elements'


export const openDialog: MouseEventHandler<HTMLAnchorElement> = async (e) => {
  if (e.metaKey) return;

  e.preventDefault && e.preventDefault()
  const { href } = e.currentTarget
  const [data] = await Promise.all([
    preloadData(href)
  ])


  if (data.type === 'loaded' && data.status === 200) {
    pushState(href, { href, data: data.data })
  } else {
    goto(href)
  }
}