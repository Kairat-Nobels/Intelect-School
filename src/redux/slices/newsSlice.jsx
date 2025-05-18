import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsApi } from "../../api/api";

// Получить все новости
export const getNews = createAsyncThunk(
  "news/getNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(newsApi);
      if (response.status === 200) {
        return await response.json();
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создать новость
export const createNews = createAsyncThunk(
  "news/createNews",
  async (news, { rejectWithValue }) => {
    try {
      const response = await fetch(newsApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news)
      });
      if (response.status === 201) {
        return await response.json();
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Обновить новость
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, news }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${newsApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news)
      });
      if (response.status === 200) {
        return await response.json();
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удалить новость
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${newsApi}/${id}`, {
        method: "DELETE"
      });
      if (response.status === 200) {
        return id;
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "newsSlice",
  initialState: {
    news: [],
    loading: false,
    error: null,
    success: null,
    delLoading: false,
    delError: null,
    delMessage: null,
  },
  reducers: {
    clearNewsMessages(state) {
      state.error = null;
      state.success = null;
      state.delError = null;
      state.delMessage = null;
    }
  },
  extraReducers: builder => {
    // Получение новостей
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news = action.payload;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Создание новости
    builder.addCase(createNews.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(createNews.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Новость успешно добавлена";
      state.news.unshift(action.payload);
    });
    builder.addCase(createNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Обновление новости
    builder.addCase(updateNews.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(updateNews.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Новость успешно обновлена";
      state.news = state.news.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
    });
    builder.addCase(updateNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Удаление новости
    builder.addCase(deleteNews.pending, (state) => {
      state.delLoading = true;
      state.delError = null;
      state.delMessage = null;
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.delLoading = false;
      state.delMessage = "Новость успешно удалена";
      state.news = state.news.filter(item => item.id !== action.payload);
    });
    builder.addCase(deleteNews.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload || "Ошибка при удалении";
    });
  }
});

export const { clearNewsMessages } = newsSlice.actions;
export default newsSlice.reducer;