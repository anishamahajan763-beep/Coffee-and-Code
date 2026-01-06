import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillSwap</h1>
          <Button
            onClick={() => onNavigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Exchange Skills, Build Community
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with others to learn new skills and share your expertise. No
            money required - just your time and knowledge.
          </p>
          <Button
            onClick={() => onNavigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            Start Learning Today
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">
                🎯 Point-Based System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get 10 free points every month. Each session costs 1 point.
                Simple, fair, and accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">
                🤝 Direct Exchange
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect directly with skilled individuals. Request sessions,
                learn new skills, and share your expertise.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">📚 Diverse Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From coding to cooking, design to data science. Discover
                thousands of skills offered by our community.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of learners and experts already exchanging skills
          </p>
          <Button
            onClick={() => onNavigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </div>
  );
};
