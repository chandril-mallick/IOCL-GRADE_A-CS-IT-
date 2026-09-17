import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, PenTool, Target, AlertTriangle, Bookmark, Brain, Calculator, Calendar, Zap } from 'lucide-react';

export default function Sidebar({ isOpen, closeSidebar }) {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'MasterBook', path: '/book', icon: BookOpen },
    { name: 'Practice Lab', path: '/practice', icon: PenTool },
    { name: 'Mock Tests', path: '/mock', icon: Target },
    { name: 'Error Book', path: '/error-book', icon: AlertTriangle },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { name: 'Flashcards', path: '/flashcards', icon: Brain },
    { name: 'Formula Book', path: '/formulas', icon: Calculator },
    { name: '7-Day Plan', path: '/7-day-plan', icon: Calendar },
    { name: 'Last-Day Revision', path: '/last-day', icon: Zap },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        IOCL MasterBook
      </div>
      <nav style={{ padding: '20px 0' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
