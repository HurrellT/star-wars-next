import { Card, CardBody, CardHeader } from "@heroui/react";
import { Person } from "@/services/people/peopleSchema";

type PersonCardProps = {
  person: Person;
};

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <Card>
      <CardHeader>{person.name}</CardHeader>
      <CardBody>
        <p>Height: {person.height}</p>
        <p>Weight: {person.mass}</p>
        <p>Gender: {person.gender}</p>
      </CardBody>
    </Card>
  );
}
