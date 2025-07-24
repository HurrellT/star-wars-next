import { Github } from "lucide-react";

interface GitHubIconProps {
  className?: string;
  size?: number;
}

const GitHubIcon = ({ className = "text-foreground", size = 20 }: GitHubIconProps) => {
  return <Github className={className} size={size} />;
};

export default GitHubIcon;
