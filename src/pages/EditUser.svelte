<script>
    import {Buffer} from "buffer";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import WelcomeMenu from "../../components/WelcomeMenu.svelte";

    const backEndService = getContext("BackEndService");

    export let params;

    let userString = params.data;
    let user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gitHub: "",
    }
    if (userString != undefined) {
        let convertedString = new Buffer(userString, 'base64').toString('ascii')
        let gitHubUser = JSON.parse(convertedString)
        gitHubUser.password = "";
        user = gitHubUser;
    }

    $: console.log(user);
    let errorMessage;

    async function signup() {
        let success = await backEndService.createUser(user)
        if (success) {
            login()
        } else {
            errorMessage = "Error Trying to sign up";
        }
    }

    async function login() {
        let success = await backEndService.authenticate({email: user.email, password: user.password})
        console.log("login function")
        console.log(success)
        if (success) {
            console.log("success")
            push("/dashboard");
        } else {
            user.email = "";
            user.password = "";
            errorMessage = "Invalid Credentials";
            push("/login")
        }
    }
</script>

<WelcomeMenu />
<section class="section">
    <h1 class="title">Complete Sign Up</h1>
    <form on:submit|preventDefault={signup}>
        <label class="label">Name</label>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <input class="input" type="text" placeholder="Enter first name" name="firstName"
                           bind:value={user.firstName}>
                </div>
                <div class="field">
                    <input class="input" type="text" placeholder="Enter last name" name="lastName"
                           bind:value={user.lastName}>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label">Email</label> <input class="input" type="text" placeholder="Enter email" name="email"
                                                      bind:value={user.email}>
        </div>
        <div class="field">
            <label class="label">Password</label> <input class="input" type="password" placeholder="Enter Password"
                                                         name="password" bind:value={user.password}>
        </div>
        <div class="field is-grouped">
            <button class="button is-link">Complete Sign-Up</button>
        </div>
    </form>
</section>
{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}