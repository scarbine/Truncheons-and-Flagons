import { FinalScoreDisplay } from "./FinalScoreDisplay.js";

export const EnterGameScores = () => {
	// How do we want to pull values into this function? Pass values or pull from API
  return `
	 <section>
	 	<form >
			<label for="team_1_score">{Team 1 Name Placeholder}</label>
			<input  type="number" id="team_1_score" name="team_1_score"><br><br>
			<label for="team_2_score">{Team 2 Name Placeholder}</label>
			<input  type="number" id="team_2_score" name="team_2_score"><br><br>
			<label for="team_3_score">{Team 3 Name Placeholder}</label>
			<input 	 type="number" id="team_3_score" name="team_3_score"><br><br>	
		</form>
		<button id="submit_round_score"> Submit Score </button>
	 
	 </section>
	 `;
};

const mainContainer = document.querySelector(".container");
let round = 1;

export let totalTeam1Score = 0;
export let totalTeam2Score = 0;
export let totalTeam3Score = 0;

document.addEventListener("click", (event) => {
  if (event.target.id === "submit_round_score") {
    if (round < 3) {
      let teamScore1 = parseInt(document.getElementById("team_1_score").value);
      let teamScore2 = parseInt(document.getElementById("team_2_score").value);
      let teamScore3 = parseInt(document.getElementById("team_3_score").value);
      totalTeam1Score += teamScore1;
      totalTeam2Score += teamScore2;
      totalTeam3Score += teamScore3;
      round++;

      console.log(
        "submit new player is connected",
        teamScore1,
        teamScore2,
        teamScore3,
        totalTeam1Score,
        totalTeam2Score,
        totalTeam3Score
      );
      document.getElementById("team_1_scoreboard").innerHTML = totalTeam1Score;
      document.getElementById("team_2_scoreboard").innerHTML = totalTeam2Score;
      document.getElementById("team_3_scoreboard").innerHTML = totalTeam3Score;

      mainContainer.innerHTML = EnterGameScores();
    } else {
      let teamScore1 = parseInt(document.getElementById("team_1_score").value);
      let teamScore2 = parseInt(document.getElementById("team_2_score").value);
      let teamScore3 = parseInt(document.getElementById("team_3_score").value);
      totalTeam1Score += teamScore1;
      totalTeam2Score += teamScore2;
      totalTeam3Score += teamScore3;

      console.log(
        "the final score is :",
        totalTeam1Score,
        totalTeam2Score,
        totalTeam3Score
      );

//       find the winning score of the game

      if (totalTeam1Score > (Math.max(totalTeam2Score, totalTeam3Score))) {console.log("Team 1 wins")}
      if (totalTeam2Score > (Math.max(totalTeam1Score, totalTeam3Score))) {console.log("Team 2 wins")}
      if (totalTeam3Score > (Math.max(totalTeam2Score, totalTeam1Score))) {console.log("Team 3 wins")}

//       if the game is a tie

      if (totalTeam1Score ===  totalTeam2Score && totalTeam1Score === totalTeam3Score) { 
	mainContainer.innerHTML = EnterGameScores()
	console.log("The Game is a tie! You must battle to the death!")
	return
}
     
      // need to push scores to the database here before they get reset for them new game
      
      round = 1;
      totalTeam1Score = 0;
      totalTeam2Score = 0;
      totalTeam3Score = 0;
      
      document.getElementById("team_1_scoreboard").innerHTML = totalTeam1Score;
      document.getElementById("team_2_scoreboard").innerHTML = totalTeam2Score;
      document.getElementById("team_3_scoreboard").innerHTML = totalTeam3Score;
      mainContainer.innerHTML = FinalScoreDisplay();

    }
  }
});
