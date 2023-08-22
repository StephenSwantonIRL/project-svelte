<script>
    import Chart from "chart.js/auto";
    import {onMount} from "svelte"

    export let data

    let values = []
    let uniqueValues
    if (data) {
        data.forEach((response) => {
            response.values.forEach((value) => values.push(value.value))
        })
        uniqueValues = [...(new Set(values))]
    }
    let valueCounts = []
    uniqueValues.forEach((value) => {
        let count = 0;
        values.forEach((v) => {
            if (v == value) {
                count++;
            }
        })
        valueCounts.push(count)
    })

    onMount(() => {
        new Chart(
            document.getElementById('chart'),
            {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: valueCounts
                    }],
                    labels: uniqueValues
                }

            }
        )
    })


</script>
{valueCounts}
<canvas id="chart"></canvas>
