import { Sun } from "lucide-react";

interface SunIconProps {
  className?: string;
  size?: number;
}

const SunIcon = ({ className = "w-4 h-4", size }: SunIconProps) => {
  return <Sun className={className} size={size} />;
};

export default SunIcon;
