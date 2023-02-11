import {writable} from "svelte/store";

export const userStore = writable({
    firstname: "",
    lastname: "",
    userid: "",
    email: "",
    token: "",
});