import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Key } from 'react';

export interface NewsArticle {
  id: Key | null | undefined;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchNewsData = createAsyncThunk('news/fetchNewsData', async () => {
  const API_KEY = 'pub_778168082961803efb44e5984e895ca52ae09';
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&language=en`
  );
  const data = await response.json();

  return data.results.slice(0, 5).map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.link,
    publishedAt: article.pubDate,
    source: article.source_name,
  }));
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news data';
      });
  },
});

export default newsSlice.reducer;