export const supportedLangs = ["en", "zh", "si"] as const;
export type Lang = (typeof supportedLangs)[number];

export interface LocalizedText {
    en: string;
    zh?: string;
    si?: string;
    path?: string;
}
