import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAdvisorFields {
    name: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    position?: EntryFieldTypes.Symbol;
    certifications?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
}

export type TypeAdvisorSkeleton = EntrySkeletonType<TypeAdvisorFields, "advisor">;
export type TypeAdvisor<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAdvisorSkeleton, Modifiers, Locales>;

export function isTypeAdvisor<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAdvisor<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'advisor'
}

export interface TypeGalleryFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    overlays?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    underlays?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePlaylistSkeleton | TypeTextSkeleton>>;
    color?: EntryFieldTypes.Symbol;
}

export type TypeGallerySkeleton = EntrySkeletonType<TypeGalleryFields, "gallery">;
export type TypeGallery<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGallerySkeleton, Modifiers, Locales>;

export function isTypeGallery<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeGallery<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'gallery'
}

export interface TypeLinkFields {
    label?: EntryFieldTypes.Symbol;
    destination?: EntryFieldTypes.Symbol;
    color?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;

export function isTypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLink<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'link'
}

export interface TypeListFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    subtitle?: EntryFieldTypes.Symbol;
    color?: EntryFieldTypes.Symbol;
    boxed?: EntryFieldTypes.Boolean;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    mobileMedia?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAdvisorSkeleton | TypePlaylistSkeleton | TypeTextSkeleton>>;
    navigation?: EntryFieldTypes.EntryLink<TypeNavigationSkeleton>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;

export function isTypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeList<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'list'
}

export interface TypeNavigationFields {
    title?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    title?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    step?: EntryFieldTypes.Symbol<"1" | "2" | "3" | "4">;
    color?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeGallerySkeleton | TypeListSkeleton | TypeNavigationSkeleton | TypePlaylistSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypePlaylistFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    boxed?: EntryFieldTypes.Boolean;
    audioFiles?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    linkLabel?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
}

export type TypePlaylistSkeleton = EntrySkeletonType<TypePlaylistFields, "playlist">;
export type TypePlaylist<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePlaylistSkeleton, Modifiers, Locales>;

export function isTypePlaylist<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePlaylist<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'playlist'
}

export interface TypeSlideFields {
    body?: EntryFieldTypes.RichText;
    color?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
}

export type TypeSlideSkeleton = EntrySkeletonType<TypeSlideFields, "slide">;
export type TypeSlide<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSlideSkeleton, Modifiers, Locales>;

export function isTypeSlide<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeSlide<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'slide'
}

export interface TypeSliderFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    slides?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSlideSkeleton>>;
}

export type TypeSliderSkeleton = EntrySkeletonType<TypeSliderFields, "slider">;
export type TypeSlider<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSliderSkeleton, Modifiers, Locales>;

export function isTypeSlider<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeSlider<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'slider'
}

export interface TypeTextFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    subtitle?: EntryFieldTypes.Symbol;
    color?: EntryFieldTypes.Symbol;
    collapsable?: EntryFieldTypes.Boolean;
    boxed?: EntryFieldTypes.Boolean;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    mobileMedia?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    body?: EntryFieldTypes.RichText;
    more?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePlaylistSkeleton | TypeSliderSkeleton | TypeTextSkeleton>>;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
    navigation?: EntryFieldTypes.EntryLink<TypeNavigationSkeleton>;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
