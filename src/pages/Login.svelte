<script>
    import WelcomeMenu from "../../components/WelcomeMenu.svelte";
    import {push} from "svelte-spa-router";
    import {BackEndService} from "../../services/backend-service.js";
    import {getContext} from "svelte";
    import {userStore} from "../../stores/user.js"
    import SplitContent from "../../components/SplitContent.svelte";
    import LoginForm from "../../components/LoginForm.svelte";
    import Footer from "../../components/Footer.svelte";
    import OAuthLinks from "../../components/OAuthLinks.svelte";

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

<WelcomeMenu/>
<div class="flex flex-col">
    <SplitContent>
        <LoginForm>
            <OAuthLinks mode="in"/>
        </LoginForm>
    </SplitContent>
    <Footer/>
</div>


{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}