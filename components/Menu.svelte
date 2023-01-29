<script>
    import Brand from "./Brand.svelte";
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";

    export let isAdmin;

    const backendService = getContext("BackEndService");

    async function logout() {
        const logout = await backendService.logout();
        if (logout) {
            push("/login");
        }
    }
</script>


<nav class="navbar">
    <div class="navbar-brand">
        <Brand/>
    </div>
    <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false"> <span
            aria-hidden="true"></span>
        <span aria-hidden="true"></span> <span aria-hidden="true"></span> </a>
    <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a id="dashboard" class="button" href="/#/dashboard"> Dashboard </a>
                    {#if isAdmin === true}
                        <!-- admin options  -->
                    {/if}
                    <a id="logout" class="button" on:click={logout}> Logout </a>
                </div>
            </div>
        </div>
    </div>
</nav>

