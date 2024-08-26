import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    const response = await fetch('https://66cc38f04290b1c4f19c618c.mockapi.io/crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const showUser = createAsyncThunk('showUser', async (_, { rejectWithValue }) => {
    const response = await fetch('https://66cc38f04290b1c4f19c618c.mockapi.io/crud');

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    const response = await fetch(`https://66cc38f04290b1c4f19c618c.mockapi.io/crud/${id}`, {
        method: 'DELETE',
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
    const response = await fetch(`https://66cc38f04290b1c4f19c618c.mockapi.io/crud/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const userDetails = createSlice({
    name: 'userDetails',
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: []
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(showUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(showUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(showUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
                state.users = state.users.filter(user => user.id !== id)
            }
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default userDetails.reducer

export const { searchUser } = userDetails.actions