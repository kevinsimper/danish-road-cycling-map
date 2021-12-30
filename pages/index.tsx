import React, { useState } from "react";
import { matchSorter } from "match-sorter";
import data from "../data/raw";
import {
  columnGenerator,
  genericSort,
  NewTable,
  onClickSort,
  showSortArrow,
  SortByState,
  Column,
} from "../components/SortingTable";
import { Input } from "../components/Input";

type Event = {
  EventId: number; // 10103,
  Name: string; //'RENT LIV Løbet Skive 2022 UCI ME 1.2',
  date: number; // '2022-08-28',
  EventTypeName: string; // 'Landevejscykling',
  Location: string | null; // 'Vesthimmerlands Cykle Klub',
  DcuRegion: string | null; // 'west',
};

export default function Home() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortByState<Event>>({
    column: "date",
    direction: "ASC",
  });

  const col = columnGenerator(sortBy, setSortBy);

  const columnsUsers: Column<Event>[] = [
    col("Navn", "Name"),
    {
      Header: `Dato ${showSortArrow(sortBy, "date")}`,
      accessor: "date",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "date");
      },
      Cell: ({ value }) => {
        if (typeof value !== "number") return "";
        return (
          <div className="whitespace-nowrap">
            {new Date(value).toISOString().split("T")[0]}
          </div>
        );
      },
    },
    col("Type", "EventTypeName"),
    col("Lokation", "Location"),
    col("Region", "DcuRegion"),
    {
      Header: `Action`,
      accessor: "EventId",
      Cell: ({ value }) => {
        if (typeof value !== "number") return "";
        return (
          <a
            target="_blank"
            className="bg-blue-500 hover:bg-blue-700 border-blue-700 text-white py-2 px-4 border rounded"
            href={`https://www.sportstiming.dk/event/${value}`}
          >
            Vis
          </a>
        );
      },
    },
  ];

  const filtered: Event[] =
    filter !== ""
      ? matchSorter(data, filter, {
          keys: columnsUsers.map((col) => col.accessor),
        })
      : data;

  const sorted =
    sortBy.column !== ""
      ? genericSort<Event>(sortBy, sortBy.column, filtered)
      : filtered;

  return (
    <div>
      <div className="container mx-auto p-4 lg:py-12 flex flex-col lg:flex-row justify-between">
        <div>
          <h1 className="text-3xl mb-4">Danske License Cykelløb</h1>
        </div>
        <div className="mb-4 flex-1" style={{ maxWidth: 500 }}>
          <Input
            label="Søg:"
            type="text"
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFilter(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <NewTable columns={columnsUsers} data={sorted} />
      </div>
      <div className="block lg:hidden">
        {sorted.map((event) => {
          return (
            <div className="p-2 flex space-x-4 justify-between content-center shadow">
              <div>
                <div>
                  {typeof event.date !== "number"
                    ? ""
                    : new Date(event.date).toISOString().split("T")[0]}
                </div>
                <h3 className="text-lg">{event.Name}</h3>
                <div>
                  {event.DcuRegion} - {event.EventTypeName}
                </div>
                <div>{event.Location}</div>
              </div>
              <div className="flex flex-col justify-center">
                <a
                  target="_blank"
                  className="block bg-blue-500 hover:bg-blue-700 border-blue-700 text-white py-2 px-4 border rounded"
                  href={`https://www.sportstiming.dk/event/${event.EventId}`}
                >
                  Vis
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
