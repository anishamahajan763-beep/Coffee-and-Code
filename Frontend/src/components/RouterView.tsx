import type { Route } from '@/types';

interface RouterViewProps {
  routes: Route[];
  currentPath: string;
}

export const RouterView = ({ routes, currentPath }: RouterViewProps) => {
  const route = routes.find((r) => r.path === currentPath);
  return route ? route.component : <div>404 Not Found</div>;
};
