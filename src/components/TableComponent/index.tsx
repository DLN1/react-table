import { useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef, type MaterialReactTableProps } from 'material-react-table';
import { Todo } from '../types';

interface TableComponentProps {
  todoData: Todo[],
  updateTableData: Function
}

export const TableComponent = ({ todoData, updateTableData }: TableComponentProps) => {
  const columns = useMemo<MRT_ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: 'todo',
        header: 'Todo',
        size: 250,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 100,
      },
      {
        accessorKey: 'dueDate', 
        header: 'Due Date',
        size: 100,
      },
      {
        accessorKey: 'completed',
        header: 'Completed',
        size: 100,
        Cell: ({ cell }) => {
          return <div>{cell.getValue<boolean>() ? "Completed" : "Not Completed"}</div>
        },
      },
    ],
[],
  );

const handleSaveRow: MaterialReactTableProps<Todo>['onEditingRowSave'] =
  async ({ exitEditingMode, row, values }) => {
    const { index } = row
    updateTableData(values, index);
    exitEditingMode();
  };

return <MaterialReactTable columns={columns} data={todoData} enableEditing onEditingRowSave={handleSaveRow} />;
}
