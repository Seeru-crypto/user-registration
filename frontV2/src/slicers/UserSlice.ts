import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import {getUsers, initialToastMessage, ToastMessage} from "./AppSlice";
import axios from "axios";
import {NEW_USER_URL} from "../constants";

export interface UserPersonalDataForm {
    firstName: string,
    lastName: string,
    age: number | null,
    sectorId?: number
}
export interface UserContactDataForm {
    phoneNumber: number | null;
    emailAddress: string;
}

export interface UserMicDataForm {
    seatNr: number | null;
    foodPreference: string;
    allergyInfo: string;
    agreeToTerms?: boolean;
}

export interface UserDtoProps extends UserPersonalDataForm, UserContactDataForm, UserMicDataForm{
    sectors?:{}[]
}

export interface UserFormState extends UserPersonalDataForm, UserContactDataForm, UserMicDataForm{
    toastMessage : ToastMessage;
    loading: boolean;
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
    phoneNumber: 0,
    emailAddress: "",
    seatNr: 0,
    foodPreference: "",
    allergyInfo: "",
    toastMessage: initialToastMessage,
    loading: false,
    agreeToTerms: true
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
            state.phoneNumber = action.payload.phoneNumber;
            state.emailAddress = action.payload.emailAddress;
        },
        setMiscData: (state, action) => {
            state.seatNr = action.payload.seatNr;
            state.foodPreference = action.payload.foodPreference;
            state.allergyInfo = action.payload.allergyInfo;
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
