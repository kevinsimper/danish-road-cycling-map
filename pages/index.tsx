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

function regionText(text: string): string {
  switch (text) {
    case "east":
      return "Sjælland";
    case "west":
      return "Jylland";
    default:
      return "";
  }
}

export default function Home() {
  const [filter, setFilter] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
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
    {
      Header: `Region`,
      accessor: "DcuRegion",
      Cell: ({ value }) => {
        if (typeof value !== "string") return "";
        return regionText(value);
      },
    },
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

  const filteredType: Event[] =
    type !== ""
      ? filtered.filter((event) => event.EventTypeName === type)
      : filtered;

  const filteredRegion: Event[] =
    region !== ""
      ? filteredType.filter((event) => event.DcuRegion === region)
      : filteredType;

  const sorted =
    sortBy.column !== ""
      ? genericSort<Event>(sortBy, sortBy.column, filteredRegion)
      : filteredRegion;

  return (
    <div>
      <div className="container mx-auto p-4 lg:py-12 flex flex-col lg:flex-row justify-between">
        <div>
          <h1 className="text-3xl mb-4">Danske License Cykelløb</h1>
        </div>
        <div className="mb-4 flex-1" style={{ maxWidth: 500 }}>
          <div>
            <Input
              label="Søg:"
              type="text"
              value={filter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFilter(e.target.value);
              }}
            />
          </div>
          <div className="flex space-x-2 py-2">
            <div>
              <label className="font-bold">Vælg region:</label>
              <select
                className="block border p-2"
                value={region}
                onChange={(event) => {
                  setRegion(event.target.value);
                }}
              >
                <option value=""></option>
                <option value="east">Sjælland</option>
                <option value="west">Jylland</option>
              </select>
            </div>
            <div>
              <label className="font-bold">Vælg Type:</label>
              <select
                className="block border p-2"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option value=""></option>
                <option>Cyklecross</option>
                <option>Kursus</option>
                <option>MTB</option>
                <option>Landevejscykling</option>
                <option>Banecykling</option>
              </select>
            </div>
          </div>
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
                  {event.DcuRegion ? regionText(event.DcuRegion) : ""} -{" "}
                  {event.EventTypeName}
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
