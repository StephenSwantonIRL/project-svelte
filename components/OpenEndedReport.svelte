<script>
    import OpenEndedResponses from "./OpenEndedResponses.svelte";
    import WordCloud from "./WordCloud.svelte";

    export let question
    export let session

    let chartData
    function updateCloud(event){
        chartData = event.detail
    }

</script>
<div class="cs-main">
    <section class="">
        <div class="h-full ">
            <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Responses</h2>
        </div>
        <p><b>{question.question}</b></p>
        {#if chartData}
            <WordCloud responseValues={chartData} />
        {/if}
        <OpenEndedResponses on:responses={updateCloud} question={question} session={session}/>
    </section>
</div>
