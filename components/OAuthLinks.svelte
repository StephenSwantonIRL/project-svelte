<script>
    import {BackEndService} from "../services/backend-service.js";
    import {getContext} from "svelte";
    const backEndService = getContext("BackEndService");
    export let mode;
</script>

<a class="flex items-center justify-center mt-4 mb-4 py-3 text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg" href="{backEndService.backEndUrl}/google">
    <img class="w-5 h-5 mr-2" src="/assets/socials/google.svg" alt="">
    <span class="text-sm font-bold text-gray-500">Sign {mode} with Google</span>
</a>
<a class="flex items-center justify-center py-3 text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg" href="{backEndService.backEndUrl}/auth">
    <img class="w-5 h-5 mr-2" src="/assets/socials/microsoft.svg" alt="">
    <span class="text-sm font-bold text-gray-500">Sign {mode} with Microsoft</span>
</a>