<script>
    import Menu from "../../components/Menu.svelte";
    import {getContext} from "svelte";
    import {userStore} from "../../stores/user.js";
    import Footer from "../../components/Footer.svelte";
    import Modal from '../../components/Modal.svelte';

    let showModal = false;
    let shadowTitle
    let sessionTitle
    let deleteModal
    const backEndService = getContext("BackEndService");

    async function checkAdmin() {
        const response = await backEndService.getUser($userStore.userid);
        return Boolean(response.isAdmin);
    }

    let isAdmin;
    let adminCheck = checkAdmin().then((x) => {
        isAdmin = x;
        return x;
    });
    let adminValue
    $: adminValue = {isAdmin}['isAdmin']

    async function addSession(event) {
        if (event.detail?.save) {
            sessionTitle = shadowTitle
            let newSession = {
                userid: $userStore.userid ,
                title: sessionTitle,
                type: "quiz",
                status: "inactive",
                shortcode: "",
                chatenabled: false,
                qaenabled: false,
            }
            await backEndService.createSession(newSession)
        }
        shadowTitle = "";
        showModal = !showModal;
    }

    async function getUserSessions(userId){

       const result =  await backEndService.getSessionByUser(userId)
        return result
    }

    let userSessions = getUserSessions($userStore.userid)
        .then((x) => {
            return x;
        })

    function openDeleteModal(id) {
        deleteModal = id
    }

    async function deleteSession(event) {
        if (event.detail?.save) {
            await backEndService.deleteSessionById(deleteModal)
            userSessions = await backEndService.getSessionByUser($userStore.userid)
        }
        deleteModal = "";
    }

</script>

<Menu bind:isAdmin={adminValue}/>

{#if !sessionTitle }
        <div class="cs-main">
        <section class="">
            <div class="px-10 h-full ">
                <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Sessions </h2>
                <p><a on:click={addSession} class="fa-regular fa-circle-plus">Add Session</a><i class="fa-regular fa-circle-plus"></i></p>

                {#await userSessions then userSession}
                    {#if userSession.length === 0}
                        <p class="mb-2 text-lg text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea sit eaque totam aliquid veritatis assumenda temporibus harum unde!</p>
                    {/if}

                    {#each userSession as session, i}
                        <div class="flex flex-row justify-between" >
                        <div>
                        {session.title}
                        </div>
                            <div>
                                <a>Control Centre </a>
                            </div>
                            <div>
                                <a href="/#/edit/{session.sessionid}" > Edit</a>
                            </div>
                            <div>
                                <a on:click={() => openDeleteModal(session.sessionid)}>Delete</a>
                            </div>
                        </div>
                    {/each}

                    {/await}

            </div>
        </section>
        <section>
            <div class=" px-10">
                <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Participant Lists</h2>

                <p class="mb-2 text-lg text-gray-500 leading-relaxed">There's nothing here yet but we are working on
                    it...!</p>
            </div>
        </section>
        </div>

{/if}

{#if showModal}
    <Modal on:close="{addSession}">
        <h2 class="cs-label uppercase" slot="header">
            New Session
        </h2>
        <input class="cs-text-field" bind:value={shadowTitle} type="text" placeholder="Session Title"/>
    </Modal>
{/if}
{#if deleteModal}
    <Modal on:close="{deleteSession}">
        <h2 class="cs-label uppercase" slot="header">
            Delete Session
        </h2>
    </Modal>
{/if}


{#if sessionTitle}
    <div class="cs-main">
    <section class="">
        <div class=" px-10 mx-auto">
            <h1 class="cs-h2 font-heading">{sessionTitle}</h1>
            <h2 class="cs-h2 font-heading">Questions</h2>
            <p class="mb-2 text-lg text-gray-500 leading-relaxed">There's nothing here yet but we are working on
                it...!</p>
        </div>
    </section>

    <section>
        <div class="px-10 mx-auto">
            <h2 class="cs-h2">Settings</h2>

            <p class="mb-2 text-lg text-gray-500 leading-relaxed">There's nothing here yet but we are working on
                it...!</p>
        </div>
    </section>
    </div>
{/if}

<div class="fixed inset-x-0 bottom-0">
    <Footer/>
</div>
