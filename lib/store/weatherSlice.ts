import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ReactNode } from 'react';

export interface WeatherState {
  cities: {
    [key: string]: {
      description: ReactNode;
      temperature: number;
      humidity: number;
      conditions: string;
      loading: boolean;
      error: string | null;
    };
  };
}

const initialState: WeatherState = {
  cities: {
    'New York': { description: '', temperature: 9, humidity: 50, conditions: 'cloudy', loading: false, error: null },
    'London': { description: '', temperature: 7, humidity: 60, conditions: 'cloudy', loading: false, error: null },
    'Tokyo': { description: '', temperature: 10, humidity: 54, conditions: 'cloudy', loading: false, error: null },
  },
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string) => {
    const apiKey = '448ecdb80beb2fde5cd58b7eb6046b94';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    return {
      city,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      conditions: response.data.weather[0].description,
      description: response.data.weather[0].description,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        const city = action.meta.arg;
        state.cities[city].loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { city, temperature, humidity, conditions, description } = action.payload;
        state.cities[city] = { description, temperature, humidity, conditions, loading: false, error: null };
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        const city = action.meta.arg;
        state.cities[city].loading = false;
        state.cities[city].error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer;