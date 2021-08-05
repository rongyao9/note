// sleep 

function sleep(duration) {
    return new Promise(function (resolve, reject) {
        console.log("b");
        setTimeout(resolve, duration);
    })
}

console.log("a");
sleep(5000).then(() => console.log("c"));