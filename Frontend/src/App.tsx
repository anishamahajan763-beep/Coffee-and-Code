import { useState } from 'react';
import { RouterView } from '@/components/RouterView';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { Dashboard } from '@/pages/Dashboard';
import { SkillsMarketplace } from '@/pages/SkillsMarketplace';
import { ProfilePage } from '@/pages/ProfilePage';
import type { Route, UserData } from '@/types';

const App = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [user, setUser] = useState<UserData | null>(null);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  const routes: Route[] = [
    { path: '/', component: <LandingPage onNavigate={handleNavigate} /> },
    {
      path: '/auth',
      component: <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />,
    },
    {
      path: '/dashboard',
      component: user ? (
        <Dashboard user={user} onNavigate={handleNavigate} />
      ) : (
        <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />
      ),
    },
    {
      path: '/skills',
      component: user ? (
        <SkillsMarketplace user={user} onNavigate={handleNavigate} />
      ) : (
        <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />
      ),
    },
    {
      path: '/profile',
      component: user ? (
        <ProfilePage user={user} onNavigate={handleNavigate} />
      ) : (
        <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />
      ),
    },
  ];

  return (
    <div className="font-sans">
      <RouterView routes={routes} currentPath={currentPath} />
    </div>
  );
};

export default App;
