<script>
    import {BackEndService} from "../services/backend-service.js";
    import {setContext} from "svelte";
    import {getContext} from "svelte";
    import {userStore} from "../stores/user.js";
    import {wrap} from "svelte-spa-router/wrap"
    import Admin from "./pages/Admin.svelte";

    import Index from "./pages/Index.svelte";
    import SignUp from "./pages/SignUp.svelte";
    import Login from "./pages/Login.svelte";
    import Dashboard from "./pages/Dashboard.svelte";

    import Router, {push} from "svelte-spa-router";
    import OAuth from "./pages/OAuth.svelte";
    import EditUser from "./pages/EditUser.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import Invite from "./pages/Invite.svelte";
    import ForgotPassword from "./pages/ForgotPassword.svelte";
    import ResetPassword from "./pages/ResetPassword.svelte";
    import EditSession from "./pages/EditSession.svelte";
    import AddQuestionOpenEnded from "./pages/AddQuestionOpenEnded.svelte";
    import AddQuestionMCQ from "./pages/AddQuestionMCQ.svelte";
    import EditMCQQuestion from "./pages/EditMCQQuestion.svelte";
    import EditOpenQuestion from "./pages/EditOpenQuestion.svelte";

    const title = "App";
    setContext("BackEndService", new BackEndService("http://localhost:4000"));
    //setContext("BackEndService", new BackEndService("https://inquis.glitch.me"));



    const backEndService = getContext("BackEndService");

    let routes = {
        "/": Index,
        "/signup": SignUp,
        "/login": Login,
        "/forgotPassword": ForgotPassword,
        "/invite/:id/:key": Invite,
        "/dashboard": wrap({
            component: Dashboard,
            conditions: [
                async () => {
                    return await backEndService.checkToken();
                }]
        }),
        '/admin': wrap({
            asyncComponent: () => import('./pages/Admin.svelte'),
            conditions: [
                async () => {
                    return await backEndService.checkToken();
                },
                async () => {
                    const response = await backEndService.getUser($userStore._id)
                    if (response.isAdmin === true) {
                        return true
                    } else {
                        return false
                    }
                }
            ]
        }),
        "/auth/:id/:token": OAuth,
        "/reset/:id/:key": ResetPassword,
        "/github/:data": EditUser,
        "/edit/:id": EditSession,
        "/:id/add-open-question": AddQuestionOpenEnded,
        "/:id/add-mcq": AddQuestionMCQ,
        "/edit/:id/mcq/:questionid": EditMCQQuestion,
        "/edit/:id/open/:questionid": EditOpenQuestion,
        "*": NotFound,

    }


    function conditionsFailed(event) {
        console.error('conditionsFailed event', event.detail)
        push('/login')
    }


</script>

<div>
    <Router {routes} on:conditionsFailed={conditionsFailed}/>
</div>
