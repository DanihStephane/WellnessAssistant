import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <select
      value={currentLanguage}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
      className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
    >
      <option value="fr" className="text-gray-800">Français</option>
      <option value="en" className="text-gray-800">English</option>
      <option value="mg" className="text-gray-800">Malagasy</option>
    </select>
  );
};