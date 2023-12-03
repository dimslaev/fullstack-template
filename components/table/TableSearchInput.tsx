import React from "react";
import { useGlobalFilter } from "./Table";
import { useDebounce } from "react-use";
import { Input } from "@mui/joy";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
}: {
  value: string | number;
  onChange: (_value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  const [, cancel] = useDebounce(
    () => {
      onChange(value);
    },
    500,
    [value]
  );

  React.useEffect(() => {
    setValue(initialValue);
    return () => {
      cancel();
    };
  }, [initialValue]);

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default function TableSearchInput(
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">
) {
  const [globalFilter, setGlobalFilter] = useGlobalFilter();
  return (
    <DebouncedInput
      value={globalFilter ?? ""}
      onChange={(value) => setGlobalFilter(String(value))}
      placeholder="Search"
      type="search"
      {...props}
    />
  );
}
