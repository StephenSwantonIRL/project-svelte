<script>

    import {onMount} from "svelte";
    import {WordCloudChart} from "chartjs-chart-wordcloud";
    export let wordsForCloud

    onMount(() => {
        const words = Object.keys(wordsForCloud).map(function (key) {
            return {"key": key, "value": wordsForCloud[key]}
        })

        const chart = new WordCloudChart(document.getElementById("chart").getContext("2d"), {
            type: "wordCloud",
            data: {
                labels: words.map((d) => d.key),
                datasets: [
                    {
                        label: "",
                        data: words.map((d) => 10 + d.value * 10)
                    }
                ]
            },
            options: {
                title: {
                    display: false,
                    text: "Chart.js Word Cloud"
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

    })

</script>
<div max-height="600"><canvas id="chart"></canvas></div>

