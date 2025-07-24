type CapitalizedListProps = {
  value: string;
  className?: string;
};

const CapitalizedList = ({ value, className = "capitalize" }: CapitalizedListProps) => {
  return (
    <span className={className}>
      {value.replace(/,/g, ', ')}
    </span>
  );
};

export default CapitalizedList;
