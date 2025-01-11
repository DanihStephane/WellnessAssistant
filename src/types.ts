export type Language = 'fr' | 'en' | 'mg';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface DailyLog {
  date: string;
  energyLevel: number;
  hydration: number;
  relaxation: number;
}

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}