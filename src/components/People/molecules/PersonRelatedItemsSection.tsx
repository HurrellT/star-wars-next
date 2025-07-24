import { Chip } from "@heroui/react";
import { extractIdFromUrl } from "@/utils/personUtils";

type RelatedItemsSectionProps = {
  title: string;
  items: string[];
  color: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
  prefix?: string;
};

const PersonRelatedItemsSection = ({ 
  title, 
  items, 
  color, 
  prefix = "ID" 
}: RelatedItemsSectionProps) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground-600">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((itemUrl) => (
          <Chip
            key={itemUrl}
            size="sm"
            variant="flat"
            color={color}
          >
            {prefix}: {extractIdFromUrl(itemUrl)}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default PersonRelatedItemsSection;
