<script>

import Modal from "./Modal.svelte"
import {getContext} from "svelte"
import {push} from "svelte-spa-router";
export let session;

const backEndService = getContext("BackEndService")
let deleteModal
let showModal = false
let questionType = ""

async function getSessionQuestions(sessionId){
    const result =  await backEndService.getQuestionsBySession(sessionId)
    return result
}

let sessionQuestions = getSessionQuestions(session.sessionid)
    .then((x) => {
        return x
    })

function openDeleteModal(questionId) {
    deleteModal = questionId
}

function addQuestion(event){

    if (event.detail?.save) {
        switch(questionType){
            case "open":
                push(`/${session.sessionid}/add-open-question`)
                break
            case "mcq":
                push(`/${session.sessionid}/add-mcq`)
                break
        }

    }
    questionType = ""
    showModal = !showModal


}

async function deleteQuestion(event) {
    if (event.detail?.save) {
        await backEndService.deleteQuestionById(deleteModal)
        sessionQuestions = await backEndService.getQuestionsBySession(session.sessionid)
    }
    deleteModal = ""
}

</script>

<div class="cs-main">
    <section class="">
        <div class="h-full ">
            <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Questions </h2>
            <p><a on:click={addQuestion} class="fa-regular fa-circle-plus">Add Question</a><i class="fa-regular fa-circle-plus"></i></p>

            {#await sessionQuestions then sessionQuestion}
                {#if sessionQuestion.length === 0}
                    <p class="mb-2 text-lg text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Ea sit eaque totam aliquid veritatis assumenda temporibus harum unde!</p>
                {/if}

                {#each sessionQuestions as question, i}
                    <div class="flex flex-row justify-between" >
                        <div>
                            {question.title}
                        </div>
                        <div>
                            <a>Control Centre </a>
                        </div>
                        <div>
                            <a href="/#/edit/{session.sessionid}/{question.questionid}" > Edit</a>
                        </div>
                        <div>
                            <a on:click={() => openDeleteModal(question.questionid)}>Delete</a>
                        </div>
                    </div>
                {/each}

            {/await}

        </div>
    </section>
</div>

{#if deleteModal}
    <Modal on:close="{deleteQuestion}">
        <h2 class="cs-label uppercase" slot="header">
            Delete Question
        </h2>
    </Modal>
{/if}


{#if showModal}
    <Modal on:close="{addQuestion}">
        <h2 class="cs-label uppercase" slot="header">
            Select Question Type
        </h2>
        <label>
            <input type=radio bind:group={questionType} name="type" value={"open"}>
            Open Ended
        </label>

        <label>
            <input type=radio bind:group={questionType} name="type" value={"mcq"}>
            MCQ
        </label>
    </Modal>
{/if}
