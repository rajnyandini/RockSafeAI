import React from 'react';
import { Home, MapPin, AlertTriangle, Settings, Info } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'riskmap', label: 'Risk Map', icon: MapPin },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'about', label: 'About', icon: Info },
];

const Sidebar = ({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) => {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <aside className={`${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`} 
    style={{ borderRight: '1px solid #C6DCBA' }}>
      
      <div className="flex flex-col h-full pt-16 lg:pt-0">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors font-medium"
                style={{
                  backgroundColor: isActive ? '#BBC3A4' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#6B7280'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = '#D7E4C0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t" style={{ borderColor: '#C6DCBA' }}>
          <p className="text-xs text-gray-500 text-center">
            RiskMonitor v1.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;