const img = document.getElementById("image")

// de posities van de drums, relatief aan de width en height van het plaatje
// de index van de posities in dit plaatje komt overeen met de bestandsnaam van het geluid in "sounds/"
const positions = [
	[0.368, 0.5, 0.359, 0.473],
	[0.406, 0.490, 0.208, 0.287],
	[0.5060, 0.5893, 0.201, 0.2915],
	[0.241, 0.355, 0.242, 0.338],
	[0.317, 0.428, 0.021, 0.123],
	[0.4518, 0.5634, 0.5106, 0.6784],
	[0.5618, 0.669, 0.0583, 0.17314],
	[0.680, 0.808, 0.1183, 0.229],
	[0.5521, 0.66370, 0.3515, 0.4522],
	[0.65642, 0.8140, 0.4116, 0.5689]
]

var correctmoves = []
var level = 1
var correctmovespos = 0

// een variable voor de posities in pixels
var truepositions = positions
var playerturn = false // variable om aan te geven dat de speler aan de beurt is

var lightsarray = Array.from(document.getElementsByClassName('lights')) 

// event listener voor de muisclick
img.addEventListener("click", (event) => {
	if (event.button == 0) { // als het de linker muisknop betreft...
		if (playerturn) { // als alles klaar is...
			// posities van de muis
			let x = event.offsetX 
			let y = event.offsetY
			for (let i = 0; i < truepositions.length; i++) {
				// als de muisklik in het kader van de posities zit, speel dan het desbetreffende geluid af
				if (x > truepositions[i][0] && x < truepositions[i][1] && y > truepositions[i][2] && y < truepositions[i][3]) {
					new Audio("sounds/"+ truepositions.indexOf(truepositions[i]) + ".mp3").play()
					if (truepositions.indexOf(truepositions[i]) == correctmoves[correctmovespos]) {
						correctmovespos++
						if (correctmovespos == correctmoves.length) {
							level++
							cpuTurn()
						}
					} else {
						alert("game over, restarting. You made it to level " + level)
						level = 1
						cpuTurn()
					}
				}
			}
		} 
		// voor het achterhalen van de posities
		//console.log("left mouse button pressed, x:" + event.offsetX + " en y:" + event.offsetY + "\nposities relatief aan de width en height van de image, x:" + event.offsetX/img.width + ", y:" + event.offsetY/img.height)
	}
})

window.onload = () => {
	getTruePositions()
	setLightPositions()
	cpuTurn()
	playerturn = true
}

function getTruePositions() {
	let xfactor = img.width
	let yfactor = img.height
	for (let i = 0; i < positions.length; i++) {
		truepositions[i][0] = positions[i][0] * xfactor
		truepositions[i][1] = positions[i][1] * xfactor
		truepositions[i][2] = positions[i][2] * yfactor
		truepositions[i][3] = positions[i][3] * yfactor
	}
}

function setLightPositions() {
	var i = 0;
	lightsarray.forEach(light => {
		light.style.left = (truepositions[i][0] + truepositions[i][1])/2 - 20 + "px"; 
		light.style.top = (truepositions[i][2] + truepositions[i][3])/2 + 40 + "px"; 
		console.log(light.style.left)
		i++
	});
}

function toggleLight(index) {
	lightsarray[index].classList.toggle('on')
}

function cpuTurn() {
	playerturn = false
	console.log("cpu's turn")
	correctmovespos = 0
	correctmoves = []
	for (let i = 0; i < level; i++) {
		correctmoves.push(Math.floor(Math.random() * 10))
	}
	let i = 0
	let intervalID = setInterval(() => {
		console.log(correctmoves[i])
		if (!(i < level)) {
			clearInterval(intervalID)
			//console.log("condition met with i = " + i)
			playerturn = true
		} else {
			toggleLight(correctmoves[i])
			let a = i
			let id = setInterval(() => {
				toggleLight(correctmoves[a])
				clearInterval(id)
			},1000/2)
			i++
		}
	}, 1000);
}

