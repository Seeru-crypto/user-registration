import {createSlice} from '@reduxjs/toolkit';
import {initialToastMessage, ToastMessage} from "./AppSlice";

export interface UserPersonalDataForm {
    firstName: string,
    lastName: string,
    age: number | null,
    sectorId: number
}
export interface UserContactDataForm {
    phone: number | null;
    email: string;
}

export interface UserMicDataForm {
    seat: number | null;
    food: string;
    allergies: string;
}

export interface UserFormState extends UserPersonalDataForm, UserContactDataForm, UserMicDataForm{
    toastMessage : ToastMessage;
}

// TODO: create UserForm interface and created usersInterface

const initialState: UserFormState = {
    firstName: "",
    lastName: "",
    age: 0,
    sectorId: 0,
    phone: 0,
    email: "",
    seat: 0,
    food: "",
    allergies: "",
    toastMessage: initialToastMessage
};

export const appSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPersonalData: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.age = action.payload.age;
            state.sectorId = action.payload.sectorId;
        },
        setContactData: (state, action) => {
            state.phone = action.payload.phone;
            state.email = action.payload.email;
        },
        setMiscData: (state, action) => {
            state.seat = action.payload.seat;
            state.food = action.payload.food;
            state.allergies = action.payload.allergies;
        },
        resetToastMessage: (state) => {
            state.toastMessage = initialToastMessage;
        },
    },
});
export const {
    setContactData,setMiscData, setPersonalData, resetToastMessage
} = appSlice.actions;

export default appSlice.reducer;
