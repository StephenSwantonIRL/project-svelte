<script>
    import {BackEndService} from "../services/backend-service.js";
    import {userStore} from "../stores/user.js";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";

    let email = ""
    let password = ""
    let errorMessage = "";
    const backEndService = getContext("BackEndService")


    async function login() {
        let success = await backEndService.authenticate({email: email, password: password})
        console.log("login function")
        console.log(success)
        if (success) {
            console.log("success")
            console.log($userStore)
            push("/dashboard");
        } else {
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }


</script>
<form on:submit|preventDefault={login}>
    <span class="text-sm text-gray-500 font-semibold uppercase">Sign In</span>
    <h3 class="mb-8 text-2xl font-bold font-heading">Welcome Back</h3>
    <input class="cs-text-field" bind:value={email} type="email" placeholder="E-mail address">
    <input class="cs-text-field" bind:value={password} type="password" placeholder="Password">
    <button class="cs-submitable">Log in</button>
    <a class="text-sm text-gray-500 hover:underline" href="/#/forgotPassword">Forgot password?</a>
</form>

<slot></slot>