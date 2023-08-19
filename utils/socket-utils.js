
export function utils(socket){
    socket.on('Hi back at you', function (msg) {
        console.log("hi back received")
    })
}
