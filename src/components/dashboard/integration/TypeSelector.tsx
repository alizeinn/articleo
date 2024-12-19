import React from 'react';
import { Code2, Tags } from 'lucide-react';
import { IntegrationType } from './types';

interface TypeSelectorProps {
  selected: IntegrationType;
  onSelect: (type: IntegrationType) => void;
}

export function TypeSelector({ selected, onSelect }: TypeSelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSelect('script')}
        className={
          selected === 'script'
            ? 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white'
            : 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      >
        <Code2 className="w-4 h-4" />
        Direct Script
      </button>
      <button
        onClick={() => onSelect('gtm')}
        className={
          selected === 'gtm'
            ? 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white'
            : 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      >
        <Tags className="w-4 h-4" />
        GTM
      </button>
    </div>
  );
}