import {writable} from "svelte/store";

export const userStore = writable({
    _id: "",
    email: "",
    token: "",
});