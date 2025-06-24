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
const imageConvertListener = (objectURL: string, name: string) => {
    return (mimeType: "image/bmp" | "image/tiff" | "image/x-ms-bmp" | "image/gif" | "image/jpeg" | "image/png", ext: string) => {
        return async () => {
            const image = await Jimp.read(objectURL)
            const outputObjURL = URL.createObjectURL(new Blob([await image.getBuffer(mimeType)]))
            const a = document.createElement("a")
            a.download = name.split(".").slice(0, -1).join(".") + ext
            a.href = outputObjURL
            a.click()
            document.documentElement.classList.remove("popup-show")
        }
    }
}
function convertPNG(file: File) {
    const objectURL = URL.createObjectURL(file)
    document.querySelector("#convert-png")?.removeAttribute("hidden")
    const pngConvertListener = imageConvertListener(objectURL, file.name)
    ;(document.querySelector("#convert-png .imagepreview") as HTMLImageElement).src = objectURL
    ;(document.querySelector("#convert-png .to-jpg") as HTMLButtonElement).onclick = pngConvertListener("image/jpeg", ".jpg")
    ;(document.querySelector("#convert-png .to-gif") as HTMLButtonElement).onclick = pngConvertListener("image/gif", ".gif")
    ;(document.querySelector("#convert-png .to-tiff") as HTMLButtonElement).onclick = pngConvertListener("image/tiff", ".tiff")
    ;(document.querySelector("#convert-png .to-bmp") as HTMLButtonElement).onclick = pngConvertListener("image/bmp", ".bmp")
}
function convertJPG(file: File) {
    const objectURL = URL.createObjectURL(file)
    document.querySelector("#convert-jpg")?.removeAttribute("hidden")
    const pngConvertListener = imageConvertListener(objectURL, file.name)
    ;(document.querySelector("#convert-jpg .imagepreview") as HTMLImageElement).src = objectURL
    ;(document.querySelector("#convert-jpg .to-png") as HTMLButtonElement).onclick = pngConvertListener("image/png", ".png")
    ;(document.querySelector("#convert-jpg .to-gif") as HTMLButtonElement).onclick = pngConvertListener("image/gif", ".gif")
    ;(document.querySelector("#convert-jpg .to-tiff") as HTMLButtonElement).onclick = pngConvertListener("image/tiff", ".tiff")
    ;(document.querySelector("#convert-jpg .to-bmp") as HTMLButtonElement).onclick = pngConvertListener("image/bmp", ".bmp")
}
function convertGIF(file: File) {
    const objectURL = URL.createObjectURL(file)
    document.querySelector("#convert-gif")?.removeAttribute("hidden")
    const gifConvertListener = imageConvertListener(objectURL, file.name)
    ;(document.querySelector("#convert-gif .imagepreview") as HTMLImageElement).src = objectURL
    ;(document.querySelector("#convert-gif .to-png") as HTMLButtonElement).onclick = gifConvertListener("image/png", ".png")
    ;(document.querySelector("#convert-gif .to-jpg") as HTMLButtonElement).onclick = gifConvertListener("image/jpeg", ".jpg")
    ;(document.querySelector("#convert-gif .to-tiff") as HTMLButtonElement).onclick = gifConvertListener("image/tiff", ".tiff")
    ;(document.querySelector("#convert-gif .to-bmp") as HTMLButtonElement).onclick = gifConvertListener("image/bmp", ".bmp")
}
function handleFile(file: File) {
    document.querySelectorAll(".ext-specific").forEach((x) => x.setAttribute("hidden", "true"))
    console.log(file)
    const extension = file.name.split(".").pop()!.toLowerCase()
    if (!extension) {
        dropError("Unsupported file type")
    }
    function validFile() {
        document.documentElement.classList.add("popup-show")
        ;(document.querySelector("#filename") as HTMLSpanElement).innerText = file.name
    }
    const mimeType = file.type
    switch (mimeType + "_" + extension) {
        case "image/jpeg_jpg":
        case "image/jpeg_jpeg":
            validFile()
            convertJPG(file)
            break
        case "image/png_png":
            validFile()
            convertPNG(file)
            break
        case "image/gif_gif":
            validFile()
            convertGIF(file)
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
