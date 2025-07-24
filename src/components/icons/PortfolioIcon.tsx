import { Briefcase } from "lucide-react";

interface PortfolioIconProps {
  className?: string;
  size?: number;
}

const PortfolioIcon = ({ className = "text-foreground", size = 20 }: PortfolioIconProps) => {
  return <Briefcase className={className} size={size} />;
};

export default PortfolioIcon;
