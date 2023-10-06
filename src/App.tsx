import { useState } from 'react';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { TableComponent, FormComponent } from './components/';
import { Todo } from './components/types';


function App() {
  const [todoData, setTodoData] = useState<Todo[]>([]);

  const addTableData = (newData: Todo) => {
    setTodoData((todoData) => [...todoData, newData])
  }

  const updateTableData = (values: Todo, index: number) => {
    setTodoData((todoData) => {
      const updatedTodoData = [...todoData];
      updatedTodoData[index] = values;
      return updatedTodoData;
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container>
        <Grid item margin={4} xs={12} lg={6}>
          <FormComponent addTableData={addTableData} />
        </Grid>
        <Grid item margin={4} xs={12} lg={6}>
          <TableComponent todoData={todoData} updateTableData={updateTableData} />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default App;
