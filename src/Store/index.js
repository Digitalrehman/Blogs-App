import { configureStore } from "@reduxjs/toolkit";
import { bookmarkitems } from "./Slice";

let Store  = configureStore({
    reducer: {
        bookmarkitems : bookmarkitems
    }
})
export default Store;