import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Checkbox, Button } from '@mui/material';
import { Todo } from '../types/';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect } from 'react';


export const FormComponent = ({ addTableData }: any) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isSubmitSuccessful }
    } = useForm<Todo>({
        defaultValues: {
            todo: '',
            category: '',
            completed: false,
            dueDate: null,
        },
    })

    const onSubmit: SubmitHandler<Todo> = (data) => {
        addTableData(data)
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful, reset])

    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container gap={2}>
                <Grid item xs={5} >
                    <TextField
                        fullWidth
                        {...register('todo', { required: true })}
                        label="Todo"
                        variant="outlined" />
                </Grid>

                <Grid item xs={5} >
                    <Controller
                        name="category"
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select label="Category" onChange={onChange} value={value} onBlur={onBlur}>
                                    <MenuItem value={"Deep Work"}>Deep Work</MenuItem>
                                    <MenuItem value={"Shallow Work"}>Shallow Work</MenuItem>
                                    <MenuItem value={"Learning"}>Learning</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item>
                    <Controller
                        control={control}
                        name="dueDate"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <DatePicker
                                label="Due Date"
                                format="DD/MM/YYYY"
                                value={value}
                                onChange={event => onChange(dayjs(event).format("YYYY-MM-DD"))}
                                slotProps={{ textField: { error: !!error, helperText: error?.message } }}
                            />
                        )}
                    />
                </Grid>

                <Grid item>
                    <Controller
                        control={control}
                        name="completed"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Checkbox onChange={onChange} checked={value} onBlur={onBlur} />
                        )}
                    />
                    <label>Completed</label>
                </Grid>

                <Grid item>
                    <Button variant="outlined" type="submit">Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}
