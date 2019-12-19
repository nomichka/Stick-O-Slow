/*
        Organization: global variables, then eventListeners, then methods
        Current methods: animate(), move(num)
*/

// ----- GLOBAL VARIABLES -----

// All the names of the paragraph classes
const parClass = [
	"welcome1",
	"welcome2",
	"welcome3",
	"welcome4",
	"problem1",
	"after1"
]


// ----- EVENTLISTENERS -----

// Trigger animation
document.getElementById("myButton1").addEventListener("click", animate, false);

// Move to next paragraph
document.getElementById("next").addEventListener("click", function() {
	move(1);
});

// Move to previous paragraph
document.getElementById("prev").addEventListener("click", function() {
	move(-1);
});


// ----- METHODS -----

// Cute animation to cheer you up!
function animate() {
        let cute = document.getElementById("myButton1");
        switch (cute.value) {
                case "1":
                        cute.innerHTML = "(v0.0)v  &lt(^.^&gt)";
                        cute.value = "2";
                        break;
                case "2":
                        cute.innerHTML = "(/^.^)/\\(^.^\\)";
                        cute.value = "3";
                        break;
                case "3":
                        cute.innerHTML = "&lt(v.v)&gt";
                        cute.value = "1";
                        break;
                default:
                        cute.innerHTML = "ERROR";
                        cute.value = "3";
        }
}

// Do actions when the user clicks the next/prev button -> main action is to make the current paragraph have display:none and have the next/prev paragraph have display:block
function move(num) {
	// If the next button isn't being displayed and the user clicks
        // the previous button, re-display the next button
        if (document.getElementById('next').style.display === 'none') {
  	        document.getElementById('next').style.display = "inline-block";
        }
  
        // Access the display of each paragraph (only one should be block; rest should be none)
        let paragraphDisplays = [];
        for (let i=0; i<parClass.length;i++) {
                paragraphDisplays.push(getComputedStyle(document.getElementsByClassName(parClass[i])[0]).display);
        }
  
        // Change the display of the current paragraph and the next/prev paragraph (next if num is +1, prev if num is -1)
        const index = paragraphDisplays.indexOf("block");
        let paragraph = document.getElementsByClassName(parClass[index + num]);
        for (let i=0; i<paragraph.length;i++){
                paragraph[i].style.display="block";
        }
        let before = document.getElementsByClassName(parClass[index]);
        for (let i=0; i<before.length;i++){
                before[i].style.display='none';
        }

        // If the next/prev paragraph is "after1," add to the paragraph and change display of next button depending on the answer given.
        if (parClass[index + num] === "after1") {
                const answer = document.getElementsByName("answer")[0].value;
                const html = after1(answer);
                document.getElementsByClassName("after1")[0].innerHTML = html;
        }
}

// Do actions on whether or not they got the first problem correct. Correct answer is 25.
function after1(answer) {
        if (answer == 25) {
                return "Good job! \\(^.^)/";
        } else {
  	        document.getElementById('next').style.display = 'none';
                return "Sorry, try again! /(v.v)\\";
        }
}
