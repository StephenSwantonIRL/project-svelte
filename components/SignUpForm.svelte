<script>
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";
    const backEndService = getContext("BackEndService")

    let firstname = "";
    let lastname = "";
    let email = ""
    let password = "";
    let errorMessage = "";

    async function signup() {
        let success = await backEndService.createUser({firstname, lastname, email, password})
        if (success) {
            push("/");
        } else {
            errorMessage = "Error Trying to sign up";
        }
    }




</script>



<form class=""on:submit|preventDefault={signup}>
    <span class="text-center text-sm text-gray-500 font-semibold uppercase">Get Started</span>
    <h3 class="text-center mb-8 text-2xl font-bold font-heading">Sign up</h3>
    <div class="text-left">
        <label class="  cs-label">Name</label>
        <input class="cs-text-field" bind:value={firstname} type="text" placeholder="Enter first name" name="firstName">
        <input class="cs-text-field" bind:value={lastname} type="text" placeholder="Enter last name" name="lastName">
        <label class="cs-label">Email</label>
        <input class="cs-text-field" bind:value={email} type="text" placeholder="Enter email" name="email">

        <label class="cs-label">Password</label>
        <input class="cs-text-field" bind:value={password} type="password" placeholder="Enter Password" name="password">
    </div>

        <button id="submit" class="cs-submitable">Submit</button>

</form>
<slot></slot>