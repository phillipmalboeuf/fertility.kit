import { CONTENTFUL_DELIVERY_TOKEN, CONTENTFUL_PREVIEW_TOKEN, CONTENTFUL_SPACE_ID, PREVIEW } from '$env/static/private'
import contentful from "contentful"

export const content = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  environment: "2.0",
  accessToken: PREVIEW
    ? CONTENTFUL_PREVIEW_TOKEN
    : CONTENTFUL_DELIVERY_TOKEN,
  host: PREVIEW ? "preview.contentful.com" : "cdn.contentful.com",
}).withoutUnresolvableLinks