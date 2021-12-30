import React, { useState } from "react";
import { matchSorter } from "match-sorter";
import { Input } from "./Input";
import {
  genericSort,
  NewTable,
  onClickSort,
  showSortArrow,
  SortByState,
  Column,
} from "./SortingTable";

export default { title: "Admin/Components/Sorting Table" };

type EmployeePage = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  expenses: number;
};

const employees: EmployeePage[] = [
  {
    id: 1,
    email: "kevin@mail.com",
    firstName: "Kevin",
    lastName: "Simper",
    expenses: 150,
  },
  {
    id: 2,
    email: "abdallah@mail.com",
    firstName: "Abdallah",
    lastName: "Abedraba",
    expenses: 75,
  },
  {
    id: 3,
    email: "rasmus@mail.com",
    firstName: "Rasmus",
    lastName: "Østergaard",
    expenses: 100,
  },
];

export const SortingTableWithFilter = () => {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortByState<EmployeePage>>({
    column: "",
    direction: "ASC",
  });

  const columnsEmployee: Column<EmployeePage>[] = [
    {
      Header: `# ${showSortArrow(sortBy, "id")}`,
      accessor: "id",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "id");
      },
    },
    {
      Header: `Email ${showSortArrow(sortBy, "email")}`,
      accessor: "email",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "email");
      },
    },
    {
      Header: `First name ${showSortArrow(sortBy, "firstName")}`,
      accessor: "firstName",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "firstName");
      },
    },
    {
      Header: `Last name ${showSortArrow(sortBy, "lastName")}`,
      accessor: "lastName",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "lastName");
      },
    },
  ];

  const filtered: EmployeePage[] =
    filter !== ""
      ? matchSorter(employees, filter, {
          keys: columnsEmployee.map((col) => col.accessor),
        })
      : employees;

  const sorted =
    sortBy.column !== ""
      ? genericSort<EmployeePage>(sortBy, sortBy.column, filtered)
      : filtered;

  return (
    <>
      <div className="flex-1 p-2" style={{ maxWidth: 300 }}>
        <Input
          label="Filter:"
          type="text"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <NewTable columns={columnsEmployee} data={sorted} />
    </>
  );
};

export const SortingTableWithFilterAndFooter = () => {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortByState<EmployeePage>>({
    column: "",
    direction: "ASC",
  });

  const columnsEmployee: Column<EmployeePage>[] = [
    {
      Header: `# ${showSortArrow(sortBy, "id")}`,
      accessor: "id",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "id");
      },
      Footer: "show-header",
    },
    {
      Header: `Email ${showSortArrow(sortBy, "email")}`,
      accessor: "email",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "email");
      },
      Footer: "show-header",
    },
    {
      Header: `First name ${showSortArrow(sortBy, "firstName")}`,
      accessor: "firstName",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "firstName");
      },
      Footer: "show-header",
    },
    {
      Header: `Last name ${showSortArrow(sortBy, "lastName")}`,
      accessor: "lastName",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "lastName");
      },
      Footer: "show-header",
    },
    {
      Header: `Expenses ${showSortArrow(sortBy, "expenses")}`,
      accessor: "expenses",
      onClick: () => {
        onClickSort(sortBy, setSortBy, "expenses");
      },
      Footer: "sum-numbers",
    },
  ];

  const filtered: EmployeePage[] =
    filter !== ""
      ? matchSorter(employees, filter, {
          keys: columnsEmployee.map((col) => col.accessor),
        })
      : employees;

  const sorted =
    sortBy.column !== ""
      ? genericSort<EmployeePage>(sortBy, sortBy.column, filtered)
      : filtered;

  return (
    <>
      <div className="flex-1 p-2" style={{ maxWidth: 300 }}>
        <Input
          label="Filter:"
          type="text"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <NewTable columns={columnsEmployee} data={sorted} />
    </>
  );
};
