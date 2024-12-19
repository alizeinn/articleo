import React, { useState } from 'react';
import { BookOpen, Lightbulb, Link2, ChevronRight, X } from 'lucide-react';

interface ArticleoWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleoWidget({ isOpen, onClose }: ArticleoWidgetProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'highlights' | 'related'>('summary');

  const tabs = [
    { id: 'summary', icon: BookOpen, label: 'Summary' },
    { id: 'highlights', icon: Lightbulb, label: 'Highlights' },
    { id: 'related', icon: Link2, label: 'Related' },
  ] as const;

  return (
    <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-indigo-600 text-white">
          <h2 className="text-xl font-semibold">Articleo.ai</h2>
          <button onClick={onClose} className="p-1 hover:bg-indigo-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
                activeTab === id
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Article Summary</h3>
              <p className="text-gray-600">
                This AI-generated summary helps readers quickly grasp the key points of the article.
                The summary will be generated based on the article's content.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Key Points</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                    <span>Main point of the article will appear here</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                    <span>Supporting details and context</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'highlights' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Key Highlights</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-1" />
                      <p className="text-gray-600">Important highlight {i} from the article will be displayed here</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Related Content</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-1">Related Article {i}</h4>
                    <p className="text-sm text-gray-600">Brief description of the related article...</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}