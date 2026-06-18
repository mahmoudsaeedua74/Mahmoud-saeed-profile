export type LocalizedString = { en: string; ar?: string };

export function en(value: LocalizedString | string): string {
  return typeof value === 'string' ? value : value.en;
}
