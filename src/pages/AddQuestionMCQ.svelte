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
    export let question =""
    let id = params.id
    let selectedTime;
    let timeInput;
    let selectedOrder;
    let questionContainer;
    $: question = {
        type: "mcq",
        question: question.question,
        image: "https://image.com",
        sessionorder: selectedOrder ? selectedOrder: 0,
        timetoanswer: calculateTime(),
        sessionid: id
    }

    let mcqOptions =  ["",""]
    let correctOptions = []

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
        let response = await backEndService.createQuestion(question
            )
        console.log(response.questionid)
        let mcqSpecificQuestionElements = {
            questionid: response.questionid,
            sessionid: response.sessionid,
            options: mcqOptions,
            correctanswer: correctOptions
        }
        console.log(mcqSpecificQuestionElements)
        await backEndService.createMCQQuestion(mcqSpecificQuestionElements)

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

    let trueFalse = false;

    function calculateTime() {
        if(selectedTime ==="minutes"){
            return timeInput * 60;
        } else {
            return timeInput;
        }
    }

    function addMCQOption() {
        mcqOptions = [...mcqOptions, ""]
        console.log(mcqOptions)
    }

    function toggleTrueFalse() {
        trueFalse = !trueFalse;
        if(trueFalse===true) {
            mcqOptions = ["True", "False"]
        }
        correctOptions = []
    }

    $: questionContainer = trueFalse ? questionContainer : questionContainer

    function updateMCQoption(index, value) {
        mcqOptions[index] = value
        console.log(mcqOptions)
    }

    function updateCorrectAnswers(value, isCorrect) {
        if(correctOptions.includes(value) && !isCorrect) {
            correctOptions.splice(correctOptions.indexOf(value),1)
        }
        if(!correctOptions.includes(value) && isCorrect){
            correctOptions = [ ...correctOptions, value ]
        }
        console.log(correctOptions)
    }

</script>
<Menu bind:isAdmin={adminValue}/>


<div class="cs-main">
    <section class="">
        <div class="h-full ">
            <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading"> New MCQ Question </h2>
        </div>
        <div width="100%">
            <form on:submit|preventDefault={addQuestion}>
                <div>
                <label> Question Prompt</label><br>
                <Textarea width="800px" bind:value={question.question}></Textarea>
                </div>
                <QuestionFileUpload/>
                <b>Answer Options     </b>    Multiple Answers? <Toggle checked={true}/>  True/False? <Toggle onclick={toggleTrueFalse} bind:checked={trueFalse}/> <br>

                <div bind:this={questionContainer}>
                    {#if trueFalse}
                        <MCQOption order="1" value="True" disabled="true"  index=0 update={updateMCQoption} correct=false updateCorrect={updateCorrectAnswers}/>
                        <MCQOption order="2" value="False" disabled="true" index=1 update={updateMCQoption} correct=false updateCorrect={updateCorrectAnswers}/>
                    {:else}
                        {#each mcqOptions as option , index }
                            <MCQOption order={index+1} bind:value={mcqOptions[index]} index={index} update={updateMCQoption} correct=false updateCorrect={updateCorrectAnswers} />
                        {/each}
                    {/if}

                    {#if mcqOptions.length ===0 }
                        <MCQOption order="1" bind:value={mcqOptions[0]} index=0 update={updateMCQoption} correct=false updateCorrect={updateCorrectAnswers}/>
                        <MCQOption order="2" bind:value={mcqOptions[1]} index=1 update={updateMCQoption} correct=false updateCorrect={updateCorrectAnswers}/>
                    {/if}

                    <Button on:click={addMCQOption}>Add New Option</Button>
                </div>

                <label>Where do you want this question to appear?</label><br>
                <Select items={orderOptions} bind:value={selectedOrder}/><br/>
                <label>Close Question after: <div><NumberInput bind:value={timeInput}/><Select items={timeOptions} bind:value={selectedTime}/></div> </label>
                <Button on:click={addQuestion}>Submit</Button>
            </form>
        </div>

    </section>
</div>


<Footer/>
