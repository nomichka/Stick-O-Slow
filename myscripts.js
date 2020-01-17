/*

        Organization: global variables, then eventListeners, then process methods, then render methods
        Current methods: animate(), move(num), process(curr), sortingStarsAfter()
	
	To process the input the user entered and do actions based off that input:
		Check in the process(curr) method if the user is in the correct place to make changes (e.g. if (parClass[curr] === "sorting-stars-problem"))
			Call a method inside the if statement with a descriptive name (e.g. sortingStarsAfter();)
		Inside the method, do the stuff you want to do
*/

// ----- GLOBAL VARIABLES -----


// All the names of the paragraph classes
const parClass = [
    "welcome1",
    "welcome2",
    "welcome3",
    "welcome4",
    "sorting-stars-intro-1",
    "sorting-stars-intro-2",
    "sorting-stars-intro-3",
    "sorting-stars-intro-4",
    "sorting-stars-intro-5",
    "sorting-stars-intro-6",
    "sorting-stars-intro-7",
    "sorting-stars-intro-8",
    "sorting-stars-intro-9",
    "sorting-stars-intro-10",
    "sorting-stars-intro-11",
    "sorting-stars-numbers",
    "sorting-stars-problem",
    "sorting-stars-after"
]

const levelMap = [
    0,
    16
]

var level = 0;
var screen = 0;

const changeClass = document.getElementsByClassName("strip");
const stripheight = (window.screen.height)/(changeClass.length);
const width = window.screen.width;
document.getElementById("debug").innerHTML = stripheight;
for(let i = 0; i < changeClass.length; i++){
	changeClass[i].style.width = width + 'px';
	changeClass[i].style.height = stripheight + 'px';
  changeClass[i].style.top = stripheight*i + 'px';
	changeClass[i].style.display = "none";
}
var changex = -width-200;

var id;
  
// Trigger animation
document.getElementById("myButton1").addEventListener("click", animate, false);

document.getElementById("toMap").addEventListener("click", function() {
	maprender(level);
});

document.getElementById("map0").addEventListener("click", function() {
	maptoscreen(levelMap[0]);
});

document.getElementById("map1").addEventListener("click", function() {
	maptoscreen(levelMap[1]);
});

document.getElementById("back").addEventListener("click", function() {
	maptoscreen(screen);
});

// ----- EVENTLISTENERS -----

// Trigger animation

// Move to next paragraph
document.getElementById("next").addEventListener("click", function() {
	move(1);
});

// Move to previous paragraph
document.getElementById("prev").addEventListener("click", function() {
	move(-1);
});


// ----- METHODS -----

// Do actions when the user clicks the next/prev button -> main action is to make the current paragraph have display:none and have the next/prev paragraph have display:block
function move(num) {
	// If the next button isn't being displayed and the user clicks the previous button, re-display the next button
        if (document.getElementById('next').style.display === 'none') {
  	        document.getElementById('next').style.display = "inline-block";
        }
  
        // Change the display of the current paragraph and the next/prev paragraph (next if num is +1, prev if num is -1)
				unrender(parClass[screen]);
  			screen = screen + num;
        render(parClass[screen]);
        document.getElementById("debug").innerHTML = screen;

		process(screen, num);
}

function render(screenclass) {
	let paragraph = document.getElementsByClassName(screenclass);
  for (let i=0; i<paragraph.length;i++){
  	paragraph[i].style.display="block";
  }
}

function unrender(screenclass) {
	let before = document.getElementsByClassName(screenclass);
  for (let i=0; i<before.length;i++){
  	before[i].style.display='none';
  }
}

// Process input if needed; (int) curr = index of current paragraph
function process(curr, num) {
				//Update level
  			if(curr === levelMap[1] && level < 1){
        	level = 1;
        }
  			
	      // If the next/prev paragraph is "sorting stars after," add to the paragraph and change display of next button depending on the answer given.
        if (parClass[curr] === "sorting-stars-after") {
                sortingStarsAfter();
        }
          // If the next/prev paragraph is "sorting stars after," make the set-up.
          if (parClass[curr] === "sorting-stars-intro-1" && num === 1) {
          	sortingStarsIntro1(num);
          }
          
          if (parClass[curr] === "welcome4" && num === -1) {
          	sortingStarsIntro1(num);
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

function sortingStarsIntro1(num) {
		if (num == 1) {
      document.body.style.background = "black";
      document.body.style.color = "white";
    }
    if (num == -1) {
      document.body.style.background = "#f0f0f0";
      document.body.style.color = "black";
    }
  }



// ----- RENDER METHODS -----

function render(screenclass) {
	let paragraph = document.getElementsByClassName(screenclass);
  for (let i=0; i<paragraph.length;i++){
  	paragraph[i].style.display="block";
  }
}

function unrender(screenclass) {
	let before = document.getElementsByClassName(screenclass);
  for (let i=0; i<before.length;i++){
  	before[i].style.display='none';
  }
}

function maprender(lev){
	unrender(parClass[screen]);
  unrender("scroll");
	let maplist = document.getElementsByClassName("map");
  for (let i=0; i<maplist.length;i++){
  	if(level >= i-1){
  		maplist[i].style.display="block";
    }
  }
  render("back");
}

  
function screenchange() {
	for(let i = 0; i < changeClass.length; i++){
  			changeClass[i].style.left = changex - 70*i + 'px';
        changeClass[i].style.display = "block";
  }
  changex = -width-200;
  id = setInterval(changeframe, 10);
}

function changeframe() {
     if(changex > width) {
     		clearInterval(id);       
     } else {
     	changex = changex+width/70;
      for(let i = 0; i < changeClass.length; i++){
  			changeClass[i].style.left = changex - stripheight*i + 'px';
      }
     }
}

function maprender(lev){
	screenchange();
	setTimeout( () => {
    unrender(parClass[screen]);
    unrender("scroll");
    let maplist = document.getElementsByClassName("map");
    for (let i=0; i<maplist.length;i++){
      if(level >= i){
        maplist[i].style.display="block";
      }
    }
    render("back");
	}, 700);
}

function maptoscreen(screennum){
	screenchange();
	setTimeout( () => {
    screen = screennum;
    unrender("map");
    unrender("back");
    render(parClass[screen]);
    document.getElementById('prev').style.display = "inline-block";
    document.getElementById('next').style.display = "inline-block";
	}, 700);
}

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
  
});

