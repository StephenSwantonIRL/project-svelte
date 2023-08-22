<script>
import Menu from "../../components/Menu.svelte";
import {userStore} from "../../stores/user.js";
import io from "socket.io-client";
import {getContext} from "svelte";
import Footer from "../../components/Footer.svelte";
import Title from "../../components/Title.svelte";
import Questions from "../../components/Questions.svelte";
import SessionSettings from "../../components/SessionSettings.svelte";
import {utils as socketListeners} from "../../utils/socket-utils.js"
import Responses from "../../components/Responses.svelte";

const backEndService = getContext("BackEndService");
export let params
let id = params.id

let responseReload = 1
let activeQuestion = backEndService.getSessionActiveQuestion(id).then((x) => { console.log(x.activequestion); return x.activequestion } )

const socket = io("http://localhost:4001");
let socketActions = {
    updateResponses: function (){
        responseReload += 1
    }
}
socketListeners(socket, id, socketActions)




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

function updateResponse(event){
    activeQuestion = event.detail
    responseReload +=1
}

</script>
<Menu bind:isAdmin={adminValue}/>
{#await session then session}
    <Title title="{session.title}"/>
    <Questions on:active-question={updateResponse} session={session} socket={socket}/>
    <SessionSettings session="{session}"/>
    {#if responseReload}
        {#await activeQuestion then activeQ}
        <Responses bind:reload={responseReload} session={session} bind:activeQuestionId={activeQuestion} activeQ={activeQ} />
            {/await}
    {/if}
{/await}

<Footer/>
