import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { UserData } from '@/types';

interface DashboardProps {
  user: UserData;
  onNavigate: (path: string) => void;
}

export const Dashboard = ({ user, onNavigate }: DashboardProps) => {
  const usedSessions = 3;
  const remainingSessions = user.points - usedSessions;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillSwap</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">👋 {user.name}</span>
            <Button onClick={() => onNavigate("/")} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {remainingSessions}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                of {user.points} monthly points
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sessions Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-900">
                {usedSessions}
              </div>
              <p className="text-sm text-gray-500 mt-2">this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 capitalize">
                {user.role}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {user.role === "student" ? "Free tier only" : "Can upgrade"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800">
            💡 Your points reset on the 1st of each month. Use them to request
            skill sessions!
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("/skills")}
          >
            <CardHeader>
              <CardTitle className="text-blue-600">Browse Skills</CardTitle>
              <CardDescription>
                Discover what others are offering and request sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Explore Marketplace →
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("/profile")}
          >
            <CardHeader>
              <CardTitle className="text-blue-600">Your Profile</CardTitle>
              <CardDescription>
                Add skills you can teach and manage your offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Manage Profile →
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center py-8">
                No recent sessions yet. Start exploring skills to get started!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
