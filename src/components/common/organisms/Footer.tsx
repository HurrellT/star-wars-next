import GitHubIcon from "@/components/icons/GitHubIcon";
import PortfolioIcon from "@/components/icons/PortfolioIcon";
import { Button } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            © {new Date().getFullYear()} Made by Tomás Hurrell
          </div>
          <div className="flex gap-4">
            <Button
              as="a"
              href="https://github.com/hurrellT"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              startContent={<GitHubIcon />}
            >
              GitHub
            </Button>
            <Button
              as="a"
              href="https://hurrellt.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              startContent={<PortfolioIcon />}
            >
              Portfolio
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
