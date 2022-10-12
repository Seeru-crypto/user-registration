import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import axios from "axios";
import {UserState} from "./UserSlice";
import {NEW_USER_URL, SECTOR_URL} from "../constants";

interface AppState {
    currentStep: number;
    sectors: SectorProps[];
    errorMessage: string;
    loading: boolean;
    // TODO: Create loading spinner
    users: UserState[]
    toastMessage : ToastMessage
}

export interface ToastMessage {
    header : string,
    variant: "success" | "error"
}

export const initialToastMessage : ToastMessage = {
    header : "",
    variant : "success"
}

export interface SectorProps {
    id: number,
    name: string,
    children: SectorProps[]
}

export const getSectors = createAsyncThunk('get_sectors', async () => {
    return (await axios.get<SectorProps[]>(SECTOR_URL)).data;
})

export const getUsers = createAsyncThunk('get_users', async () => {
    return (await axios.get<UserState[]>(NEW_USER_URL)).data;
})

export const saveUser = createAsyncThunk('save_user', async (userData: UserState, thunkAPI) => {
    const res = await axios.post<number>(NEW_USER_URL, {...userData, agreeToTerms: true})
    thunkAPI.dispatch(getUsers());
    return res.data;
})

const initialState: AppState = {
    currentStep: 0,
    sectors: [],
    errorMessage: "",
    loading: false,
    users: [],
    toastMessage :initialToastMessage
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        resetToastMessage : (state) => {
            state.toastMessage = initialToastMessage;
        },
    }, extraReducers(builder) {
        builder
            .addCase(getSectors.fulfilled, (state, action) => {
                state.loading = false;
                state.sectors = action.payload;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.loading = false;
                state.toastMessage = {
                    header: "kasutaja edukalt salvestatud",
                    variant: "success"
                }
            })
            .addMatcher(isPending(getSectors), state => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addMatcher(isRejected(getSectors), state => {
                state.toastMessage = {
                    header: "Tekkis viga sektorite pärimisega",
                    variant: "error"
                }
            })
    },
});

export const {
    setCurrentStep,
    resetToastMessage
} = appSlice.actions;

export default appSlice.reducer;
