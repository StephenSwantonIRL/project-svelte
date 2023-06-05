<script>
    import { Input, Label } from "flowbite-svelte"
    export let order
    export let value
    export let disabled

    let displayValue = value ? value : undefined;

</script>
<div>
    {#if disabled}
        <Input placeholder="Option {order}" bind:value={displayValue} readonly="true" ></Input>
        {:else}
        <Input placeholder="Option {order}" bind:value={displayValue} ></Input>
    {/if}
</div>
