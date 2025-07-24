import { Moon } from "lucide-react";

interface MoonIconProps {
  className?: string;
  size?: number;
}

const MoonIcon = ({ className = "w-4 h-4", size }: MoonIconProps) => {
  return <Moon className={className} size={size} />;
};

export default MoonIcon;
