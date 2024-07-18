enum categoryEnum{
    general = "general",
    coding = "coding",
    document = "document",
    secret = "secret",
    other = "other"
}

enum statusEnum{
    active = "active",
    inactive = "inactive",
    banned = "banned",
    expired = "expired",
    deleted = "deleted"
}

enum privacyEnum{
    public = "public",
    private = "private",
    unlisted = "unlisted"
}

enum adTypeEnum{
    low = "low",
    medium = "medium",
    high = "high"
}

export enum programmingLanguagesEnum{
    text = "text",
    javascript = "javascript",
    html = "html",
    css = "css",
    json = "json",
    python = "python",
    xml = "xml",
    sql = "sql",
    java = "java",
    rust = "rust",
    cpp = "cpp",
    php = "php",
    wast = "wast",
    lezer = "lezer",
}

export function enumToArray<T>(enumObject: T extends Record<keyof T, string> ? T : never): (keyof T)[] {
	return Object.keys(enumObject) as Array<keyof T>;
}

export function enumToArrayReadonly<T>(enumObject: T extends Record<keyof T, string> ? T : never): ReadonlyArray<keyof T> {
    return Object.keys(enumObject) as Array<keyof T>;
}

export const categoryArray = enumToArrayReadonly(categoryEnum);
export const privacyArray = enumToArrayReadonly(privacyEnum);
export const adTypeArray = enumToArrayReadonly(adTypeEnum);
export const statusArray = enumToArrayReadonly(statusEnum);
export const programmingLanguagesArray = enumToArrayReadonly(programmingLanguagesEnum);

export type categoryType = typeof categoryArray[number];
export type privacyType = typeof privacyArray[number];
export type adType = typeof adTypeArray[number];
export type statusType = typeof statusArray[number];
export type programmingLanguagesType = typeof programmingLanguagesArray[number];


export type NonEmptyArray<T> = [T, ...T[]];
