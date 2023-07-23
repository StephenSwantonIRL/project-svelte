<script>

    import Menu from "../../components/Menu.svelte";
    import Footer from "../../components/Footer.svelte";
    import {userStore} from "../../stores/user.js";
    import {getContext} from "svelte";
    import {Button, Label, Select} from "flowbite-svelte";
    import Toggle from "../../components/Toggle.svelte"
    import { NumberInput, Textarea } from 'flowbite-svelte'
    import QuestionFileUpload from "../../components/QuestionFileUpload.svelte";
    import MCQOption from "../../components/MCQOption.svelte";

    export let params
    let id = params.id
    let questionId = params.questionid

    const backEndService = getContext("BackEndService");
    let questionDetail
    let selectedTime;
    let timeInput ;
    let selectedOrder;
    let trueFalse = false

    let question = backEndService.getQuestionById(questionId).then((x) => {
        console.log(x)
        questionDetail = x;
        selectedTime = (x.timetoanswer%60 == 0)? "minutes" : "seconds" ;
        timeInput = (x.timetoanswer%60 == 0)? x.timetoanswer/60 : x.timetoanswer ;
        selectedOrder = x.sessionorder;
        return x
    })



    let questionContainer;

    async function getQuestion(id) {
        let res = await backEndService.getQuestionById(questionId)
        return res
    }

    let openEndedDetail

    let openOptionsCall = backEndService.getOpenEndedById(questionId).then((x) => {
        openEndedDetail = x
        trueFalse = (x.type == 'long') ? true: false;
        return x
    })

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

    async function editQuestion() {
        questionDetail.timetoanswer = calculateTime()
        let response = await backEndService.editQuestion(questionDetail)
        console.log(trueFalse)
        openEndedDetail.type = (trueFalse === true)? 'long' : 'short';
        let openEndedSpecificQuestionElements = {
            questionid: response.questionid,
            sessionid: response.sessionid,
            type: openEndedDetail.type
        }
        await backEndService.editOpenEndedQuestion(openEndedSpecificQuestionElements)
    }

    function toggleTrueFalse() {
        trueFalse = !trueFalse;
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


    $: questionContainer = trueFalse ? questionContainer : questionContainer

</script>
<Menu bind:isAdmin={adminValue}/>


<div class="cs-main">
    <section class="">
        <div class="h-full ">
            <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading"> Edit Open Question </h2>
        </div>
        <div width="100%">

            <div>
                {#await question then x}
                    <label> Question Prompt</label><br>
                    <Textarea width="800px" bind:value={questionDetail.question}></Textarea>
                {/await}
            </div>
            <QuestionFileUpload/>
            Type? Short Answer <Toggle onclick={toggleTrueFalse} bind:checked={trueFalse}/> Long Answer <br>
            <label>Where do you want this question to appear?</label><br>
            <Select items={orderOptions} bind:value={selectedOrder}></Select><br/>
            <label>Close Question after: <div><NumberInput bind:value={timeInput}></NumberInput><Select items={timeOptions} bind:value={selectedTime}></Select></div> </label>

            <Button on:click={editQuestion}>Submit</Button>
        </div>

    </section>
</div>


<Footer/>
