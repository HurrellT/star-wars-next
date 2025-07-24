"use client";
import PersonCard from "@/components/People/molecules/PersonCard";
import { Person } from "@/services/people/peopleSchema";
import { useState, useEffect } from "react";
import { Input, Pagination } from "@heroui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { peopleQueryOptions } from "@/services/people/people";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

type PeopleListProps = {
  initialData: Person[];
};

const PeopleList = ({ initialData }: PeopleListProps) => {
  const { data: people } = useSuspenseQuery({
    ...peopleQueryOptions,
    initialData,
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const itemsPerPage = 16;

  // Filter people based on search query
  const filteredPeople = people.filter((person: Person) =>
    person.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredPeople.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-center">
        <Input
          placeholder="Search people..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Search className="w-4 h-4 text-default-400" />}
          className="max-w-md"
          isClearable
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedData.map((person: Person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </div>
      
      {paginatedData.length === 0 && debouncedSearchQuery && (
        <div className="text-center text-default-500 py-8">
          No people found matching &ldquo;{debouncedSearchQuery}&rdquo;
        </div>
      )}
      
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
