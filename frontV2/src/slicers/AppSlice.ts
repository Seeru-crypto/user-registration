import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import axios from "axios";
import {NEW_USER_URL, SECTOR_URL} from "../constants";
import {BACK_URL} from "../constants";


interface Sector{
    name: string
    id: number
    children: Sector[]
}

interface BaseUserState{
    age : number,
    agreeToTerms:boolean,
    allergyInfo:string,
    emailAddress:string,
    firstName:string
    foodPreference:string,
    id:number
    lastName:string
    phoneNumber: string
    seatNr:string
}

interface ExistingUserState extends BaseUserState{
    sectors:Sector[]
}

export interface FormattedExistingUsers extends BaseUserState{
    sector: {
        name: string,
        id: number
    }
}

interface AppState {
    currentStep: number;
    sectors: SectorProps[];
    errorMessage: string;
    loading: boolean;
    users: FormattedExistingUsers[]
    toastMessage: ToastMessage;
    navigateToLanding: boolean;
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
    return (await axios.get<ExistingUserState[]>(NEW_USER_URL)).data;
})

const initialState: AppState = {
    currentStep: 0,
    sectors: [],
    errorMessage: "",
    loading: false,
    users: [],
    toastMessage :initialToastMessage,
    navigateToLanding: false
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
        reverseNavigateToLanding : (state) => {
            state.navigateToLanding = !state.navigateToLanding;
        },
    }, extraReducers(builder) {
        builder
            .addCase(getSectors.fulfilled, (state, action) => {
                state.loading = false;
                state.sectors = action.payload;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                const res : FormattedExistingUsers[] = action.payload.map(user => {
                    // TODO: Fix back-end return value, so that this kind of looping is not neccesary
                    return {...user, sector: {
                        name: user.sectors[0].name,
                        id: user.sectors[0].id
                        }}
                })
                state.users = res;
            })
            .addMatcher(isPending(getSectors), state => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addMatcher(isRejected(getSectors), state => {
                state.loading = false;
                state.toastMessage = {
                    header: `Tekkis viga sektorite pärimisega ${BACK_URL}`,
                    variant: "error"
                }
            })
    },
});

export const {
    setCurrentStep,
    resetToastMessage,
    reverseNavigateToLanding
} = appSlice.actions;

export default appSlice.reducer;
