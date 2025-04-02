import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  favoriteCities: string[];
  favoriteCryptos: string[];
}

const initialState: PreferencesState = {
  favoriteCities: ['New York', 'London', 'Tokyo'],
  favoriteCryptos: ['bitcoin', 'ethereum', 'cardano'],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    addFavoriteCity: (state, action: PayloadAction<string>) => {
      if (!state.favoriteCities.includes(action.payload)) {
        state.favoriteCities.push(action.payload);
      }
    },
    removeFavoriteCity: (state, action: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city !== action.payload
      );
    },
    addFavoriteCrypto: (state, action: PayloadAction<string>) => {
      if (!state.favoriteCryptos.includes(action.payload)) {
        state.favoriteCryptos.push(action.payload);
      }
    },
    removeFavoriteCrypto: (state, action: PayloadAction<string>) => {
      state.favoriteCryptos = state.favoriteCryptos.filter(
        (crypto) => crypto !== action.payload
      );
    },
  },
});

export const {
  addFavoriteCity,
  removeFavoriteCity,
  addFavoriteCrypto,
  removeFavoriteCrypto,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;