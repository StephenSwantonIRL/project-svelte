<script>
    import IndividualResponse from "./IndividualResponse.svelte";
    import {createEventDispatcher, getContext} from "svelte";

    export let question
    export let session

    const backEndService = getContext("BackEndService")
    const dispatch = createEventDispatcher()
    $: responses = backEndService.getResponsesByQuestion(question.questionid, "mcq").then((x) => {
        dispatch("responses", x);
        return x})


</script>
{#await responses then responses}
    {#each responses as response, i}
        <IndividualResponse response={response} session={session} type="mcq" />
    {/each}
{/await}
