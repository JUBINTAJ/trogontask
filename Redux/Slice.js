import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getsubject = createAsyncThunk(
  "Subjectdata/subject",
  async () => {
    try {
      const response = await axios.get("https://trogon.info/interview/php/api/subjects.php");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const Chapter = createAsyncThunk(
  "Chapterdata/Chapter",
  async (id) => {
    try {
      const response = await axios.get(`https://trogon.info/interview/php/api/modules.php?subject_id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const Videos = createAsyncThunk(
  "Videosdata/Videos",
async (id) => {
    try {
      const response = await axios.get(`https://trogon.info/interview/php/api/videos.php?module_id=${id}`);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const Slicedata = createSlice({
  name: "SubjectSlice",
  initialState: {
    subject: [],
    chapterById: [],
    video: [],
    videoById: [],
    loading: false,
    error: "",
    
  },
reducers:{
  setVideoById:(state,action)=>{
    state.videoById=action.payload
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(getsubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getsubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(getsubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(Chapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(Chapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapterById = action.payload;
      })
      .addCase(Chapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(Videos.pending, (state) => {
        state.loading = true;
      })
      .addCase(Videos.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(Videos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default Slicedata.reducer;
export const {setVideoById}=Slicedata.actions
