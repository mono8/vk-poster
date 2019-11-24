import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import jsonp from 'jsonp';
import { RootState } from '..';
import { API_VERSION } from '../../consts';
import { sleep } from '../../utils';

export type GroupType = {
    photo_50: string;
    can_post: 0 | 1;
    checked: boolean;
    id: number;
    name: string;
    type: 'page' | 'group';
    screen_name: string;
    status: 'failed' | 'success' | 'none';
};

export type GroupsType = GroupType[];

const initialState: GroupsType = [];

export const fetchGroups = createAsyncThunk('groups/fetchGroups', (token: string) => {
    return new Promise<GroupsType>((resolve, reject) => {
        jsonp(
            `https://api.vk.com/method/groups.get?fields=can_post&count&extended=1&access_token=${token}&v=${API_VERSION}`,
            undefined,
            (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    const groups: GroupsType = data.response.items.map((group: GroupType) => ({
                        ...group,
                        checked: false,
                        status: 'none',
                    }));
                    resolve(groups);
                }
            }
        );
    });
});

export const sendMessage = createAsyncThunk(
    'status/sendMessage',
    async ({
        group,
        message,
        photoUrl,
        token,
    }: {
        group: GroupType;
        message: string;
        photoUrl: string;
        token: string;
    }) => {
        return new Promise<GroupType['id']>((resolve, reject) => {
            jsonp(
                `https://api.vk.com/method/wall.post?owner_id=-${group.id}&message=${message}&attachments=${photoUrl}&access_token=${token}&v=${API_VERSION}`,
                undefined,
                (err, data) => {
                    if (err) {
                        console.error(`group ${group.id} ` + err.message);
                        reject(group.id);
                    } else {
                        resolve(group.id);
                    }
                }
            );
        });
    }
);

const SLEEP_TIMEOUT = 500;

export const sendMessagesToAllGroups = createAsyncThunk(
    'groups/sendMessagesToAllGroups',
    async (
        { message, photoUrl }: { message: string; photoUrl: string },
        { getState, dispatch }
    ) => {
        const state = getState() as RootState;
        const checkedGroups = state.groups.filter((group) => group.checked);
        const token = state.user.token;

        for (const group of checkedGroups) {
            await dispatch(sendMessage({ group, message, photoUrl, token }));
            await sleep(SLEEP_TIMEOUT);
        }
    }
);

export const groups = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<GroupsType>) => {
            return action.payload;
        },
        toggleGroup: (state, action: PayloadAction<GroupType['id']>) => {
            const group = state.find((group) => group.id === action.payload);

            if (group) {
                group.checked = !group.checked;
            }
        },
        checkAllGroups: (state) => {
            return state.map((group) => ({ ...group, checked: true }));
        },
        uncheckAllGroups: (state) => {
            return state.map((group) => ({ ...group, checked: false }));
        },
        setGroupStatus: (
            state,
            action: PayloadAction<{ id: GroupType['id']; status: GroupType['status'] }>
        ) => {
            const group = state.find((group) => group.id === action.payload.id);

            if (group) {
                group.status = action.payload.status;
            }
        },
        resetAllGroupsStatuses: (state) => {
            return state.map((group) => ({ ...group, status: 'none' }));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroups.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                const group = state.find((group) => group.id === action.payload);
                if (group) {
                    group.status = 'success';
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                const group = state.find((group) => group.id === action.payload);
                if (group) {
                    group.status = 'failed';
                }
            });
    },
});

export const { toggleGroup, checkAllGroups, uncheckAllGroups, setGroups, resetAllGroupsStatuses } =
    groups.actions;

export default groups.reducer;
