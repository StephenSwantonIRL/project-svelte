<script>
    import OpenEndedResponses from "./OpenEndedResponses.svelte";

    export let question
    export let session
</script>
<div class="cs-main">
    <section class="">
        <div class="h-full ">
            <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Responses</h2>
        </div>
        <p><b>{question.question}</b></p>
        <OpenEndedResponses question={question} session={session}/>
    </section>
</div>
