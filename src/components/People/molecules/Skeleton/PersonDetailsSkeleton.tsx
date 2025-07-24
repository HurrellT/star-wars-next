import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

const PersonDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <Skeleton className="w-24 h-8 rounded-lg mb-4" />
      </div>
      
      <Card className="w-full">
        <CardHeader className="pb-4">
          <Skeleton className="w-64 h-8 rounded-lg" />
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
            </div>
            <div className="space-y-3">
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <Skeleton className="w-32 h-6 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-24 h-8 rounded-lg" />
              <Skeleton className="w-24 h-8 rounded-lg" />
              <Skeleton className="w-24 h-8 rounded-lg" />
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <Skeleton className="w-32 h-6 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-24 h-8 rounded-lg" />
              <Skeleton className="w-24 h-8 rounded-lg" />
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <Skeleton className="w-32 h-6 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-24 h-8 rounded-lg" />
              <Skeleton className="w-24 h-8 rounded-lg" />
              <Skeleton className="w-24 h-8 rounded-lg" />
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <Skeleton className="w-32 h-6 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-24 h-8 rounded-lg" />
              <Skeleton className="w-24 h-8 rounded-lg" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonDetailsSkeleton;
