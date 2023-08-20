<script>
    import IndividualResponse from "./IndividualResponse.svelte";
    import {getContext} from "svelte";

    export let question
    export let session
    const backEndService = getContext("BackEndService")
    $: responses = backEndService.getResponsesByQuestion(question.questionid).then((x) => { console.log(x); return x})

</script>
{#await responses then responses}
    {#each responses as response, i}
        <IndividualResponse response={response} session={session} type="open" />
    {/each}
{/await}
