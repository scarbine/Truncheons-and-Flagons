import { FinalScoreDisplay } from "./FinalScoreDisplay.js";

export const EnterGameScores = (playingTeam1, playingTeam2, playingTeam3) => {
  chosenTeam1 = playingTeam1;
  chosenTeam2 = playingTeam2;
  chosenTeam3 = playingTeam3;
  setScoreBoard();
  // How do we want to pull values into this function? Pass values or pull from API

  return `
	 <section>
	 	<form >
			<label for="team_1_score">${playingTeam1.teamName}</label>
			<input  type="number" id="team_1_score" name="team_1_score"><br><br>
			<label for="team_2_score">${playingTeam2.teamName}</label>
			<input  type="number" id="team_2_score" name="team_2_score"><br><br>
			<label for="team_3_score">${playingTeam3.teamName}</label>
			<input 	 type="number" id="team_3_score" name="team_3_score"><br><br>	
		</form>
		<button id="submit_round_score"> Submit Score </button>
	 
	 </section>
	 `;
};

const submitRoundScores = () => {
  teamScore1 = parseInt(document.getElementById("team_1_score").value);
  teamScore2 = parseInt(document.getElementById("team_2_score").value);
  teamScore3 = parseInt(document.getElementById("team_3_score").value);

  if (
    Number.isNaN(teamScore1) ||
    Number.isNaN(teamScore2) ||
    Number.isNaN(teamScore3) ||
    teamScore1 < 0 ||
    teamScore2 < 0 ||
    teamScore3 < 0
  ) {
    // CHANGE THIS TO A CLEANER INTERFACE POSSIBLY MODAL	  
    window.alert("These scores are not valid. Please Log a valid score.");
  } else {
    totalTeam1Score += teamScore1;
    totalTeam2Score += teamScore2;
    totalTeam3Score += teamScore3;
    round++;
  }
};

export const setScoreBoard = () => {
  document.getElementById("team_1_scoreboard").innerHTML = totalTeam1Score;
  document.getElementById("team_2_scoreboard").innerHTML = totalTeam2Score;
  document.getElementById("team_3_scoreboard").innerHTML = totalTeam3Score;
  document.getElementById("chosenTeam1").innerHTML = chosenTeam1.teamName;
  document.getElementById("chosenTeam2").innerHTML = chosenTeam2.teamName;
  document.getElementById("chosenTeam3").innerHTML = chosenTeam3.teamName;
};

const mainContainer = document.querySelector(".container");
let round = 1;

export let totalTeam1Score = 0;
export let totalTeam2Score = 0;
export let totalTeam3Score = 0;
let teamScore1 = 0;
let teamScore2 = 0;
let teamScore3 = 0;
let winnerName = "";
let chosenTeam1 = {};
let chosenTeam2 = {};
let chosenTeam3 = {};
const scoresArray = [totalTeam1Score,totalTeam2Score,totalTeam3Score]

document.addEventListener("click", (event) => {
  if (event.target.id === "submit_round_score") {

	  
	if (round < 3) {
	submitRoundScores();
	setScoreBoard();
	mainContainer.innerHTML = EnterGameScores(
        chosenTeam1,
        chosenTeam2,
        chosenTeam3
      );
      return;
    } else {
      submitRoundScores();

      //find the winning score of the game
      //This logic needs to be worked on. Maybe a switch statement

      if (totalTeam1Score > Math.max(totalTeam2Score, totalTeam3Score)) {
        winnerName = chosenTeam1.teamName;
        console.log("Team 1 wins");
      }
      if (totalTeam2Score > Math.max(totalTeam1Score, totalTeam3Score)) {
        winnerName = chosenTeam2.teamName;
        console.log("Team 2 wins");
      }
      if (totalTeam3Score > Math.max(totalTeam2Score, totalTeam1Score)) {
        winnerName = chosenTeam3.teamName;
        console.log("Team 3 wins");
      }

      // !!!This has a bug that if the 2 lower scores are tied it still doesn't throw a winner`   if the game is a tie

      if (
	      
	// sortedWinner[0] === sortedWinner[1]
	 

        (totalTeam1Score === totalTeam2Score && totalTeam1Score === totalTeam3Score) ||
        totalTeam1Score === totalTeam2Score ||
        totalTeam1Score === totalTeam3Score ||
        totalTeam1Score === totalTeam3Score ||
        totalTeam2Score === totalTeam3Score
      ) {
        setScoreBoard();
        mainContainer.innerHTML = EnterGameScores(
          chosenTeam1,
          chosenTeam2,
          chosenTeam3
        );
        console.log("The Game is a tie! You must battle to the death!");
        return;
      }

      // need to push scores to the database here before they get reset for them new game

      setScoreBoard();

      // Reset the total team score counter back to 0
      totalTeam1Score = 0;
      totalTeam2Score = 0;
      totalTeam3Score = 0;
      round = 1;

      mainContainer.innerHTML = FinalScoreDisplay(winnerName);

      // Push data game data to the database
    }
  }
});
