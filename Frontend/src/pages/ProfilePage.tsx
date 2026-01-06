import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UserData, SkillData } from "@/types";

interface ProfilePageProps {
  user: UserData;
  onNavigate: (path: string) => void;
}

export const ProfilePage = ({ user, onNavigate }: ProfilePageProps) => {
  const [skills, setSkills] = useState<SkillData[]>([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      category: "Programming",
      description: "Learn the basics of JavaScript",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleAddSkill = () => {
    setSkills([...skills, { ...newSkill, id: Date.now() }]);
    setNewSkill({ title: "", category: "", description: "" });
    setIsAdding(false);
  };

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
          <Button
            onClick={() => onNavigate("/dashboard")}
            variant="outline"
            size="sm"
          >
            Dashboard
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h2>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={user.role}
                className="w-full px-3 py-2 border border-gray-300 rounded-md capitalize"
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Your Skills</h3>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            + Add Skill
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddSkill();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Title
                  </label>
                  <input
                    type="text"
                    value={newSkill.title}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newSkill.category}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newSkill.description}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Skill
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <CardDescription>{skill.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
