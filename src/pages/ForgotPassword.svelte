<script>
    import WelcomeMenu from "../../components/WelcomeMenu.svelte";
    import {push} from "svelte-spa-router";
    import {BackEndService} from "../../services/backend-service.js";
    import {getContext} from "svelte";
    import {userStore} from "../../stores/user.js"

    const backEndService = getContext("BackEndService")
    let email = ""
    let errorMessage = "";

    async function resetPassword() {
        let success = await backEndService.requestPasswordReset(email)
        console.log(success)
        if (success) {
            push("/");
        } else {
            errorMessage = "Whoops something went wrong please try again.";
        }
    }

</script>

<WelcomeMenu/>
<section class="section">
    <h1 class="title">Request a Password Reset Link</h1>
    <form on:submit|preventDefault={resetPassword}>
        <div>Please provide your email below and if we find an account that matches we will send you a link to reset your password</div>
        <div class="field">
            <label class="label">Email</label> <input class="input" bind:value={email} type="text"
                                                      placeholder="Enter email" name="email">
        </div>

        <div class="field is-grouped">
            <button id="submit" class="button is-link">Submit</button>
        </div>
    </form>
</section>
{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}