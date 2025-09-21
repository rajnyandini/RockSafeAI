import React from 'react';
import RiskCard from '../components/RiskCard';
import Chart from '../components/Chart';
import { AlertTriangle, BarChart3, TrendingUp, Shield } from 'lucide-react';

const Dashboard = () => {
  const riskData = [
    {
      id: 'high-risk',
      title: 'High Risk',
      value: 12,
      icon: AlertTriangle,
      color: '#EF4444',
      bgColor: '#FFEBEE',
      trend: '+2 from last week'
    },
    {
      id: 'medium-risk',
      title: 'Medium Risk',
      value: 24,
      icon: AlertTriangle,
      color: '#EAB308',
      bgColor: '#FFFBF0',
      trend: '-3 from last week'
    },
    {
      id: 'low-risk',
      title: 'Low Risk',
      value: 156,
      icon: Shield,
      color: '#B3A398',
      bgColor: '#D7E4C0',
      trend: '+12 from last week'
    },
    {
      id: 'total-assets',
      title: 'Total Assets',
      value: 192,
      icon: BarChart3,
      color: '#BBC3A4',
      bgColor: '#C6DCBA',
      trend: '+5 new assets'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'High risk alert triggered', location: 'Server Room A', time: '5 min ago' },
    { id: 2, action: 'Risk assessment completed', location: 'Building B', time: '15 min ago' },
    { id: 3, action: 'Security scan finished', location: 'Network Infrastructure', time: '1 hour ago' },
    { id: 4, action: 'Risk threshold updated', location: 'System Configuration', time: '2 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage organizational risks</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskData.map((risk) => (
          <RiskCard key={risk.id} {...risk} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Component */}
        <div className="lg:col-span-1">
          <Chart />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: '1px solid #C6DCBA' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#BBC3A4' }}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.location}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: '#C6DCBA' }}>
            <button 
              className="text-sm font-medium transition-colors"
              style={{ color: '#B3A398' }}
              onMouseEnter={(e) => e.target.style.color = '#A39187'}
              onMouseLeave={(e) => e.target.style.color = '#B3A398'}
            >
              View all activity →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: '1px solid #C6DCBA' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className="p-4 rounded-lg text-left transition-colors"
            style={{ backgroundColor: '#D7E4C0' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C6DCBA'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D7E4C0'}
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6" style={{ color: '#B3A398' }} />
              <div>
                <h4 className="font-medium text-gray-900">Create Alert</h4>
                <p className="text-sm text-gray-600">Add new risk alert</p>
              </div>
            </div>
          </button>
          
          <button 
            className="p-4 rounded-lg text-left transition-colors"
            style={{ backgroundColor: '#D7E4C0' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C6DCBA'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D7E4C0'}
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6" style={{ color: '#B3A398' }} />
              <div>
                <h4 className="font-medium text-gray-900">Generate Report</h4>
                <p className="text-sm text-gray-600">Export risk analysis</p>
              </div>
            </div>
          </button>
          
          <button 
            className="p-4 rounded-lg text-left transition-colors"
            style={{ backgroundColor: '#D7E4C0' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C6DCBA'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D7E4C0'}
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6" style={{ color: '#B3A398' }} />
              <div>
                <h4 className="font-medium text-gray-900">Run Assessment</h4>
                <p className="text-sm text-gray-600">Start risk evaluation</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;