import { createSlice , nanoid } from "@reduxjs/toolkit"

const initialState = {
    weather:{
        city:"",
        temp:0
    },
    loader:false
}

export const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers:{
        addWeather:(state,action)=>{
            const newcity=action.payload.city
            const newtemp=action.payload.temp
            state.weather.city=newcity
            state.weather.temp=newtemp;
        },
        addloader:(state,action)=> {
            const load = action.payload.isloading
            state.loader=load
        }

    }
})
export const {addWeather,addloader} = weatherSlice.actions

export default weatherSlice.reducer