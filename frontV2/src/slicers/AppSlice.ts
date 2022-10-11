import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import axios from "axios";
import {UserState} from "./UserSlice";

const SECTOR_URL = "sectors"
const NEW_USER_URL = "accounts";


interface AppState {
    currentStep: number;
    sectors: SectorProps[];
    errorMessage: string;
    loading: boolean;
    users: UserState[]
}
export interface SectorProps {
    id: number,
    name: string,
    children: SectorProps[] | undefined
}

export const getSectors = createAsyncThunk('get_sectors', async () => {
    return (await axios.get<SectorProps[]>(SECTOR_URL)).data;
})

export const getUsers = createAsyncThunk('get_users', async () => {
    return (await axios.get<UserState[]>(NEW_USER_URL)).data;
})

// export const getUserById = createAsyncThunk('get_user_by_id', async (id: number) => {
//     return (await axios.get<SectorProps[]>(SECTOR_URL)).data;
// })

export const saveSector = createAsyncThunk('save_sector', async (userData: UserState, thunkAPI) => {
    const res = await axios.post<number>(NEW_USER_URL, userData)
    thunkAPI.dispatch(getUsers());
    // thunkAPI.dispatch(getUserById(res.data))
    return res;
})

const initialState: AppState = {
    currentStep: 0,
    sectors: [],
    errorMessage: "",
    loading: false,
    users: []
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
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
            .addMatcher(isPending(getSectors), state => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addMatcher(isRejected(getSectors), state => {
                console.log("HaHa, you nerd!")
                state.errorMessage = "HaHa, you nerd!"
            })
    },
});
export const {
    setCurrentStep,
} = appSlice.actions;

export default appSlice.reducer;
