import React, { useState } from "react";

import { Input } from "./Input";

export default { title: "Admin/Components/Input" };

const App = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2">{children}</div>;
};

export const input = () => {
  const label = "E-mail";
  const placeholder = "user@gmail.com";
  const [input, setInput] = useState("");
  return (
    <App>
      <Input
        label={label}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
        value={input}
      />
    </App>
  );
};

export const inputRequired = () => {
  const label = "E-mail";
  const placeholder = "user@gmail.com";
  const [input, setInput] = useState("");
  return (
    <App>
      <Input
        label={label}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
        value={input}
        required={true}
      />
    </App>
  );
};
