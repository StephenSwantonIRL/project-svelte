<script>
    import {getContext} from "svelte";

    const backEndService = getContext("BackEndService")

    let waitMessage
    export let session

    let shortcode = session.shortcode
    async function updateShortCode(shortcodeValue, sessionId){
        await backEndService.assignShortCode(shortcodeValue, sessionId)
    }

    async function updateWaitMessage(waitMessageValue, sessionId){
        console.log(waitMessageValue)
    }
</script>
<div class="cs-main">
    <section>
        <h3 class="text-4xl mb-2 leading-tight font-semibold font-heading">Settings</h3>
        <div style="width:100%">
            Short Code: <input class="cs-text-field" style="width:50%" bind:value={shortcode} type="text" placeholder="xys" onfocusout={updateShortCode(shortcode, session.sessionid)}>
        </div>
        <div>
            Waiting Page Message: <textarea class="cs-text-field" style="width:50%" bind:value={waitMessage} placeholder="xys" onfocusout={updateWaitMessage(waitMessage, session.sessionid)} />
        </div>

    </section>
</div>
