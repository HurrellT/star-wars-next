import PersonCardSkeleton from "./PersonCardSkeleton";

const PeopleListSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <PersonCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PeopleListSkeleton;
