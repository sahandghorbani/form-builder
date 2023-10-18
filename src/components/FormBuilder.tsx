'use client'
import React from 'react';
import { Button, Container, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Stack } from '@mui/system';
import {addInputField, resetInputFields, setInputFieldsOrder} from '@/redux/slices/formSlice';
import { useAppDispatch, useAppSelector } from '@/redux';

const inputTypes = ['text', 'email', 'select'];

const FormGeneratorUI: React.FC = () => {
    const dispatch = useAppDispatch();
    const inputFields = useAppSelector((state) => state.form.inputFields);
    const { control, handleSubmit, reset } = useForm();

    const handleAddInputField = (type: string) => {
        let label = '';
        dispatch(addInputField({ type, label }));
    };

    const handleReset = () => {
        dispatch(resetInputFields());
        reset();
    };

    const onSubmit = (data: any) => {
        // console.log(data);
    };

    function handleOnDragEnd(result:any) {
        if (!result.destination) {
            return; // Dragged outside the list, do nothing
        }

        const items = Array.from(inputFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update the input fields order in the state
        // This assumes that your inputFields have a unique 'id' property
        // You might need to update this logic based on your data structure
        dispatch(setInputFieldsOrder(items));
    }

    return (
        <Container>
            <h2>Form Generator</h2>
            <div>
                <Stack sx={{ pb: 2 }}>
                    <Select>
                        {inputTypes.map((type) => (
                            <MenuItem key={type} onClick={() => handleAddInputField(type)}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={handleReset}>
                        Reset
                    </Button>
                </Stack>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable ignoreContainerClipping={true} direction={'horizontal'} droppableId="inputs">
                        {(provided) => (
                            <Grid container  spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                                {inputFields.map((field, index) => (
                                    <Draggable  key={field.id} draggableId={field.id.toString()} index={index}>
                                        {(provided) => (
                                            <Grid item xs={4} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                {field.type === 'text' && (
                                                    <Controller
                                                        name={`textFields[${index}]`}
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => <TextField {...field} label="Text" />}
                                                    />
                                                )}
                                                {field.type === 'email' && (
                                                    <Controller
                                                        name={`emailFields[${index}]`}
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => <TextField type="email" {...field} label="Email" />}
                                                    />
                                                )}
                                                {field.type === 'select' && (
                                                    <div>
                                                        <label>{field.label}</label>
                                                        <Controller
                                                            name={`selectFields[${index}]`}
                                                            control={control}
                                                            defaultValue=""
                                                            render={({ field }) => (
                                                                <Select {...field}>
                                                                    {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                                                                        <MenuItem key={option} value={option}>
                                                                            {option}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                            </Grid>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Submit
                </Button>
            </div>
        </Container>
    );
};

export default FormGeneratorUI;
