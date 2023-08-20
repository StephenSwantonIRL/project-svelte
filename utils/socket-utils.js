
export function utils(socket, sessionId, actions) {

    socket.on((`${sessionId}-response`), function (msg){
        actions.updateResponses()
    })

}
