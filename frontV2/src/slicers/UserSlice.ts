import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import {getUsers, initialToastMessage, ToastMessage} from "./AppSlice";
import axios from "axios";
import {NEW_USER_URL} from "../constants";

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
    loading: boolean
}

export const deleteUser = createAsyncThunk('delete_user', async (userId: number, thunkAPI) => {
    const finalUrl = `${NEW_USER_URL}/${userId}`
    const res = await axios.delete<number>(finalUrl)
    thunkAPI.dispatch(getUsers());
    return res.data;
})


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
    toastMessage: initialToastMessage,
    loading: false
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
        resetUserFormState: () => initialState
    },extraReducers(builder) {
        builder
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.toastMessage = {
                    header : "Kasutaja edukalt kustutatud",
                    variant: "success",
                }
            })
            .addMatcher(isPending(deleteUser), state => {
                state.loading = true;
            })
            .addMatcher(isRejected(deleteUser), state => {
                state.toastMessage = {
                    header: "Tekkis viga päringuga",
                    variant: "error"
                }
            })
    },
});
export const {
    setContactData,setMiscData, setPersonalData, resetToastMessage,resetUserFormState
} = appSlice.actions;

export default appSlice.reducer;
