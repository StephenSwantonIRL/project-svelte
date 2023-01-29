<script>
    import Menu from "../../components/Menu.svelte";
    import {getContext} from "svelte";
    import {userStore} from "../../stores/user.js";


    const backEndService = getContext("BackEndService");

    async function checkAdmin(){
        const response = await backEndService.getUser($userStore._id);
        return Boolean(response.isAdmin);
    }

    let isAdmin;
    let adminCheck = checkAdmin().then((x) => {
        isAdmin = x;
        return x;
    });
    let adminValue
    $: adminValue = {isAdmin}['isAdmin']
    $: console.log(adminValue);


</script>

<Menu bind:isAdmin={adminValue} />

<section class="section header">
    <h1 class="title is-3">Dashboard</h1>
</section>

