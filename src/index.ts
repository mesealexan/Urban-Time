import { combineLatest, debounceTime, filter, take } from "rxjs"
//Events
const thumbMatMetalico = document.getElementById("mat-metalico")
const thumbMatTelone = document.getElementById("mat-telone")
const optionContainerMetallico = document.getElementById("option-container-metallico")
const optionContainerTelone = document.getElementById("option-container-telone")


let isMenuMetallicoOpened = false
let isMenuTeloneOpened = false
thumbMatMetalico.addEventListener("click", () => {

    if (isMenuTeloneOpened) {
        optionContainerTelone.style.left = "-100%"
        isMenuTeloneOpened = !isMenuTeloneOpened
    }
    if (isMenuMetallicoOpened) {
        optionContainerMetallico.style.left = "-100%"
        isMenuMetallicoOpened = !isMenuMetallicoOpened
    } else {
        optionContainerMetallico.style.left = "0%"
        isMenuMetallicoOpened = !isMenuMetallicoOpened
    }
})

thumbMatTelone.addEventListener("click", () => {

    if (isMenuMetallicoOpened) {
        optionContainerMetallico.style.left = "-100%"
        isMenuMetallicoOpened = !isMenuMetallicoOpened
    }
    if (isMenuTeloneOpened) {
        optionContainerTelone.style.left = "-100%"
        isMenuTeloneOpened = !isMenuTeloneOpened
    } else {
        optionContainerTelone.style.left = "0%"
        isMenuTeloneOpened = !isMenuTeloneOpened
    }
})



// Ixaria logic

const model = "ffb79240-cbfd-4858-a119-384ff6fdf1be"
//@ts-ignore
const FIGARO_API = window.FIGARO_API

FIGARO_API.loadProduct(model, { clearSelection: true })
console.log(FIGARO_API)

const thumbMatMetallico = document.getElementById("thumb-mat-metallico")
const thumbImgMatTelone = document.getElementById("thumb-mat-telone")

FIGARO_API.View.Materials.getMaterialOptions$("Bars").pipe(filter((response: any) => !!response.length), debounceTime(100), take(1)).subscribe((res: any) => {
   console.log(res)
    const parent = document.getElementById("option-container-metallico")
    //@ts-ignore
    thumbMatMetallico.src = res[0].presentation.thumbnail.downloadUrl
    for (let index = 0; index < res.length; index++) {
        const material = res[index];

        const thumbOption = document.createElement("div")
        thumbOption.classList.add("thumb-option")
        thumbOption.addEventListener("click", () => {
            FIGARO_API.Scene.setMaterial("Bars", material.id)
            //@ts-ignore
            thumbMatMetallico.src = material.presentation.thumbnail.downloadUrl
        })
        const thumbOptionImage = document.createElement("img")
        thumbOptionImage.classList.add("thumb-option-image")
        thumbOptionImage.src = material.presentation.thumbnail.downloadUrl

        const thumbOptionText = document.createElement("div")
        thumbOptionText.classList.add("thumb-option-text")
        thumbOptionText.innerText = material.presentation.name

        thumbOption.append(thumbOptionImage)
        thumbOption.append(thumbOptionText)

        parent.append(thumbOption)
    }
})

FIGARO_API.View.Materials.getMaterialOptions$("Prelata").pipe(filter((response: any) => !!response.length), debounceTime(100), take(1)).subscribe((res: any) => {
    const parent = document.getElementById("option-container-telone")
    //@ts-ignore
    thumbImgMatTelone.src = res[0].presentation.thumbnail.downloadUrl
    for (let index = 0; index < res.length; index++) {
        const material = res[index];

        const thumbOption = document.createElement("div")
        thumbOption.classList.add("thumb-option")
        thumbOption.addEventListener("click", () => {
            FIGARO_API.Scene.setMaterial("Prelata", material.id)
            //@ts-ignore
            thumbImgMatTelone.src = material.presentation.thumbnail.downloadUrl
        })
        const thumbOptionImage = document.createElement("img")
        thumbOptionImage.classList.add("thumb-option-image")
        thumbOptionImage.src = material.presentation.thumbnail.downloadUrl

        const thumbOptionText = document.createElement("div")
        thumbOptionText.classList.add("thumb-option-text")
        thumbOptionText.innerText = material.presentation.name

        thumbOption.append(thumbOptionImage)
        thumbOption.append(thumbOptionText)

        parent.append(thumbOption)
    }
})

// let lastBlatLength = 120



