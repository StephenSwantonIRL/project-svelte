<script>
  import WelcomeMenu from "../../components/WelcomeMenu.svelte";
  import {push} from "svelte-spa-router";
  import {getContext} from "svelte";

  import github from "../../assets/GitHub_Logo.png";

  const backEndService = getContext("BackEndService")

  let firstName = "";
  let lastName = "";
  let email = ""
  let password = "";
  let errorMessage = "";

  async function signup() {
    let success = await backEndService.createUser({firstName, lastName, email, password})
    if (success) {
      push("/");
    } else {
      errorMessage = "Error Trying to sign up";
    }
  }

</script>

<WelcomeMenu />

<section class="section">
  <h1 class="title">Sign up</h1>
  <form on:submit|preventDefault={signup}>
    <label class="label">Name</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <input class="input" bind:value={firstName} type="text" placeholder="Enter first name" name="firstName">
        </div>
        <div class="field">
          <input class="input" bind:value={lastName} type="text" placeholder="Enter last name" name="lastName">
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label> <input class="input" bind:value={email} type="text" placeholder="Enter email" name="email">
    </div>
    <div class="field">
      <label class="label">Password</label> <input class="input" bind:value={password} type="password" placeholder="Enter Password" name="password">
    </div>
    <div class="field is-grouped">
      <button id="submit" class="button is-link">Submit</button>  <a href="{backEndService.backEndUrl}/auth" id="github" class="button is-inverted is-link">Sign up with </a>
    </div>
  </form>
</section>
{#if errorMessage}
  <div class="section">
    {errorMessage}
  </div>
{/if}