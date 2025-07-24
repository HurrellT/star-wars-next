"use client";
import PersonCard from "@/components/People/molecules/PersonCard";
import { peopleQueryOptions } from "@/services/people/people";
import { Person } from "@/services/people/peopleSchema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "@heroui/react";

const PeopleList = () => {
  const { data } = useSuspenseQuery(peopleQueryOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedData.map((person: Person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            initialPage={1}
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
            showControls
          />
        </div>
      )}
    </div>
  );
};

export default PeopleList;
