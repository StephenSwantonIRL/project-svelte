<script>
    import {getContext} from "svelte";

    export let response
    export let session
    export let type
    let responseValue
    const backEndService = getContext("BackEndService")
    $: name = getName(response.userid)

    async function getName(userid) {
        const anonUserRe = /^a-/
        if(userid.match(anonUserRe)){
            return backEndService.getAnonUser(userid).then((x) => {return x.name})
        } else {
            return backEndService.getUser(userid).then((x) => {return `${x.firstname} ${x.lastname}`})
        }
    }

    if(type==="open"){
        responseValue = response.openendedresponsevalue
    }

    let time = (Date.parse(response.responsetime) - Date.parse(session.activequestionstarttime))/1000
    let unit = "seconds"
    if(time>(60*60)){
        time = (time / (60*60)).toFixed(2)
        unit = "hours"
    } else if ( time> (60)){
        time = (time / (60)).toFixed(2)
        unit = "minutes"
    }


</script>
<div>
    {#await name then name}
    <div>
        {name}
    </div>
    <div>
        {responseValue}
    </div>
    <div>
        {time} {unit}
    </div>
    {/await}
</div>
