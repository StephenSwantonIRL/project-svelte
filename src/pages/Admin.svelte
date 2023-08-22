<script>

    import {userStore} from "../../stores/user.js";
    import {BackEndService} from "../../services/backend-service.js";
    import {getContext} from "svelte";
    import Menu from "../../components/Menu.svelte";

    const backEndService = getContext("BackEndService");

    async function checkAdmin() {
        const response = await backEndService.getUser($userStore._id);
        return Boolean(response.isAdmin);
    }

    let isAdmin;
    let adminCheck = checkAdmin().then((x) => {
        isAdmin = x;
        return x;
    });
    let adminValue;
    $: adminValue = {isAdmin}['isAdmin']


</script>

<Menu isAdmin={adminValue}/>
<section class="section header">
    <h1 class="title is-3">Admin Dashboard</h1>
</section>
