<script>
    import {getContext} from "svelte";
    import Toggle from "./Toggle.svelte";
    import QRcode from "./QRcode.svelte";

    const backEndService = getContext("BackEndService")

    export let session

    let shortcode = session.shortcode
    let waitMessage = session.waitmessage
    let trueFalse
    if(session.status == "inactive"){
        trueFalse = false
    } else {
        trueFalse = true
    }
    let destination = "http://localhost:3001/#/"+shortcode

    async function updateShortCode(shortcodeValue, sessionId){
        await backEndService.assignShortCode(shortcodeValue, sessionId)
        destination = "http://localhost:3001/#/"+shortcode
    }

    async function updateWaitMessage(waitMessageValue, sessionId){
        await backEndService.assignWaitMessage(waitMessageValue, sessionId)
    }

    async function toggleStatus() {
        trueFalse = !trueFalse;
        let status
        if(trueFalse){
            status = "active"
        } else {
            status = "inactive"
        }
        await backEndService.changeSessionStatus(status,session.sessionid)

    }
</script>
<div class="cs-main">
    <section>
        <h3 class="text-4xl mb-2 leading-tight font-semibold font-heading">Settings</h3>
        <div style="width:100%">
            Short Code: <input class="cs-text-field" style="width:50%" bind:value={shortcode} type="text" placeholder="xys" onfocusout={updateShortCode(shortcode, session.sessionid)}>
            {#if shortcode}
                <QRcode bind:destination={destination} />
            {/if}
        </div>
        <div>
            Waiting Page Message: <textarea class="cs-text-field" style="width:50%" bind:value={waitMessage} placeholder="xys" onfocusout={updateWaitMessage(waitMessage, session.sessionid)} />
        </div>
        <Toggle onclick={toggleStatus} bind:checked={trueFalse}/>
    </section>
</div>
