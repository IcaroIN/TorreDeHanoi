// Disk start positions
let towers = [[5, 4, 3, 2, 1], [], []];
// All position class names
let positions = [
  "position0",
  "position1",
  "position2",
  "position3",
  "position4",
  "position5",
  "tower1",
  "tower2",
  "tower3",
];
// Disk movement array
let movements = [];

// Clear positions (remove class names)
function clearDiskPositions(diskElement) {
  positions.forEach((position) => {
    diskElement.classList.remove(position);
  });
}

// Render towers on screen
function renderTowers() {
  towers.forEach((tower, towerIndex) => {
    tower.forEach((disk, diskIndex) => {
      let diskElement = document.querySelector(`.disk${disk}`);

      clearDiskPositions(diskElement);

      // Add start position to disk
      diskElement.classList.add(`tower${towerIndex + 1}`);
      diskElement.classList.add(`position${diskIndex + 1}`);
    });
  });
}

function moveDisk(fromTower, toTower) {
  // Do not allow movement when the origin tower has no disks
  if (!towers[fromTower].length) {
    return;
  }

  let disk = towers[fromTower].pop(); // Remove disk from origin tower array

  // Do not allow a larger disk to go on top of a smaller disk
  if (
    towers[toTower].length &&
    towers[toTower][(towers[toTower].length - 1)] < disk
  ) {
    return towers[fromTower].push(disk);
  }

  let diskElement = document.querySelector(`.disk${disk}`);

  diskElement.classList.add("position0"); // Move disk to top of screen
  towers[toTower].push(disk); // Add disk to destination tower array
  setTimeout(renderTowers, 400); // 0.4 seconds
}

// Add movements according to tower clicks
function clickTower(towerNumber) {
  if (movements.length && movements[0].length == 1) {
    movements[0].push(towerNumber);
  } else {
    movements.unshift([towerNumber]);
  }
}

// Perform the movements
setInterval(() => {
  if (movements.length && movements[movements.length - 1].length == 2) {
    let movement = movements.pop();
    moveDisk(movement[0], movement[1]);
  }
}, 600); // 0.6 seconds

// Solve the tower of Hanoi in the fewest movements
function solveTowerOfHanoi(numberOfDisks, fromTower, toTower) {
  if (numberOfDisks == 1) {
    return movements.unshift([fromTower, toTower]);
  }
  
  let otherTower = 3 - (fromTower + toTower);
  solveTowerOfHanoi((numberOfDisks - 1), fromTower, otherTower)
  movements.unshift([fromTower, toTower]);
  solveTowerOfHanoi((numberOfDisks - 1), otherTower, toTower)
}

// Render towers
renderTowers();

// Solve tower of Hanoi
setTimeout(() => {
  solveTowerOfHanoi(5, 0, 2);
}, 2000);
