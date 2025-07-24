import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

const CardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-6 w-full rounded-lg bg-secondary" />
      </Skeleton>
    </CardHeader>
    <CardBody className="space-y-3">
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-4 w-full rounded-lg bg-secondary-300" />
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-4 w-full rounded-lg bg-secondary-200" />
      </Skeleton>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-4 w-full rounded-lg bg-secondary-200" />
      </Skeleton>
    </CardBody>
  </Card>
);

export default CardSkeleton;
