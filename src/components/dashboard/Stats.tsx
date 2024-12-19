import React from 'react';
import { Users, BookOpen, BarChart } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      label: 'Total Summaries',
      value: '12,493',
      icon: BookOpen,
      change: '+14%',
      changeType: 'positive'
    },
    {
      label: 'Active Users',
      value: '2,845',
      icon: Users,
      change: '+18%',
      changeType: 'positive'
    },
    {
      label: 'Engagement Rate',
      value: '64%',
      icon: BarChart,
      change: '+7%',
      changeType: 'positive'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <stat.icon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}