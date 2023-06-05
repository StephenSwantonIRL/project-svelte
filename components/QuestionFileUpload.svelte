<script>

import {Button} from "flowbite-svelte";

export let images;
export let imagesInput
let container

function uploadImage() {
    const formData = new FormData();
    const fileInput = document.querySelector(".file-input");
    formData.append('imagefile', fileInput.files[0]);

    backEndService.uploadImage(formData)
        .then((data) => {
            images.push(data.url);
            images = images;
            imagesInput = imagesInput + data.url + ",";
            imagesInput = imagesInput;
        })
        .catch(error => console.log(error));

}

</script>
<div class="card-content">
    <div bind:this={container} id="image-container">
        {#if images}
            {#each images as image}
                <img id="{image}" src="{image}" width="30%"
                     style="padding-left:10px"/>
            {/each}
        {/if}
    </div>

    <div id="file-select" class="file has-name is-fullwidth">
        <label class="file-label"> Do you want to add an image? <input class="file-input" type="file" accept="image/png, image/jpeg">
        </label>
        <Button style="margin-left:10px;" on:click={uploadImage} class="button is-primary ">Upload</Button>
    </div>
</div>
