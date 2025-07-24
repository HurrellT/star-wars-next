type PersonDetailItemProps = {
  label: string;
  value: string | React.ReactNode;
  className?: string;
};

const PersonDetailItem = ({ label, value, className = "" }: PersonDetailItemProps) => {
  return (
    <div className={className}>
      <span className="font-semibold text-foreground-600">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  );
};

export default PersonDetailItem;
