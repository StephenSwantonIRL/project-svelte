<script>
    import { Input, Label, Checkbox } from "flowbite-svelte"
    import { onMount } from 'svelte';
    export let order
    export let value
    export let disabled
    export let update
    export let index
    export let correct
    export let updateCorrect
    let checked = (correct === "true") ? true : false
    let displayValue = value ? value : undefined;

    onMount( () => {
        console.log(typeof(correct))
        console.log(typeof(checked))
    });

</script>
<div>
    {#if disabled}
        <div style="max-width:90%"><Input placeholder="Option {order}" bind:value={displayValue} readonly="true" ></Input></div><div style="float:right; min-width:40px"> <Checkbox value={displayValue} bind:checked={checked} on:blur={()=> updateCorrect(displayValue, checked)}/> </div>
        {:else}
        <div style="max-width:90%"><Input placeholder="Option {order}" bind:value={displayValue} on:blur={() => update(index, displayValue)}></Input></div><div style="float: right; min-width:40px"> <Checkbox value={displayValue} bind:checked={checked} on:blur={()=> updateCorrect(displayValue, checked)} /></div>
    {/if}
</div>
