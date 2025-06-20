import "./main.scss"
document.documentElement.addEventListener("dragover", (event) => {
    event.preventDefault()
    event.dataTransfer!.dropEffect = "copy"
    if (!document.querySelector("#droptarget")?.classList.contains("drophover")) {
        document.querySelector("#droptarget")?.classList.add("drophover")
        document.querySelector("#droptarget")!.innerHTML = "Drop it!"
    }
})
document.documentElement.addEventListener("dragleave", (event) => {
    event.preventDefault()
    document.querySelector("#droptarget")?.classList.remove("drophover")
    document.querySelector("#droptarget")!.innerHTML = "Drag your files here"
})
document.documentElement.addEventListener("drop", (event) => {
    event.preventDefault()
    document.querySelector("#droptarget")?.classList.remove("drophover")
    document.querySelector("#droptarget")!.innerHTML = "Drag your files here"
})
