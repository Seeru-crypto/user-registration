import {createSlice} from '@reduxjs/toolkit';

export interface UserPersonalDataForm {
    firstName: string,
    lastName: string,
    age: number | null,
    sector: string
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


const initialState: UserState = {

    firstName: "",
    lastName: "",
    age: 0,
    sector: "",
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
            console.log(action.payload)
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.age = action.payload.age;
            state.sector = action.payload.sector;
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
