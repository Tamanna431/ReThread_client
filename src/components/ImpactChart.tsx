'use client';

import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, Legend 
} from 'recharts';
import { Leaf, Droplets, Wind, TrendingUp } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', waterSaved: 180, co2Reduced: 320, itemsListed: 450 },
  { month: 'Feb', waterSaved: 220, co2Reduced: 380, itemsListed: 520 },
  { month: 'Mar', waterSaved: 280, co2Reduced: 450, itemsListed: 610 },
  { month: 'Apr', waterSaved: 350, co2Reduced: 520, itemsListed: 720 },
  { month: 'May', waterSaved: 420, co2Reduced: 610, itemsListed: 850 },
  { month: 'Jun', waterSaved: 480, co2Reduced: 680, itemsListed: 920 },
  { month: 'Jul', waterSaved: 550, co2Reduced: 750, itemsListed: 1050 },
];

const categoryData = [
  { name: 'Men', value: 1200, color: '#1A3626' },
  { name: 'Women', value: 2500, color: '#E07A5F' },
  { name: 'Accessories', value: 800, color: '#2D5A3D' },
  { name: 'Shoes', value: 950, color: '#F09B85' },
];

export default function ImpactChart() {
  return (
    <div className="space-y-8">
      {/* Main Impact Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-2xl font-bold text-forest mb-2">
              Monthly Environmental Impact
            </h3>
            <p className="text-gray-600 text-sm">
              Water saved (L) and CO₂ reduced (kg) over the past 7 months
            </p>
          </div>
          <div className="bg-gradient-to-br from-terracotta to-terracotta-dark p-3 rounded-xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A3626" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1A3626" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E07A5F" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#E07A5F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '14px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '14px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#F9F6F0', 
                border: '1px solid #E07A5F',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="waterSaved" 
              stroke="#1A3626" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorWater)" 
              name="Water Saved (L)"
            />
            <Area 
              type="monotone" 
              dataKey="co2Reduced" 
              stroke="#E07A5F" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCO2)" 
              name="CO₂ Reduced (kg)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Items Listed Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-forest to-forest-light p-2.5 rounded-xl">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-forest">
                Items Listed Growth
              </h3>
              <p className="text-gray-500 text-sm">Monthly new listings</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9F6F0', 
                  border: '1px solid #1A3626',
                  borderRadius: '12px'
                }}
              />
              <Bar 
                dataKey="itemsListed" 
                fill="url(#colorBarGradient)" 
                radius={[8, 8, 0, 0]}
                name="Items Listed"
              />
              <defs>
                <linearGradient id="colorBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E07A5F"/>
                  <stop offset="100%" stopColor="#C9644A"/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-terracotta to-terracotta-dark p-2.5 rounded-xl">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-forest">
                Category Distribution
              </h3>
              <p className="text-gray-500 text-sm">Items by category</p>
            </div>
          </div>

          <div className="space-y-4">
            {categoryData.map((category, idx) => {
              const maxValue = Math.max(...categoryData.map(c => c.value));
              const percentage = (category.value / maxValue) * 100;
              
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-forest">{category.name}</span>
                    <span className="text-gray-600 font-medium">{category.value} items</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wind className="w-4 h-4 text-terracotta" />
              <span>Total: <strong className="text-forest">5,450 items</strong> across all categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}