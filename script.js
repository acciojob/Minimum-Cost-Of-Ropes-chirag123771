function calculateMinCost() {
  const inputElement = document.getElementById('ropesInput');
  const resultElement = document.getElementById('result');

  // Get the input value and convert it into an array of integers
  const inputValues = inputElement.value.split(',').map(value => parseInt(value.trim(), 10));

  // Calculate the minimum cost of connecting the ropes
  const minimumCost = connectRopes(inputValues);

  // Display the result in the resultElement
  resultElement.textContent = `Minimum Cost: ${minimumCost}`;
}

// Function to calculate the minimum cost of connecting ropes
function connectRopes(ropes) {
  let totalCost = 0;

  // Use a priority queue (min heap) to efficiently get the minimum ropes
  const minHeap = new MinHeap(ropes);

  // Continue connecting ropes until there is only one rope left
  while (minHeap.size() > 1) {
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    const currentCost = rope1 + rope2;
    totalCost += currentCost;

    // Insert the newly connected rope back into the min heap
    minHeap.insert(currentCost);
  }

  return totalCost;
}

// MinHeap class for efficient heap operations
class MinHeap {
  constructor(data = []) {
    this.heap = [...data];
    this.buildHeap();
  }

  buildHeap() {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = lastValue;
      this.heapifyDown(0);
    }

    return minValue;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp(index) {
    let currentIdx = index;

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      if (this.heap[currentIdx] < this.heap[parentIdx]) {
        [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]];
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    let currentIdx = index;

    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let smallestChildIdx = currentIdx;

      if (leftChildIdx < this.size() && this.heap[leftChildIdx] < this.heap[smallestChildIdx]) {
        smallestChildIdx = leftChildIdx;
      }

      if (rightChildIdx < this.size() && this.heap[rightChildIdx] < this.heap[smallestChildIdx]) {
        smallestChildIdx = rightChildIdx;
      }

      if (smallestChildIdx !== currentIdx) {
        [this.heap[currentIdx], this.heap[smallestChildIdx]] = [this.heap[smallestChildIdx], this.heap[currentIdx]];
        currentIdx = smallestChildIdx;
      } else {
        break;
      }
    }
  }
}
