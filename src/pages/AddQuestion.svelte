<script>

    import Menu from "../../components/Menu.svelte";
    import Footer from "../../components/Footer.svelte";
    import {userStore} from "../../stores/user.js";
    import {getContext} from "svelte";
    import {Button, Label, Select} from "flowbite-svelte";
    import Toggle from "../../components/Toggle.svelte"
    import { NumberInput, Textarea } from 'flowbite-svelte'


    export let params
    let id = params.id
    export let images
    export let imagesInput
    let question = {
        type: "open",
        question: "",
        image: "https://image.com",
        sessionorder: 0,
        timetoanswer: 120,
        sessionid: id
    }
    let container
    const backEndService = getContext("BackEndService");
    async function checkAdmin() {
        const response = await backEndService.getUser($userStore.userid)
        return Boolean(response.isAdmin);
    }

    let isAdmin;
    let adminCheck = checkAdmin().then((x) => {
        isAdmin = x;
        return x;
    });
    let adminValue
    $: adminValue = {isAdmin}['isAdmin']

    async function addQuestion() {
        console.log(question.question)
        await backEndService.createQuestion(question
            )

    }
    let selectedOrder;
    let orderOptions = [
        {value: 0, name: 0},
        {value: 1, name: 1},
        {value: 2, name: 2},
        {value: 3, name: 3},
        {value: "Unassigned", name: "Unassigned"},

        ]

    let timeOptions = [
        {value: "seconds", name: "seconds"},
        {value: "minutes", name: "minutes"},
    ]

    let selectedTime;
    let timeInput;


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
<Menu bind:isAdmin={adminValue}/>


<div class="cs-main">
    <section class="">
        <div class="h-full ">
            <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading"> New Open Ended Question </h2>
        </div>
        <div width="100%">
            <form on:submit|preventDefault={addQuestion}>
                <div>
                <label> Question Prompt</label><br>
                <Textarea width="800px" bind:value={question.question}></Textarea>
                </div>
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
                Type? Short Answer <Toggle checked={true}/> Long Answer <br>
                <label>Where do you want this question to appear?</label><br>
                <Select items={orderOptions} bind:value={selectedOrder}></Select><br/>
                <label>Close Question after: <div><NumberInput> bind:value={timeInput}</NumberInput><Select items={timeOptions} bind:value={selectedTime}></Select></div> </label>
                <Button on:click={addQuestion}>Submit</Button>
            </form>
        </div>

    </section>
</div>


<Footer/>
