
let delay = 300; // Default delay
let bars = [];
let numbers = [];
let sortingSteps = document.getElementById("sortingSteps");

// Updates the speed based on the range input
document.getElementById("speedRange").addEventListener("input", function () {
    delay = parseInt(this.value);
    document.getElementById("speedValue").innerText = `${delay}ms`;
});

// Function to generate the array from user input
function generateArray() {
    let input = document.getElementById("arrayInput").value;
    let array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (array.length === 0) {
        alert("Please enter valid numbers separated by commas.");
        return;
    }

    bars = array;
    numbers = [...array];
    displayArray();
}

// Function to display the array as bars and numbers
function displayArray() {
    let barContainer = document.getElementById("barContainer");
    let numberContainer = document.getElementById("numberContainer");
    barContainer.innerHTML = "";
    numberContainer.innerHTML = "";

    for (let i = 0; i < bars.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${bars[i] * 3}px`;
        barContainer.appendChild(bar);

        let number = document.createElement("div");
        number.classList.add("number");
        number.innerText = numbers[i];
        numberContainer.appendChild(number);
    }
}

// Function to perform Quick Sort with animation
async function quickSort() {
    sortingSteps.innerHTML = "";
    await quickSortHelper(0, bars.length - 1);
    markSorted();
}

// Helper function for Quick Sort
async function quickSortHelper(low, high) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await quickSortHelper(low, pivotIndex - 1);
        await quickSortHelper(pivotIndex + 1, high);
    }
}

// Partition function for Quick Sort
async function partition(low, high) {
    let pivot = bars[high];
    let i = low - 1;

    updateSortingSteps(`Choosing pivot: ${pivot}`);
    
    for (let j = low; j < high; j++) {
        if (bars[j] < pivot) {
            i++;
            updateSortingSteps(`Swapping ${bars[i]} and ${bars[j]}`);
            await swapBars(i, j);
        }
    }
    
    updateSortingSteps(`Swapping pivot ${bars[i + 1]} with ${pivot}`);
    await swapBars(i + 1, high);

    return i + 1;
}

// Function to swap two bars with animation
async function swapBars(i, j) {
    let barContainer = document.getElementById("barContainer").children;
    let numberContainer = document.getElementById("numberContainer").children;

    // Highlight bars being swapped
    barContainer[i].classList.add("swapping");
    barContainer[j].classList.add("swapping");

    await new Promise(resolve => setTimeout(resolve, delay));

    // Swap values
    [bars[i], bars[j]] = [bars[j], bars[i]];
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];

    // Update UI
    barContainer[i].style.height = `${bars[i] * 3}px`;
    barContainer[j].style.height = `${bars[j] * 3}px`;
    numberContainer[i].innerText = numbers[i];
    numberContainer[j].innerText = numbers[j];

    await new Promise(resolve => setTimeout(resolve, delay));

    // Remove swap highlight
    barContainer[i].classList.remove("swapping");
    barContainer[j].classList.remove("swapping");
}

// Function to mark all bars as sorted
function markSorted() {
    let barContainer = document.getElementById("barContainer").children;
    for (let i = 0; i < bars.length; i++) {
        barContainer[i].classList.add("sorted");
    }
    updateSortingSteps("Sorting completed.");
}

// Function to update the sorting process steps
function updateSortingSteps(step) {
    let stepElement = document.createElement("p");
    stepElement.innerText = step;
    sortingSteps.appendChild(stepElement);
    sortingSteps.scrollTop = sortingSteps.scrollHeight;
}

