type CapitalizedListProps = {
  value: string;
  className?: string;
};

const CapitalizedText = ({ value, className = "capitalize" }: CapitalizedListProps) => {
  return (
    <span className={className}>
      {value}
    </span>
  );
};

export default CapitalizedText;
