import React from "react";
import { flexRender } from "@tanstack/react-table";
import { useTable } from "./Table";
import { Sheet, Table, Box } from "@mui/joy";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export interface DbModel {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface TableContentProps {
  onClickRow?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onKeyDownOrUpRow?: (event: React.KeyboardEvent<HTMLTableRowElement>) => void;
}

export default function TableContent<T extends DbModel>({
  onClickRow: onClick,
  onKeyDownOrUpRow: onKeyDownOrUp,
}: TableContentProps) {
  const table = useTable<T>();
  return (
    <Sheet>
      <Table>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <Box display="flex" alignItems="center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    {header.column.getCanSort()
                      ? {
                          asc: <KeyboardArrowUpIcon />,
                          desc: <KeyboardArrowDownIcon />,
                        }[header.column.getIsSorted() as string] ?? (
                          <UnfoldMoreIcon />
                        )
                      : null}
                  </Box>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              role="button"
              tabIndex={0}
              data-id={row.original.id}
              onClick={onClick}
              onKeyDown={onKeyDownOrUp}
              onKeyUp={onKeyDownOrUp}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
