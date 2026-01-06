export interface Route {
  path: string;
  component: React.ReactNode;
}

export interface UserData {
  name: string;
  email: string;
  role: string;
  points: number;
}

export interface SkillData {
  id: number;
  title: string;
  category: string;
  description: string;
}