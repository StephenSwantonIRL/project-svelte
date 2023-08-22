<script>
import MCQResponses from "./MCQResponses.svelte";
import MCQChart from "./MCQChart.svelte";

export let question
export let session

let chartData
function updateChart(event){
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
            <MCQChart bind:data={chartData} question={question}/>
        {/if}
        <MCQResponses on:responses={updateChart} question={question} session={session} />
    </section>
</div>
