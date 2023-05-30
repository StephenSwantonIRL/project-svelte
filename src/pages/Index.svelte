<script>
    import WelcomeMenu from "../../components/WelcomeMenu.svelte";
    import HomeContent from "../../components/HomeContent.svelte";
    import JoinCode from "../../components/JoinCode.svelte";
    import Footer from "../../components/Footer.svelte";
    import { Alert } from "flowbite-svelte";
</script>
<div class="p-8">
    <Alert>
        <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </Alert>
</div>
<JoinCode />
<WelcomeMenu />
<HomeContent />
<Footer />

