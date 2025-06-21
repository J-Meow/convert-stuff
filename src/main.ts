import "./main.scss"
function dropError(msg: string) {
    document.querySelector("#droptarget")!.innerHTML = msg
    document.querySelector("#droptarget")!.classList.add("error")
    console.error(msg)
    setTimeout(() => {
        if (document.querySelector("#droptarget")?.classList.contains("error")) {
            document.querySelector("#droptarget")?.classList.remove("error")
            document.querySelector("#droptarget")!.innerHTML = "Drag your files here"
        }
    }, 1000)
}
function handleFile(file: File) {
    console.log(file)
    const extension = file.name.split(".").pop()!
    if (!extension) {
        dropError("Unsupported file type")
    }
    const mimeType = file.type
    switch (mimeType + "_" + extension) {
        case "image/png_png":
            document.documentElement.classList.add("popup-show")
            ;(document.querySelector("#filename") as HTMLSpanElement).innerText = file.name
            break

        default:
            dropError("Unsupported file type")
            break
    }
}
document.documentElement.addEventListener("dragover", (event) => {
    event.preventDefault()
    event.dataTransfer!.dropEffect = "copy"
    if (document.querySelector("#droptarget")?.classList.contains("error")) {
        document.querySelector("#droptarget")?.classList.remove("error")
    }
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
    const file = event.dataTransfer?.files[0]
    if (!file) return
    handleFile(file)
})
