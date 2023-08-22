<script>

    import Menu from "../../components/Menu.svelte";
    import Footer from "../../components/Footer.svelte";
    import {userStore} from "../../stores/user.js";
    import {getContext} from "svelte";
    import {Button, Label, Select} from "flowbite-svelte";
    import Toggle from "../../components/Toggle.svelte"
    import { NumberInput, Textarea } from 'flowbite-svelte'
    import QuestionFileUpload from "../../components/QuestionFileUpload.svelte";

    export let params
    export let question =""
    let id = params.id
    let selectedTime;
    let timeInput;
    let selectedOrder;

    $: question = {
        type: "open",
        question: question.question,
        image: "https://image.com",
        sessionorder: selectedOrder ? selectedOrder: 0,
        timetoanswer: calculateTime(),
        sessionid: id
    }

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
        console.log(question)
        question.timetoanswer = calculateTime()
        await backEndService.createQuestion(question
            )

    }

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

    function calculateTime() {
        if(selectedTime ==="minutes"){
            return timeInput * 60;
        } else {
            return timeInput;
        }
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
                <QuestionFileUpload/>
                Type? Short Answer <Toggle checked={true}/> Long Answer <br>
                <label>Where do you want this question to appear?</label><br>
                <Select items={orderOptions} bind:value={selectedOrder}></Select><br/>
                <label>Close Question after: <div><NumberInput bind:value={timeInput}></NumberInput><Select items={timeOptions} bind:value={selectedTime}></Select></div> </label>
                <Button on:click={addQuestion}>Submit</Button>
            </form>
        </div>

    </section>
</div>


<Footer/>
