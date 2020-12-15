export interface Clube {
  id: number;
  name: string;
  shortCode: string;
  logo: string;
}

export function initClube(): Clube {
  return { id: -1, name: '', shortCode: '', logo: '' };
}
