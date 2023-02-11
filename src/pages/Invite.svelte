<script>

import WelcomeMenu from "../../components/WelcomeMenu.svelte";
import { userStore } from "../../stores/user.js"
import {getContext} from "svelte";

export let params;
let id = params.id || "";
let key = params.key || "";

const backEndService = getContext("BackEndService")


let inviteValid
async function validateInvite() {
    const check = await backEndService.validateEmail(id, key)
    inviteValid = check;
}

validateInvite()



</script>
<WelcomeMenu></WelcomeMenu>

{inviteValid}
{#if inviteValid==true}



{:else}
<div class="ui segment">
    <div class="column">
        <h2>Whoops... Look's like that's not right!</h2>
        <h3>This link is not valid or has expired.<br>Please contact your account administrator.</h3>
    </div>
</div>
{/if}
