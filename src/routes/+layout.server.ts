
import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry, Tag } from 'contentful'

export const load = async ({ request, cookies }) => {

  const [navigations, tags] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.title', 'fields.id', 'fields.links'], include: 2, locale: 'en-US' }),
    content.getTags()
  ])

  const orders = {
    'research': 98,
    'hormone-health': 0,
    'tipsTricks': 0,
    'fertilityTreatments': -1,
    'playlist': 99,
  }

  return {
    navigations: {
      ...navigations.items.reduce((navs, nav) => {
        return {
          ...navs,
          [nav.fields.id]: nav
        }
      }, {} as {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>}),
    },
    tags: tags.items.sort((a, b) => (orders[a.sys.id] || 0) - (orders[b.sys.id] || 0)).reduce((ts, tag) => {
      return {
        ...ts,
        [tag.sys.id]: tag
      }
    }, {} as {[id: string]: Tag})
  }
}