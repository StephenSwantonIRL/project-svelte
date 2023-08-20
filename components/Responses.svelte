<script>
    import {getContext} from "svelte";
    import MCQReport from "./MCQReport.svelte";
    import OpenEndedReport from "./OpenEndedReport.svelte";
    export let reload
    export let session
    export let activeQ
    let initialLoad = 1
    export let activeQuestionId

    const backEndService = getContext("BackEndService")
    $: activeQuestionInitial = backEndService.getQuestionById(activeQ).then((x) => { console.log(x); return x})
    $: activeQuestion = backEndService.getQuestionById(activeQuestionId).then((x) => { initialLoad = 2; console.log(x);return x})

</script>
{#if initialLoad ===1 }
    {#await activeQuestionInitial then activeQ}
        {#if activeQ.type=="mcq"}
            <MCQReport question={activeQ}  />
        {:else if activeQ.type==="open"}
            <OpenEndedReport question={activeQ}  />
        {:else}

        {/if}

    {/await}
{/if}


{#await activeQuestion then activeQ}
    {#if activeQ.type=="mcq"}
        <MCQReport question={activeQ}  />
    {:else if activeQ.type==="open"}
        <OpenEndedReport question={activeQ}  />
    {:else}

    {/if}

{/await}
