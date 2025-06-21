import "./main.scss"
import { Jimp } from "jimp"

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
function convertPNG(file: File) {
    const objectURL = URL.createObjectURL(file)
    ;(document.querySelector("#convert-png .imagepreview") as HTMLImageElement).src = objectURL
    document.querySelector("#convert-png .to-jpg")?.addEventListener("click", async () => {
        const image = await Jimp.read(objectURL)
        const outputObjURL = URL.createObjectURL(new Blob([await image.getBuffer("image/jpeg")]))
        open(outputObjURL)
    })
}
function handleFile(file: File) {
    console.log(file)
    const extension = file.name.split(".").pop()!
    if (!extension) {
        dropError("Unsupported file type")
    }
    function validFile() {
        document.documentElement.classList.add("popup-show")
        ;(document.querySelector("#filename") as HTMLSpanElement).innerText = file.name
    }
    const mimeType = file.type
    switch (mimeType + "_" + extension) {
        case "image/png_png":
            validFile()
            convertPNG(file)
            break

        default:
            dropError("Unsupported file type")
            break
    }
}
document.documentElement.addEventListener("dragover", (event) => {
    event.preventDefault()
    if (document.documentElement.classList.contains("popup-show")) {
        return
    }
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
    if (document.documentElement.classList.contains("popup-show")) {
        return
    }
    document.querySelector("#droptarget")?.classList.remove("drophover")
    document.querySelector("#droptarget")!.innerHTML = "Drag your files here"
})
document.documentElement.addEventListener("drop", (event) => {
    event.preventDefault()
    if (document.documentElement.classList.contains("popup-show")) {
        return
    }
    document.querySelector("#droptarget")?.classList.remove("drophover")
    document.querySelector("#droptarget")!.innerHTML = "Drag your files here"
    const file = event.dataTransfer?.files[0]
    if (!file) return
    handleFile(file)
})
