<script>

    import {getContext} from "svelte";
    import CloudChart from "./CloudChart.svelte";

    const backEndService = getContext("BackEndService")

    export let responseValues

    let responsesText = ""

    for (let i = 0; i < responseValues.length; i = i + 1) {
        responsesText = responsesText + " --" + responseValues[i].openendedresponsevalue
    }

    /*    const responsesText = `- I believe human activities, such as burning fossil fuels and deforestation, are the main causes of climate change.
    - The Earth's natural cycles play a significant role in climate change, but human actions exacerbate the problem.
    - Industrial pollution and greenhouse gas emissions are the primary drivers of climate change.
    - There's still a lot of debate, but I think a combination of factors, including human activity and natural processes, contribute to climate change.
    - Climate change is mostly due to the sun's variations and has little to do with human actions.
    - The impact of livestock farming and agriculture on methane emissions is a major cause of climate change.
    - It's a complex issue, but I believe that reducing carbon emissions from transportation is a key factor in mitigating climate change.
    - Deforestation and the loss of natural carbon sinks are major contributors to climate change.
    - I'm not entirely sure, but I think both human behavior and natural factors contribute to changes in the climate.
    `*/

    let wordsObject

    const wordsForCloud = backEndService.generateWordCloud(responsesText).then((x) => {
        wordsObject = x;
        return x
    })


</script>
{#await wordsForCloud then wordsForCloud}
    <CloudChart wordsForCloud={wordsObject}/>
{/await}

