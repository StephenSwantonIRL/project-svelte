import {writable} from "svelte/store";

export const sessionStore = writable({
    sessionid: "",
    type:"",
    status:"",
    shortcode: "",
    chatenabled: false,
    qaenabled: false,
    title: "",
});
