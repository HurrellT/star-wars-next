"use client";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Person } from "@/services/people/peopleSchema";
import { useRouter } from "next/navigation";
import { extractIdFromUrl } from "@/utils/personUtils";

type PersonCardProps = {
  person: Person;
};

const PersonCard = ({ person }: PersonCardProps) => {
  const router = useRouter();
  const personId = extractIdFromUrl(person.url);

  const handleClick = () => {
    router.push(`/person/${personId}`);
  };

  return (
    <Card
      isPressable
      onPress={handleClick}
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{person.name}</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </CardHeader>
      <CardBody className="pt-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[60px]">Height:</span>
            <span className="text-sm font-semibold">{person.height} cm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[60px]">Weight:</span>
            <span className="text-sm font-semibold">{person.mass} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[60px]">Gender:</span>
            <span className="text-sm font-semibold capitalize">
              {person.gender}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PersonCard;
