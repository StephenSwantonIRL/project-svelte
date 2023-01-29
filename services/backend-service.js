import axios from "axios";
import {userStore} from "../stores/user.js";
import {push} from "svelte-spa-router";

export class BackEndService {
    backEndUrl = ""

    constructor(backEndUrl) {
        this.backEndUrl = backEndUrl;
        const userCredentials = localStorage.currentUser;
        if (userCredentials) {
            const savedUser = JSON.parse(userCredentials);
            userStore.set({
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                _id: savedUser._id,
                token: savedUser.token,

            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    }

    async authenticate(user) {
        try {
            const response = await axios.post(`${this.backEndUrl}/api/users/authenticate`, user);
            console.log(response)
            // eslint-disable-next-line dot-notation
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            if (response.data.success) {
                const userDetails = await axios.post(`${this.backEndUrl}/api/users/find`, {email: user.email});
                userStore.set({
                    firstName: userDetails.data.firstName,
                    lastName: userDetails.data.lastName,
                    email: userDetails.data.email,
                    _id: userDetails.data._id,
                    token: response.data.token,
                });
                localStorage.currentUser = JSON.stringify({
                    firstName: userDetails.data.firstName,
                    lastName: userDetails.data.lastName,
                    email: userDetails.data.email,
                    _id: userDetails.data._id,
                    token: response.data.token,
                });
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        // eslint-disable-next-line dot-notation
        console.log(userStore);
        const res = await axios.post(`${this.backEndUrl}/api/revokeToken`,);
        axios.defaults.headers.common["Authorization"] = "";
        userStore.set({
            firstName: "",
            lastName: "",
            email: "",
            _id: "",
            token: "",
        });
        localStorage.removeItem("currentUser");
        return "Logged Out."
    }

    async createUser(user) {
        const res = await axios.post(`${this.backEndUrl}/api/users`, user);
        return res.data;
    }

    async getUser(id) {
        const res = await axios.get(`${this.backEndUrl}/api/users/${id}`);
        return res.data;
    }

    async getUserByEmail(email) {
        const res = await axios.post(`${this.backEndUrl}/api/users/find`, {email: email});
        return res.data;
    }

    async getAllUsers() {
        const res = await axios.get(`${this.backEndUrl}/api/users`);
        return res.data;
    }

    async deleteAllUsers() {
        const res = await axios.delete(`${this.backEndUrl}/api/users`);
        return res.data;
    }

    async checkToken() {
        const res = await axios.get(`${this.backEndUrl}/api/checkToken`);
        if (res.data.statusCode == 401) {
            return false;
        };
        return true;
    }


};
