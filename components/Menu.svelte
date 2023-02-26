<script>
    import Brand from "./Brand.svelte";
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {userStore} from "../stores/user.js";

    export let isAdmin;
    let logo = "assets/logos/inquisitlogo320.png"
    const backendService = getContext("BackEndService");

    async function logout() {
        const logout = await backendService.logout($userStore.token);
        if (logout) {
            push("/login");
        }
    }
</script>



<nav class="navbar" role="navigation" aria-label="main navigation">
    <nav class="py-5 bg-transparent">
        <div class="container px-4 mx-auto">
            <div class="flex justify-between items-center">
                <button class="block navbar-burger text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg class="h-4 w-4" fill="currentColor " viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Mobile menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>

                <a class="text-gray-600 text-2xl leading-none" href="#">
                    <img class="h-8" src="{logo}" alt="" width="auto">
                </a>

                <ul class="hidden lg:flex items-center w-auto space-x-12">
                    {#if isAdmin === true}
                        <!-- admin options  -->
                    {/if}
                    <li><a id="logout" class="text-sm text-gray-500 hover:text-gray-700" on:click={logout} >Log out </a></li>
                </ul>
            </div>
        </div>
        <div class="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
            <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
                <div class="flex items-center mb-8">
                    <a class="mr-auto text-2xl font-semibold leading-none" href="#">
                        <img class="h-8" src="mockup-assets/logos/inquisitlogo320.png" alt="" width="auto">
                    </a>
                    <button class="navbar-close">
                        <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <ul>
                        <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">About</a></li>
                        <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Company</a></li>
                        <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Services</a></li>
                        <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Testimonials</a></li>
                    </ul>
                </div>
                <div class="mt-auto">
                    <div class="pt-6"><a class="block px-6 py-2 mb-3 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded" href="#">Sign In</a><a class="block px-6 py-2 mb-2 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded" href="#">Contact Us</a></div>
                    <p class="mt-6 mb-4 text-sm text-center text-gray-400">
                        <span>© 2023 All rights reserved.</span>
                    </p>
                </div>
            </nav>
        </div>
    </nav>
</nav>

