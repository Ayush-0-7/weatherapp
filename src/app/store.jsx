import { configureStore } from "@reduxjs/toolkit";

import weatherreducer from '../features/weather/weatherSlice';

export const store = configureStore({
    reducer:weatherreducer
})