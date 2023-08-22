<script>
    import {push} from "svelte-spa-router";
    import {BackEndService} from "../../services/backend-service.js";
    import {getContext} from "svelte";
    import {userStore} from "../../stores/user.js"
    import WelcomeMenu from "../../components/WelcomeMenu.svelte";


    const backEndService = getContext("BackEndService")
    export let params;
    let id = params.id || "";
    let key = params.key || "";

    let linkValid

    async function validateLink() {
        const check = await backEndService.validateResetLink(id, key)
        linkValid = check;
    }

    validateLink()

    let password = "";
    let passwordAgain = "";
    let errorMessage = "";

    async function resetPassword() {
        let success = await backEndService.resetPassword(id,key,password)
        console.log(success)
        if (success) {
            push("/login");
        } else {
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }

</script>

<WelcomeMenu/>

{#if linkValid == true}
    <section class="section">
        <h1 class="title">Reset Your Password</h1>
        <form on:submit|preventDefault={resetPassword}>

            <div class="field">
                <label class="label">Password</label> <input class="input" bind:value={password} type="password"
                                                             placeholder="Enter Password" name="password">
            </div>

            <div class="field">
                <label class="label">Confirm Password</label> <input class="input" bind:value={passwordAgain}
                                                                     type="password"
                                                                     placeholder="Confirm Password"
                                                                     name="confirmPassword">
            </div>
            <div class="field is-grouped">
                <button id="submit" class="button is-link">Submit</button>
        </form>
    </section>
    {#if errorMessage}
        <div class="section">
            {errorMessage}
        </div>
    {/if}

{:else }
    <div class="ui segment">
        <div class="column">
            <h2>Whoops... Look's like that's not right!</h2>
            <h3>This link is not valid or has expired.<br>Please contact your account administrator.</h3>
        </div>
    </div>
{/if}