// let computeBlatLength = function () {
//     const length = sizeHash[productState["Jos_Centru"]] + sizeHash[productState["Jos_Stanga"]] + sizeHash[productState["Jos_Dreapta"]]
//     return length
// }

// let updateSlotProduct = function (slot: any, value: any) {

//     FIGARO_API.selectModel({ modelId: modelHash[value], slotName: slot });

//     // console.log(computeBlatLength())
//     productState[slot] = value
//     const newBlatLength = computeBlatLength()
//     console.log(newBlatLength)
//     if (lastBlatLength != newBlatLength) {
//         // tre updatata blatu
//         console.log("placa" + newBlatLength)
//         const placa = modelHash["placa" + newBlatLength]
//         if (placa) FIGARO_API.selectModel({ modelId: placa, slotName: "Blat" });
//         lastBlatLength = newBlatLength
//     }
// }




// function makeThumbAvailable(divID: string, secondDivID?: string) {
//     const selectedDIV = document.getElementById(divID)
//     if (secondDivID) {
//         const secondDiv = document.getElementById(secondDivID)
//         console.log(secondDiv.children[1].classList[0])
//         if (secondDiv.children[1].classList[0] === "thumb-check-selected") {
//             return
//         }
//     }
//     selectedDIV.className = "thumb-wrapper"
// }

/*
    Methods
*/

// setTimeout(() => {
//     console.log("dd")
//     FIGARO_API.takeScreenshot().then((res: any) => {

//         //@ts-ignore
//         document.getElementById("thumb-1").src = res
//         FIGARO_API.updateVariable("camera", 1)
//         setTimeout(() => {
//             FIGARO_API.takeScreenshot().then((res: any) => {
//                 //@ts-ignore
//                 document.getElementById("thumb-2").src = res
//                 FIGARO_API.updateVariable("camera", 2)
//                 setTimeout(() => {
//                     FIGARO_API.takeScreenshot().then((res: any) => {
//                         //@ts-ignore
//                         document.getElementById("thumb-3").src = res
//                         FIGARO_API.updateVariable("camera", 3)
//                         setTimeout(() => {
//                             FIGARO_API.takeScreenshot().then((res: any) => {
//                                 //@ts-ignore
//                                 document.getElementById("thumb-4").src = res
//                             })
//                         }, 2000)
//                     })
//                 }, 2000)
//             })
//         }, 2000)
//     })
// }, 2000)

// function switchSelectionCSS(divID: string) {
//     const selectedDIV = document.getElementById(divID)

//     for (let index = 0; index < selectedDIV.parentElement.children.length; index++) {
//         selectedDIV.parentElement.children[index].children[1].className = "thumb-check";
//     }

//     selectedDIV.children[1].className = "thumb-check-selected"
// }

// function makeThumbUnavailable(htmlDIV: any) {
//     const selectedDIV = document.getElementById(htmlDIV)
//     console.log
//     //check if model is in slot
//     selectedDIV.className = "thumb-wrapper-disabled"
// }

// function makeThumbAvailable(divID: string) {
//     const selectedDIV = document.getElementById(divID)
//     selectedDIV.className = "thumb-wrapper"
// }

// function setValue(slot: any, value: any, htmlDIV?: any) {

//     productState[slot] = value
//     if (htmlDIV) switchSelectionCSS(htmlDIV)

//     if (slot === "numarPiese") {
//         if (value === 1) {
//             document.getElementById("titlu-corp-1").innerText = "Model corp"
//             switchSelectionCSS("c1-60")
//             loadModelInSlot("Jos_Centru", "corp60")
//             loadModelInSlot("Jos_Dreapta", "none")
//             loadModelInSlot("Jos_Stanga", "none")
//         } else if (value === 2) {
//             document.getElementById("titlu-corp-1").innerText = "Model corp stanga"
//             document.getElementById("titlu-corp-2").innerText = "Model corp dreapta"
//             switchSelectionCSS("c1-60")
//             switchSelectionCSS("c2-60")
//             loadModelInSlot("Jos_Centru", "corp60")
//             loadModelInSlot("Jos_Dreapta", "none")
//             loadModelInSlot("Jos_Stanga", "corp60")
//         } else {
//             document.getElementById("titlu-corp-1").innerText = "Model corp mijloc"
//             document.getElementById("titlu-corp-2").innerText = "Model corp dreapta"
//             document.getElementById("titlu-corp-3").innerText = "Model corp stanga"
//             switchSelectionCSS("c1-60")
//             switchSelectionCSS("c2-60")
//             switchSelectionCSS("c3-60")
//             loadModelInSlot("Jos_Centru", "corp60")
//             loadModelInSlot("Jos_Dreapta", "corp60")
//             loadModelInSlot("Jos_Stanga", "corp60")
//         }
//     }

