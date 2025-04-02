import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CryptoState {
  currencies: any;
  coins: Record<string, CryptoData>;
  loading: boolean;
  error: string | null;
}

interface CryptoData {
  price: number;
  change24h: number;
  marketCap: number;
  history: Array<{
    timestamp: number;
    price: number;
  }>;
}

const initialState: CryptoState = {
  coins: {},
  loading: false,
  error: null,
  currencies: undefined
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (coinId: string) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
    );
    if (!response.ok) throw new Error('Crypto data fetch failed');
    return response.json();
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { coinId, price } = action.payload;
      if (state.coins[coinId]) {
        state.coins[coinId].price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        const [coinId] = Object.keys(action.payload);
        state.coins[coinId] = {
          price: action.payload[coinId].usd,
          change24h: action.payload[coinId].usd_24h_change,
          marketCap: action.payload[coinId].usd_market_cap,
          history: [],
        };
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crypto data';
      });
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;