// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};
var i = 0;
var commands = "rffrfflfrff";
// ======================
// functions left and right,
function turnLeft(rover) {
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
    default:
      console.log("Houston, we have a problem!");
      break;
  }
  console.log("The new direction is " + rover.direction);
}

function turnRight(rover) {
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
    default:
      console.log("Houston, we have a problem!");
      break;
  }
  console.log("The new direction is " + rover.direction);
}

//function moveForward change the rover position depending on the direction (iteration 3) prevents it from leaving the control area (bonus)

function moveForward(rover) {
  console.log("moveForward was called");
  if (rover.direction == "N" && rover.y > 0) {
    rover.y = rover.y - 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  } else if (rover.direction == "S" && rover.y < 9) {
    rover.y = rover.y + 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  } else if (rover.direction == "W" && rover.x > 0) {
    rover.x = rover.x - 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  } else if (rover.direction == "E" && rover.y < 9) {
    rover.x = rover.x + 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  }
}

//function executeCommands receives a variable that contains a string with the commands and executes them.

function executeCommands() {
  validateCommands();
  for (i = 0; i <= commands.length; i++) {
    switch (commands.charAt(i)) {
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
    }
    lastPositions();
  }
  console.log(
    commands.length +
      " commands has been executed.The new position is " +
      rover.x +
      "," +
      rover.y +
      ". The positions have been: "
  );
  console.log(rover.travelLog); //I dont like the console output concatenating rover.travelLog that's why I added another console.log
}

//function lastPositions: transform the value of rover.x and rover.y into a string that is stored in an array within the travelLog property of the rover object.

function lastPositions() {
  rover.travelLog.push(`${rover.x}` + "," + `${rover.y}`);
}

// bonus: function dontGoOut, control function that would return the rover to the control area. Due to the reconfiguration of the moveForward function it would not be necessary to use it.

function dontGoOut(rover) {
  if (rover.x < 0 || rover.x > 9) {
    turnRight(rover);
    turnRight(rover);
    moveForward(rover);
    console.log(
      "The rover was in a prohibited area, activated reentry maneuver."
    );
  } else if (rover.y < 1 || rover.y > 9) {
    turnRight(rover);
    turnRight(rover);
    moveForward(rover);
    console.log(
      "The rover was in a prohibited area, activated reentry maneuver."
    );
  }
}

//backWard function: change the rover position depending on the direction prevents it from leaving the control area (bonus)

function moveBackward(rover) {
  console.log("moveBackward was called");
  if (rover.direction == "N" && rover.y < 9) {
    rover.y = rover.y + 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  } else if (rover.direction == "S" && rover.y > 0) {
    rover.y = rover.y - 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  } else if (rover.direction == "W" && rover.x < 9) {
    rover.x = rover.x + 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  } else if (rover.direction == "E" && rover.x > 0) {
    rover.x = rover.x - 1;
    console.log(
      "The new position is " + rover.x + "," + rover.y + " All right!!"
    );
  }
}

// function validateCommands, check that the values of the commands are b,f,l or r.

function validateCommands() {
  var expreg = new RegExp("[^bflr]");

  if (expreg.test(commands)) {
    console.log(
      "The commands are not correct, check them before executing them!. The only valid codes are: b,f,l or r."
    );
  } else {
    console.log("The commands are correct, proceed with the movements!");
  }
}

//Grid with obstacles for the rover. If the rover’s next move would run it into an obstacle, stop it from moving forward and report the obstacle as found with console.log

var grid = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, "O", null, null, null, null, null, null, null],
  [null, null, null, null, "O", null, null, null, null, null],
  [null, null, null, null, null, null, null, "O", null, null],
  [null, null, "O", null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, "O", null, null],
  [null, null, null, null, null, "O", null, null, null, null],
  [null, "O", null, null, null, null, null, null, null, null],
  [null, null, "O", null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null]
];

for (var i = 0; i < grid.length; i++) {
  var row = grid[i];

  for (var j = 0; j < row.length; j++) {
    var column = row[j];

    if (column === "O") {
      console.log("Obstacle found at: " + i + ", " + j);
      moveBackward(rover);
    } else {
      moveForward(rover);
    }
  }
}