//     loadModelInSlot(slot, value)

// }


// function setMaterial(meshName: any, value: any, htmlDIV?: any) {
//     if (htmlDIV) switchSelectionCSS(htmlDIV)
//     const hashedModel = materialHash[value]

//     FIGARO_API.selectMaterial({ name: meshName, materialId: hashedModel })
// }

// function loadModelInSlot(slot: any, value: any) {
//     const hashedModel = modelHash[value]
//     console.log(hashedModel)
//     if (hashedModel) FIGARO_API.selectModel({ modelId: hashedModel, slotName: slot });

// }


/*
    Events
*/


// document.getElementById('webGL').shadowRoot.getElementById("ixariaThreeCanvas").style.borderRadius = "10px"

// document.getElementById('thumb-1').onclick = () => {
//     FIGARO_API.updateVariable("camera", 0)

// }

// document.getElementById('thumb-2').onclick = () => {
//     FIGARO_API.updateVariable("camera", 1)

// }

// document.getElementById('thumb-3').onclick = () => {
//     FIGARO_API.updateVariable("camera", 2)

// }

// document.getElementById('thumb-4').onclick = () => {
//     FIGARO_API.updateVariable("camera", 4)
//     //@ts-ignore
//     document.getElementById("img-bck").src = ""
// }

// document.getElementById("nr-1").onclick = function () {

//     document.getElementById("corp-3").style.display = "none"
//     document.getElementById("titlu-corp-3").style.display = "none"

//     document.getElementById("corp-2").style.display = "none"
//     document.getElementById("titlu-corp-2").style.display = "none"

//     setValue("numarPiese", 1, "nr-1")
// }

// document.getElementById("nr-2").onclick = function () {

//     document.getElementById("corp-2").style.display = "flex"
//     document.getElementById("titlu-corp-2").style.display = "flex"

//     document.getElementById("corp-3").style.display = "none"
//     document.getElementById("titlu-corp-3").style.display = "none"

//     setValue("numarPiese", 2, "nr-2")
// }

// document.getElementById("nr-3").onclick = function () {
//     document.getElementById("corp-2").style.display = "flex"
//     document.getElementById("titlu-corp-2").style.display = "flex"

//     document.getElementById("corp-3").style.display = "flex"
//     document.getElementById("titlu-corp-3").style.display = "flex"

//     setValue("numarPiese", 3, "nr-3")
// }


/*
    Corpuri jos
*/


// document.getElementById("c1-30").onclick = function () {
//     setValue("Jos_Centru", "corp30", "c1-30")
// }

// document.getElementById("c1-60").onclick = function () {
//     setValue("Jos_Centru", "corp60", "c1-60")
// }

// document.getElementById("c1-75").onclick = function () {
//     setValue("Jos_Centru", "corp75", "c1-75")
// }

// document.getElementById("c1-90").onclick = function () {
//     setValue("Jos_Centru", "corp90", "c1-90")
// }

// document.getElementById("c2-30").onclick = function () {
//     setValue("Jos_Dreapta", "corp30", "c2-30")
// }
// document.getElementById("c2-60").onclick = function () {
//     setValue("Jos_Dreapta", "corp60", "c2-60")
// }

// document.getElementById("c2-75").onclick = function () {
//     setValue("Jos_Dreapta", "corp75", "c2-75")
// }

// document.getElementById("c2-90").onclick = function () {
//     setValue("Jos_Dreapta", "corp90", "c2-90")
// }

// document.getElementById("c3-30").onclick = function () {
//     setValue("Jos_Stanga", "corp30", "c3-30")
// }

// document.getElementById("c3-60").onclick = function () {
//     setValue("Jos_Stanga", "corp60", "c3-60")
// }
// document.getElementById("c3-75").onclick = function () {
//     setValue("Jos_Stanga", "corp75", "c3-75")
// }
// document.getElementById("c3-90").onclick = function () {
//     setValue("Jos_Stanga", "corp90", "c3-90")
// }

/*
    Corpuri jos END
*/



// document.getElementById("chiuveta-1").onclick = function () {
//     setValue("Blat", "chiuveta1", "chiuveta-1")
// }

