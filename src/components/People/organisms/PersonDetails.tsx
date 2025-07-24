"use client";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import PersonDetailItem from "@/components/People/atoms/PersonDetailItem";
import CapitalizedList from "@/components/common/atoms/CapitalizedList";
import PersonRelatedItemsSection from "@/components/People/molecules/PersonRelatedItemsSection";
import BackButton from "@/components/common/atoms/BackButton";
import { extractIdFromUrl, formatDate } from "@/utils/personUtils";
import { Person } from "@/services/people/peopleSchema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { personQueryOptions } from "@/services/people/people";

type PersonDetailsProps = {
  personId: string;
  initialData: Person;
};

const PersonDetails = ({ personId, initialData }: PersonDetailsProps) => {
  const { data: person } = useSuspenseQuery({
    ...personQueryOptions(personId),
    initialData,
  });
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BackButton />
      
      <Card className="w-full">
        <CardHeader className="pb-4">
          <h1 className="text-3xl font-bold text-foreground">{person.name}</h1>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <PersonDetailItem 
                label="Height" 
                value={person.height === "unknown" ? "Unknown" : `${person.height} cm`}
              />
              <PersonDetailItem 
                label="Mass" 
                value={person.mass === "unknown" ? "Unknown" : `${person.mass} kg`}
              />
              <PersonDetailItem 
                label="Hair Color" 
                value={<CapitalizedList value={person.hair_color} />}
              />
              <PersonDetailItem 
                label="Skin Color" 
                value={<CapitalizedList value={person.skin_color} />}
              />
              <PersonDetailItem 
                label="Eye Color" 
                value={<CapitalizedList value={person.eye_color} />}
              />
            </div>
            
            <div className="space-y-3">
              <PersonDetailItem 
                label="Birth Year" 
                value={person.birth_year}
              />
              <PersonDetailItem 
                label="Gender" 
                value={<CapitalizedList value={person.gender} />}
              />
              <PersonDetailItem 
                label="Homeworld" 
                value={
                  <Chip size="sm" variant="flat" color="primary">
                    ID: {extractIdFromUrl(person.homeworld)}
                  </Chip>
                }
              />
              <PersonDetailItem 
                label="Created" 
                value={formatDate(person.created)}
              />
              <PersonDetailItem 
                label="Last Edited" 
                value={formatDate(person.edited)}
              />
            </div>
          </div>
          
          <PersonRelatedItemsSection 
            title="Films"
            items={person.films}
            color="secondary"
            prefix="Film ID"
          />
          
          <PersonRelatedItemsSection 
            title="Species"
            items={person.species}
            color="success"
            prefix="Species ID"
          />
          
          <PersonRelatedItemsSection 
            title="Vehicles"
            items={person.vehicles}
            color="warning"
            prefix="Vehicle ID"
          />
          
          <PersonRelatedItemsSection 
            title="Starships"
            items={person.starships}
            color="danger"
            prefix="Starship ID"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonDetails;
