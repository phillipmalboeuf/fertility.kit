
import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'



export const load = async ({ request, cookies }) => {

  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 2, "fields.id": "home", locale: 'en-US' }),
  ])

  return {
    page: page.items[0],
  }
}