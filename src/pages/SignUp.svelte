<script>
  import WelcomeMenu from "../../components/WelcomeMenu.svelte";
  import {push} from "svelte-spa-router";
  import {getContext} from "svelte";
  import SplitContent from "../../components/SplitContent.svelte";
  import SignUpForm from "../../components/SignUpForm.svelte";
  import OAuth from "./OAuth.svelte";
  import OAuthLinks from "../../components/OAuthLinks.svelte";
  import Footer from "../../components/Footer.svelte";

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

<WelcomeMenu />
<SplitContent>
  <SignUpForm>
    <OAuthLinks mode="up"/>
  </SignUpForm>
</SplitContent>
<Footer />
