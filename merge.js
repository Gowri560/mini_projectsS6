// let array = [];
// let delay = 300;

// document.getElementById("speedRange").addEventListener("input", function () {
//     delay = parseInt(this.value); // Ensure delay is an integer
//     document.getElementById("speedValue").textContent = delay + "ms";
// });

// document.getElementById("generateArray").addEventListener("click", generateArray);
// document.getElementById("startSorting").addEventListener("click", function () {
//     if (array.length === 0) {
//         alert("Please generate an array first!");
//         return;
//     }
//     startMergeSort();
// });

// function generateArray() {
//     const input = document.getElementById("arrayInput").value;
//     array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
//     displayArray();
//     clearSortingProcess();
// }

// function displayArray() {
//     const barContainer = document.getElementById("barContainer");
//     const numberContainer = document.getElementById("numberContainer");

//     barContainer.innerHTML = "";
//     numberContainer.innerHTML = "";

//     array.forEach((value) => {
//         const bar = document.createElement("div");
//         bar.classList.add("bar");
//         bar.style.height = `${value * 3}px`;
//         barContainer.appendChild(bar);

//         const num = document.createElement("div");
//         num.classList.add("number");
//         num.textContent = value;
//         numberContainer.appendChild(num);
//     });
// }

// function clearSortingProcess() {
//     document.getElementById("sortingProcess").innerHTML = "";
// }

// async function mergeSort(left, right) {
//     if (left >= right) return;
//     let mid = Math.floor((left + right) / 2);
//     await mergeSort(left, mid);
//     await mergeSort(mid + 1, right);
//     await merge(left, mid, right);
// }

// async function merge(left, mid, right) {
//     let n1 = mid - left + 1;
//     let n2 = right - mid;

//     let L = new Array(n1);
//     let R = new Array(n2);

//     for (let i = 0; i < n1; i++) {
//         L[i] = array[left + i];
//     }
//     for (let j = 0; j < n2; j++) {
//         R[j] = array[mid + 1 + j];
//     }

//     let i = 0;
//     let j = 0;
//     let k = left;

//     while (i < n1 && j < n2) {
//         // Visualize comparison
//         await highlightBars(left + i, mid + 1 + j);
//         await sleep(delay);

//         if (L[i] <= R[j]) {
//             array[k] = L[i];
//             // Visualize swap/placement
//             await updateBar(k, array[k]);
//             i++;
//         } else {
//             array[k] = R[j];
//             // Visualize swap/placement
//             await updateBar(k, array[k]);
//             j++;
//         }
//         k++;
//     }

//     while (i < n1) {
//         array[k] = L[i];
//         // Visualize placement
//         await updateBar(k, array[k]);
//         i++;
//         k++;
//     }

//     while (j < n2) {
//         array[k] = R[j];
//         // Visualize placement
//         await updateBar(k, array[k]);
//         j++;
//         k++;
//     }
// }

// async function startMergeSort() {
//     clearSortingProcess();
//     await mergeSort(0, array.length - 1);
//     // Optionally add a final visualization when sorting is complete
//     highlightSorted();
// }

// async function highlightBars(index1, index2) {
//     const bars = document.querySelectorAll("#barContainer .bar");
//     bars[index1].style.backgroundColor = "rgb(255, 140, 0)";
//     bars[index2].style.backgroundColor = "rgb(255, 140, 0)";
//     await sleep(delay);
//     bars[index1].style.backgroundColor = "";
//     bars[index2].style.backgroundColor = "";
// }

// async function updateBar(index, value) {
//     const bars = document.querySelectorAll("#barContainer .bar");
//     const numbers = document.querySelectorAll("#numberContainer .number");
//     bars[index].style.height = `${value * 3}px`;
//     numbers[index].textContent = value;
//     await sleep(delay);
// }

// async function highlightSorted() {
//     const bars = document.querySelectorAll("#barContainer .bar");
//     for (let i = 0; i < bars.length; i++) {
//         bars[i].style.backgroundColor = "white";
//         // await sleep(50); // Optional delay for visualization
//     }
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

let array = [];
let delay = 300;

