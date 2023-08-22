<script>
    import "qrious"
    import {onMount} from "svelte";
    export let destination
    export const getQRscript = async (destination) => {
        const script = document.createElement("script");
        script.src = "https://ss-ll.s3.eu-west-1.amazonaws.com/qrious.min.js";
        document.head.appendChild(script);

        script.onload = () => {
            var qr = new QRious({
                element: document.getElementById("qr"),
                value: destination
            });
        }
    }
    onMount(() => {
        getQRscript(destination)
    })
</script>
<div>
    <canvas id="qr"></canvas>
</div>
