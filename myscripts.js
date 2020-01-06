/*
        Organization: global variables, then eventListeners, then methods
        Current methods: animate(), move(num), process(curr), sortingStarsAfter()
	
	To process the input the user entered and do actions based off that input:
		Check in the process(curr) method if the user is in the correct place to make changes (e.g. if (parClass[curr] === "sorting stars problem"))
			Call a method inside the if statement with a descriptive name (e.g. sortingStarsAfter();)
		Inside the method, do the stuff you want to do
*/

// ----- GLOBAL VARIABLES -----

// All the names of the paragraph classes
window.addEventListener('load', function(event) {
  const parClass = [
    "welcome1",
    "welcome2",
    "welcome3",
    "welcome4",
    "sorting-stars-problem",
    "sorting-stars-after"
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

  document.getElementsByClass('sorting-stars-problem')[1].onkeydown = function(e){
     if(e.keyCode == 13){
       alert("Entered");
     }
  };


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
    // If the next button isn't being displayed and the user clicks the previous button, re-display the next button
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

    // If going to the next paragraph, check if you need to process the input
    if (num === 1) {
      process(index);
    }
  }

  // Process input if needed; (int) curr = index of current paragraph
  function process(curr) {
    // If the next/prev paragraph is "sorting stars after," add to the paragraph and change display of next button depending on the answer given.
          if (parClass[curr] === "sorting-stars-problem") {
                  sortingStarsAfter();
          }
  }

  // Do actions on whether or not they got the first problem correct. Correct answer is 25.
  function sortingStarsAfter() {
    const answer = document.getElementsByName("answer")[0].value;
          let html = "";
          if (answer == 25) {
                  html =  "Good job! \\(^.^)/";
          } else {
              document.getElementById('next').style.display = 'none';
                  html = "Sorry, try again! /(v.v)\\";
          }
    document.getElementsByClassName("sorting-stars-after")[0].innerHTML = html;
  }
});
