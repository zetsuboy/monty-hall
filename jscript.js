var checker = 0, doors = [], correct_door = 0, first_picked_door = 0;
var door_changed_plays = 0, door_changed_wins = 0, door_changed_loses = 0;
var door_not_changed_plays = 0, door_not_changed_wins = 0, door_not_changed_loses = 0;

function door(number, correct) {
	return {
		number: number,
		correct: correct
	}
}

function create_doors() {
	checker = 0;	
	for (let i = 0; i < 3; i++) {
		doors[i] = door(i, 0);
	}
	correct_door = Math.floor(Math.random() * 3);
	doors[correct_door].correct = 1;
}

function refresh() {
	for (let i = 0; i < 3; i++) {
		document.getElementById(`door${i + 1}`).disabled = false;
		document.getElementById(`door${i + 1}`).setAttribute('onclick', 'door_click(this)');
		document.getElementById(`door${i + 1}`).className = "door";
	}
	create_doors();
}

function door_click(obj) {
	var door_number = parseInt(obj.id.slice(-1));
	var wrong_doors = [];
	if (checker == 0) {
		first_picked_door = door_number - 1;
		obj.className = "picked_door";
		checker = 1;
		for (let i = 0; i < 3; i++) {
			if (doors[i].correct == 0 && doors[i].number != door_number - 1) {
				wrong_doors.push(doors[i]);
			}
		}
		var x = Math.floor(Math.random() * wrong_doors.length);
		document.getElementById(`door${wrong_doors[x].number + 1}`).className = "wrong_door";
		document.getElementById(`door${wrong_doors[x].number + 1}`).setAttribute('onclick', '');
	}
	else if (checker == 1) {
		for (let i = 0; i < 3; i ++) {
			if (doors[i].correct == 0) {
				document.getElementById(`door${doors[i].number + 1}`).className = "wrong_door";
			}
			else {
				document.getElementById(`door${doors[i].number + 1}`).className = "correct_door";
			}
		}
		if (door_number - 1 == first_picked_door) {
			if (door_number - 1 == correct_door) {
				door_not_changed_plays++;
				door_not_changed_wins++;
			}
			else {
				door_not_changed_plays++;
				door_not_changed_loses++;
			}
		}
		else {
			if (door_number - 1 == correct_door) {
				door_changed_plays++;
				door_changed_wins++;
			}
			else {
				door_changed_plays++;
				door_changed_loses++;
			}
		}
		document.getElementById("stats_door_changed").innerHTML = `<b><center>Выбрана другая дверь</center></b>
		<p>Всего попыток: ${door_changed_plays}</p>
		<p>Побед: ${door_changed_wins}</p>
		<p>Поражений: ${door_changed_loses}</p>`;
		document.getElementById("stats_door_not_changed").innerHTML = `<b><center>Выбрана исходная дверь</center></b>
		<p>Всего попыток: ${door_not_changed_plays}</p>
		<p>Побед: ${door_not_changed_wins}</p>
		<p>Поражений: ${door_not_changed_loses}</p>`;
		checker = 2;
	}
}
