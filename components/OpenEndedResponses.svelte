<script>
    import IndividualResponse from "./IndividualResponse.svelte";
    import {createEventDispatcher, getContext} from "svelte";

    export let question
    export let session
    const dispatch = createEventDispatcher()
    const backEndService = getContext("BackEndService")
    $: responses = backEndService.getResponsesByQuestion(question.questionid, "open").then((x) => { dispatch("responses", x); return x})

</script>
{#await responses then responses}
    {#each responses as response, i}
        <IndividualResponse response={response} session={session} type="open" />
    {/each}
{/await}
