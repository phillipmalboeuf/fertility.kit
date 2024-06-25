// See https://kit.svelte.dev/docs/types#app

import type { TypePageSkeleton } from '$lib/clients/content_types'
import type { Entry, Tag } from 'contentful'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			page?: Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
			tags: {[id: string]: Tag}
		}
		interface PageState {
			href?: string
			data?: any
		}
		// interface Platform {}
	}
}

export {};