document.getElementById("speedRange").addEventListener("input", function () {
    delay = parseInt(this.value); // Ensure delay is an integer
    document.getElementById("speedValue").textContent = delay + "ms";
});

document.getElementById("generateArray").addEventListener("click", generateArray);
document.getElementById("startSorting").addEventListener("click", function () {
    if (array.length === 0) {
        alert("Please generate an array first!");
        return;
    }
    clearSortingProcess();
    startMergeSort();
});

function generateArray() {
    const input = document.getElementById("arrayInput").value;
    array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    displayArray();
    clearSortingProcess();
}

function displayArray() {
    const barContainer = document.getElementById("barContainer");
    const numberContainer = document.getElementById("numberContainer");

    barContainer.innerHTML = "";
    numberContainer.innerHTML = "";

    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        barContainer.appendChild(bar);

        const num = document.createElement("div");
        num.classList.add("number");
        num.textContent = value;
        numberContainer.appendChild(num);
    });
}

function clearSortingProcess() {
    document.getElementById("sortingProcess").innerHTML = "";
}

function logSortingStep(message, currentArray) {
    const sortingProcessDiv = document.getElementById("sortingProcess");
    const step = document.createElement("p");
    step.textContent = message + ": [" + currentArray.join(", ") + "]";
    sortingProcessDiv.appendChild(step);
    sortingProcessDiv.scrollTop = sortingProcessDiv.scrollHeight; // Scroll to bottom
}

async function mergeSort(left, right) {
    logSortingStep(`MergeSort called for subarray ${left}-${right}`, array.slice(left, right + 1));
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    logSortingStep(`Merging ${left}-${mid} and ${mid + 1}-${right}`, array.slice(left, right + 1));

    let n1 = mid - left + 1;
    let n2 = right - mid;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = array[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = array[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        logSortingStep(`Comparing ${L[i]} and ${R[j]}`, array.slice(left, right + 1));
        await highlightBars(left + i, mid + 1 + j);
        await sleep(delay);

        if (L[i] <= R[j]) {
            logSortingStep(`Placed ${L[i]} at index ${k}`, array.slice(0));
            array[k] = L[i];
            await updateBar(k, array[k]);
            i++;
        } else {
            logSortingStep(`Placed ${R[j]} at index ${k}`, array.slice(0));
            array[k] = R[j];
            await updateBar(k, array[k]);
            j++;
        }
        k++;
    }

    while (i < n1) {
        logSortingStep(`Placed remaining ${L[i]} at index ${k}`, array.slice(0));
        array[k] = L[i];
        await updateBar(k, array[k]);
        i++;
        k++;
    }

    while (j < n2) {
        logSortingStep(`Placed remaining ${R[j]} at index ${k}`, array.slice(0));
        array[k] = R[j];
        await updateBar(k, array[k]);
        j++;
        k++;
    }
    logSortingStep(`Merged subarray ${left}-${right}`, array.slice(left, right + 1));
}

async function startMergeSort() {
    clearSortingProcess();
    logSortingStep("Merge Sort Started!", array.slice(0));
    await mergeSort(0, array.length - 1);
    logSortingStep("Merge Sort Completed!", array.slice(0));
    highlightSorted();
}

async function highlightBars(index1, index2) {
    const bars = document.querySelectorAll("#barContainer .bar");
    if (bars[index1]) bars[index1].style.backgroundColor = "rgb(255, 140, 0";
    if (bars[index2]) bars[index2].style.backgroundColor = "rgb(255, 140, 0";
    await sleep(delay);
    if (bars[index1]) bars[index1].style.backgroundColor = "";
    if (bars[index2]) bars[index2].style.backgroundColor = "";
}

async function updateBar(index, value) {
    const bars = document.querySelectorAll("#barContainer .bar");
    const numbers = document.querySelectorAll("#numberContainer .number");
    bars[index].style.height = `${value * 3}px`;
    numbers[index].textContent = value;
    await sleep(delay);
}

async function highlightSorted() {
    const bars = document.querySelectorAll("#barContainer .bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "white";
        // await sleep(50); // Optional delay for visualization
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}