import React from "react";
import { Table } from "./Table";

export default { title: "Admin/Components/Simple Table" };

export const SimpleTable = () => (
  <Table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Number</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>3</td>
        <td>4</td>
      </tr>
    </tbody>
  </Table>
);