// document.getElementById("chiuveta-2").onclick = function () {
//     setValue("Blat", "chiuveta2", "chiuveta-2")
// }

// document.getElementById("chiuveta-3").onclick = function () {
//     setValue("Blat", "chiuveta3", "chiuveta-3")
// }
// document.getElementById("oglinda60x70").onclick = function () {
//     setValue("Sus_Centru", "oglinda60x70", "oglinda60x70")
// }

// document.getElementById("oglinda90x70").onclick = function () {
//     setValue("Sus_Centru", "oglinda90x70", "oglinda90x70")
// }


// document.getElementById("dulap-stanga").onclick = function () {
//     setValue("Sus_Stanga", "dulapLateral", "dulap-stanga")
//     setValue("Sus_Dreapta", "none")

// }

// document.getElementById("dulap-dreapta").onclick = function () {
//     setValue("Sus_Stanga", "none")
//     setValue("Sus_Dreapta", "dulapLateral", "dulap-dreapta")
// }

// document.getElementById("dulap-ambele").onclick = function () {
//     setValue("Sus_Stanga", "dulapLateral", "dulap-ambele")
//     setValue("Sus_Dreapta", "dulapLateral")
// }

// document.getElementById("dulap-fara").onclick = function () {
//     setValue("Sus_Stanga", "none", "dulap-fara")
//     setValue("Sus_Dreapta", "none")
// }



// document.getElementById("mat-1").onclick = function () {
//     setMaterial("Material Placi", "mat5", "mat-1")
// }
// document.getElementById("mat-2").onclick = function () {
//     setMaterial("Material Placi", "mat6", "mat-2")
//     switchSelectionCSS("mat-2")
// }
// document.getElementById("mat-3").onclick = function () {
//     setMaterial("Material Placi", "mat1", "mat-3")
// }
// document.getElementById("mat-4").onclick = function () {
//     setMaterial("Material Placi", "mat2", "mat-4")
// }
// document.getElementById("mat-5").onclick = function () {
//     setMaterial("Material Placi", "mat3", "mat-5")
// }
// document.getElementById("mat-6").onclick = function () {
//     setMaterial("Material Placi", "mat4", "mat-6")
// }


// document.getElementById("mat-secund-1").onclick = function () {
//     setMaterial("Material blat", "mat6", "mat-secund-1")
// }
// document.getElementById("mat-secund-2").onclick = function () {
//     setMaterial("Material blat", "mat5", "mat-secund-2")
// }
// document.getElementById("mat-secund-3").onclick = function () {
//     setMaterial("Material blat", "mat4", "mat-secund-3")
// }
// document.getElementById("mat-secund-4").onclick = function () {
//     setMaterial("Material blat", "mat3", "mat-secund-4")
// }
// document.getElementById("mat-secund-5").onclick = function () {
//     setMaterial("Material blat", "mat2", "mat-secund-5")
// }
// document.getElementById("mat-secund-6").onclick = function () {
//     setMaterial("Material blat", "mat1", "mat-secund-6")
// }


// document.getElementById("mat-sertare-1").onclick = function () {
//     setMaterial("Material sertare", "mat7", "mat-sertare-1")
// }
// document.getElementById("mat-sertare-2").onclick = function () {
//     setMaterial("Material sertare", "mat6", "mat-sertare-2")
// }
// document.getElementById("mat-sertare-3").onclick = function () {
//     setMaterial("Material sertare", "mat5", "mat-sertare-3")
// }
// document.getElementById("mat-sertare-4").onclick = function () {
//     setMaterial("Material sertare", "mat4", "mat-sertare-4")
// }
// document.getElementById("mat-sertare-5").onclick = function () {
//     setMaterial("Material sertare", "mat3", "mat-sertare-5")
// }
// document.getElementById("mat-sertare-6").onclick = function () {
//     setMaterial("Material sertare", "mat1", "mat-sertare-6")
// }

// document.getElementById("dwonload").onclick = function () {
//     FIGARO_API.takeScreenshot().then((res: any) => {
//         var a = document.createElement('a');
//         a.href = res;
//         a.download = "output.png";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     })
// }

// document.getElementById("scroll-down").onclick = function () {
//     const div = document.getElementById("thumbs")
//     div.scrollTo({
//         top: div.scrollHeight,
//         behavior: 'smooth'
//     })
// }

// document.getElementById("scroll-up").onclick = function () {
//     const div = document.getElementById("thumbs")
//     div.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     })
// }
