import {createSlice} from '@reduxjs/toolkit';

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

export interface UserState extends UserPersonalDataForm, UserContactDataForm, UserMicDataForm{}

// TODO: create UserForm interface and created usersInterface

const initialState: UserState = {

    firstName: "",
    lastName: "",
    age: 0,
    sectorId: 0,
    phone: 0,
    email: "",
    seat: 0,
    food: "",
    allergies: "",
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
    },
});
export const {
    setContactData,setMiscData, setPersonalData
} = appSlice.actions;

export default appSlice.reducer;
