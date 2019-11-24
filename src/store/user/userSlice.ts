import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import jsonp from 'jsonp';
import { API_VERSION } from '../../consts';

export interface User {
    token: string;
    name: string;
}

const initialState: User = { token: '', name: '' };

export const fetchName = createAsyncThunk('user/fetchName', async (token: string) => {
    return new Promise<string>((resolve, reject) => {
        jsonp(
            `https://api.vk.com/method/account.getProfileInfo?&access_token=${token}&v=${API_VERSION}`,
            undefined,
            (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(`${data.response.first_name} ${data.response.last_name}`);
                }
            }
        );
    });
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchName.fulfilled, (state, action) => {
            state.name = action.payload;
        });
    },
});

export const { changeToken, changeName } = userSlice.actions;

export default userSlice.reducer;
