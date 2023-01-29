<script>
    import axios from "axios";
    import {userStore} from "../../stores/user.js";
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";

    export let params
    let id = params.id
    let token = params.token

    const backEndService = getContext("BackEndService")

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const userDetails = backEndService.getUser(id)
    .then((user) => {
        userStore.set({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
            _id: id,
            token: token,
        });
        localStorage.currentUser = JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: id,
            token: token,
        });
        return user;
    })
    .then((user) => {
        push("/dashboard");
    })

</script>