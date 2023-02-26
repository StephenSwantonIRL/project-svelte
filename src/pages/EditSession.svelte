<script>
import Menu from "../../components/Menu.svelte";
import {userStore} from "../../stores/user.js";
import {getContext} from "svelte";
const backEndService = getContext("BackEndService");
export let params
let id = params.id

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


</script>
<Menu bind:isAdmin={adminValue}/>
