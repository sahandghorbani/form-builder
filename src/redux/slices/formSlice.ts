import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputField {
    type: string;
    label: string;
    id?: number;
    // Add more properties as needed (e.g., validation rules, options for select inputs, etc.)
}

interface FormGeneratorState {
    inputFields: InputField[];
}

const initialState: FormGeneratorState = {
    inputFields: [],
};

const formGeneratorSlice = createSlice({
    name: 'formGenerator',
    initialState,
    reducers: {
        addInputField: (state, action: PayloadAction<InputField>) => {
            state.inputFields.push({ ...action.payload, id: Math.random() });
        },
        resetInputFields: (state) => {
            state.inputFields = [];
        },
        setInputFieldsOrder: (state, action: PayloadAction<InputField[]>) => {
            // Update the input fields order based on the action payload
            state.inputFields = action.payload;
        },
    },
});

export const { addInputField, resetInputFields, setInputFieldsOrder } = formGeneratorSlice.actions;
export const selectInputFields = (state: { formGenerator: FormGeneratorState }) => state.formGenerator.inputFields;
export default formGeneratorSlice.reducer;
