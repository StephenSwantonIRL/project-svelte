<script>
import Menu from "../../components/Menu.svelte";
import {userStore} from "../../stores/user.js";
import {getContext} from "svelte";
import Footer from "../../components/Footer.svelte";
import Title from "../../components/Title.svelte";
import Questions from "../../components/Questions.svelte";
import SessionSettings from "../../components/SessionSettings.svelte";

const backEndService = getContext("BackEndService");
export let params
let id = params.id


async function getSession(id) {
    const response = await backEndService.getSessionById(id);
    return response
}

let session

$: session = getSession(id).then((x) => {
    console.log(x)
    return x
})

async function checkAdmin() {
    const response = await backEndService.getUser($userStore.userid);
    return Boolean(response.isAdmin);
}

let isAdmin;
let adminCheck = checkAdmin().then((x) => {
    isAdmin = x;
    return x;
});
let adminValue
$: adminValue = {isAdmin}['isAdmin']


</script>
<Menu bind:isAdmin={adminValue}/>
{#await session then session}
    <Title title="{session.title}"/>
    <Questions session={session}/>
    <SessionSettings session="{session}"/>
{/await}
<Footer/>
