import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UserData } from "@/types";

interface SkillsMarketplaceProps {
  user: UserData;
  onNavigate: (path: string) => void;
}

interface Skill {
  id: number;
  title: string;
  provider: string;
  category: string;
  rating: number;
}

export const SkillsMarketplace = ({
  user,
  onNavigate,
}: SkillsMarketplaceProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockSkills: Skill[] = [
    {
      id: 1,
      title: "Web Development with React",
      provider: "Sarah Johnson",
      category: "Programming",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Digital Marketing Basics",
      provider: "Mike Chen",
      category: "Marketing",
      rating: 4.6,
    },
    {
      id: 3,
      title: "Graphic Design with Figma",
      provider: "Emma Davis",
      category: "Design",
      rating: 4.9,
    },
    {
      id: 4,
      title: "Data Analysis with Python",
      provider: "Alex Kumar",
      category: "Data Science",
      rating: 4.7,
    },
    {
      id: 5,
      title: "Public Speaking & Presentation",
      provider: "Lisa Wong",
      category: "Soft Skills",
      rating: 4.5,
    },
    {
      id: 6,
      title: "Photography Fundamentals",
      provider: "Tom Anderson",
      category: "Creative",
      rating: 4.8,
    },
  ];

  const filteredSkills = mockSkills.filter(
    (skill) =>
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => onNavigate("/dashboard")}
          >
            SkillSwap
          </h1>
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {user.points - 3} points
            </span>
            <Button
              onClick={() => onNavigate("/dashboard")}
              variant="outline"
              size="sm"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Skills Marketplace
          </h2>
          <input
            type="text"
            placeholder="Search skills or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                  <span className="text-yellow-500">★ {skill.rating}</span>
                </div>
                <CardDescription>by {skill.provider}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-4">
                  {skill.category}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    1 point per session
                  </span>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                      alert(`Requesting session for: ${skill.title}`)
                    }
                  >
                    Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                No skills found matching your search.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
