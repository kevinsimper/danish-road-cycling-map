import React from "react";
import { Table } from "./Table";

export type Column<T> = {
  Header: React.ReactNode;
  accessor: keyof T;
  onClick?: () => void;
  Cell?: ({ value, row }: { value: T[keyof T]; row: T }) => React.ReactNode;
  Footer?:
    | "sum-numbers"
    | "show-count"
    | "show-header"
    | ((data: T[keyof T][]) => React.ReactNode);
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: (T & { className?: string })[];
  onClickRow?: (row: T) => void;
};

export function NewTable<T>({ columns, data, onClickRow }: TableProps<T>) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column, id) => {
            return (
              <th
                key={id}
                className="sticky top-0"
                onClick={() => column.onClick && column.onClick()}
                style={column.onClick && { cursor: "pointer" }}
              >
                {column.Header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, id) => {
          return (
            <tr
              key={id}
              className={row.className}
              onClick={() => onClickRow && onClickRow(row)}
              style={onClickRow && { cursor: "pointer" }}
            >
              {columns.map((column, id) => {
                return (
                  <td key={id}>
                    {column.Cell
                      ? column.Cell({
                          value: getProperty(row, column.accessor),
                          row,
                        })
                      : row[column.accessor]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      {columns.findIndex((column) => column.Footer) !== -1 && (
        <tfoot>
          <tr>
            {columns.map((column, id) => {
              const { Footer } = column;
              const relevantData = data.map((entry) =>
                getProperty(entry, column.accessor)
              );
              let value: React.ReactNode = "";
              if (typeof Footer === "function") {
                value = Footer(relevantData);
              } else if (Footer === "sum-numbers") {
                value = <>{relevantData.reduce((a, b) => +b + +a, 0)}</>;
              } else if (Footer === "show-count") {
                value = <>{data.length}</>;
              } else if (Footer === "show-header") {
                value = column.Header;
              }
              return (
                <th className="font-bold" key={id}>
                  {value}
                </th>
              );
            })}
          </tr>
        </tfoot>
      )}
    </Table>
  );
}

export type SortByState<T> = {
  column: keyof T | "";
  direction: "ASC" | "DESC";
};

export function sortString<T>(
  sortByState: SortByState<T>,
  a: string,
  b: string
): number {
  if (sortByState.direction === "ASC") return a.localeCompare(b);
  if (sortByState.direction === "DESC") return b.localeCompare(a);
  return 0;
}

export function sortNumber<T>(
  sortByState: SortByState<T>,
  a: number,
  b: number
): number {
  if (sortByState.direction === "ASC") return a - b;
  if (sortByState.direction === "DESC") return b - a;
  return 0;
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}

export function onClickSort<T>(
  sortByState: SortByState<T>,
  sortBySetter: (arg: SortByState<T>) => void,
  column: keyof T
) {
  if (sortByState.column !== column) {
    sortBySetter({ column: column, direction: "ASC" });
  } else if (
    sortByState.column === column &&
    sortByState.direction === "DESC"
  ) {
    sortBySetter({
      column: "",
      direction: "ASC",
    });
  } else {
    sortBySetter({
      column: column,
      direction: sortByState.direction === "ASC" ? "DESC" : "ASC",
    });
  }
}

export function showSortArrow<T>(
  sortByState: SortByState<T>,
  column: keyof T
): string {
  return sortByState.column === column
    ? sortByState.direction === "ASC"
      ? "↓"
      : "↑"
    : "";
}

export function genericSort<T>(
  sortByState: SortByState<T>,
  column: keyof T,
  items: T[]
): T[] {
  return items.sort((a, b) => {
    if (sortByState.column === "") return 0;
    const aVal = getProperty(a, column);
    const bVal = getProperty(b, column);
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortString(sortByState, aVal, bVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortNumber(sortByState, aVal, bVal);
    }
    if (typeof aVal === "number" && bVal === null) {
      return -1;
    }
    if (typeof bVal === "number" && aVal === null) {
      return 1;
    }
    return 0;
  });
}

export function generateColumn<T>(
  name: string,
  key: keyof T,
  sortBy: SortByState<T>,
  setSortBy: (arg: SortByState<T>) => void
): Column<T> {
  return {
    Header: `${name} ${showSortArrow(sortBy, key)}`,
    accessor: key,
    onClick: () => {
      onClickSort(sortBy, setSortBy, key);
    },
  };
}

export function columnGenerator<T>(
  sortBy: SortByState<T>,
  setSortBy: (arg: SortByState<T>) => void
) {
  return (name: string, key: keyof T) => {
    return generateColumn(name, key, sortBy, setSortBy);
  };
}
