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
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
                userid: savedUser.userid,
                token: savedUser.token,

            });
            console.log(userStore)
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
                console.log(user.email)
                const userDetails = await axios.post(`${this.backEndUrl}/api/users/find`, {email: user.email});
                console.log("attempting to retrieve user details")
                console.log(userDetails)
                userStore.set({
                    firstname: userDetails.data.firstname,
                    lastname: userDetails.data.lastname,
                    email: userDetails.data.email,
                    userid: userDetails.data.userid,
                    token: response.data.token,
                });
                localStorage.currentUser = JSON.stringify({
                    firstname: userDetails.data.firstname,
                    lastname: userDetails.data.lastname,
                    email: userDetails.data.email,
                    userid: userDetails.data.userid,
                    token: response.data.token,
                });
                console.log(userStore)
                return true;
            }
            return false;
        } catch (error) {
            console.log("false due to error")
            return false;
        }
    }

    async logout(token) {
        // eslint-disable-next-line dot-notation
        const res = await axios.post(`${this.backEndUrl}/api/revokeToken`, {token : token} );
        axios.defaults.headers.common["Authorization"] = "";
        userStore.set({
            firstname: "",
            lastname: "",
            email: "",
            userid: "",
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

    async validateEmail(id, key) {
        const res = await axios.get(`${this.backEndUrl}/invite/${id}/${key}`);
        if (res.data != true) {
            return false;
        };
        return true;
    }

    async validateResetLink(id, key) {
        const res = await axios.get(`${this.backEndUrl}/reset/${id}/${key}`);
        if (res.data != true) {
            return false;
        };
        return true;
    }

    async resetPassword(id, key, password) {
        const res = await axios.post(`${this.backEndUrl}/reset/${id}/${key}`, { password: password });
        if (res.data != true) {
            return false;
        };
        return true;
    }


    async requestPasswordReset(email) {
        const res = await axios.post(`${this.backEndUrl}/reset`, { email : email });
        console.log(res.data)
        if (res.data != true) {
            return false;
        };
        return true;
    }


    async deleteAllSessions() {
        const res = await axios.delete(`${this.backEndUrl}/api/sessions`);
        return res.data;
    }

    async getAllSessions() {
        const res = await axios.get(`${this.backEndUrl}/api/sessions`);
        return res.data;
    }

    async createSession(session) {
        const res = await axios.post(`${this.backEndUrl}/api/sessions`, session);
        return res.data;
    }

    async getSessionById(id) {
        const res = await axios.get(`${this.backEndUrl}/api/sessions/${id}`);
        return res.data;
    }

    async assignShortCode(shortCode, sessionId) {
        const res = await axios.post(`${this.backEndUrl}/api/sessions/${sessionId}/shortcode/assign`, {shortCode});
        return res.data;
    }

    async getSessionByUser(id) {
        const res = await axios.post(`${this.backEndUrl}/api/sessions/find`, {userid: id} );
        return res.data;
    }

    async deleteSessionById(id) {
        console.log(id)
        const res = await axios.delete(`${this.backEndUrl}/api/sessions/${id}`);
        return res.data;
    }


    async createQuestion(question) {
        const res = await axios.post(`${this.backEndUrl}/api/questions`, question);
        return res.data;
    }

    async editQuestion(question) {
        const res = await axios.post(`${this.backEndUrl}/api/questions/${question.questionid}/edit`, question);
        return res.data;
    }

    async createMCQQuestion(questionElements) {
        const res = await axios.post(`${this.backEndUrl}/api/questions/mcq`, questionElements);
        return res.data;
    }

    async editMCQQuestion(questionElements) {
        const res = await axios.post(`${this.backEndUrl}/api/questions/mcq/${questionElements.questionid}/edit`, questionElements);
        return res.data;
    }

    async createOpenEndedQuestion(questionElements) {
        const res = await axios.post(`${this.backEndUrl}/api/questions/open-ended`, questionElements);
        return res.data;
    }

    async editOpenEndedQuestion(questionElements) {
        const res = await axios.post(`${this.backEndUrl}/api/questions/open-ended/${questionElements.questionid}/edit`, questionElements);
        return res.data;
    }

    async getQuestionById(id) {
        const res = await axios.get(`${this.backEndUrl}/api/questions/${id}`);
        return res.data;
    }


    async getQuestionsBySession(id) {
        const res = await axios.post(`${this.backEndUrl}/api/questions/find`, {sessionid:id});
        return res.data;
    }


    async deleteQuestionById(sessionId, questionId) {
        const res = await axios.delete(`${this.backEndUrl}/api/sessions/${sessionId}/${questionId}`);
        return res.data;
    }

    async getMCQOptionsById(id) {
        const res = await axios.get(`${this.backEndUrl}/api/questions/mcq/${id}`);
        return res.data;
    }

    async getOpenEndedById(id) {
        const res = await axios.get(`${this.backEndUrl}/api/questions/open-ended/${id}`);
        return res.data;
    }

    async uploadImage(options) {
        const res = await axios.post(`${this.backEndUrl}/api/question/uploadimage`, options);
        return res.data;
    }


};
