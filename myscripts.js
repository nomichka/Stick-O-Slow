/*
        Organization: global variables, then eventListeners, then methods
        Current methods: animate(), move(num), process(curr), sortingStarsAfter()
	
	To process the input the user entered and do actions based off that input:
		Check in the process(curr) method if the user is in the correct place to make changes (e.g. if (parClass[curr] === "sorting stars problem"))
			Call a method inside the if statement with a descriptive name (e.g. sortingStarsAfter();)
		Inside the method, do the stuff you want to do
*/
window.addEventListener('load', function(event) {
// ----- GLOBAL VARIABLES -----

// All the names of the paragraph classes
const parClass = [
	"welcome1",
	"welcome2",
	"welcome3",
	"welcome4",
	"sorting stars problem",
	"sorting stars after"
]

const levelmap = [
  0,
  4
]

var level = 0;
var screen = 0;

const changeClass = document.getElementsByClassName("strip");
const stripheight = (window.screen.height)/(changeClass.length);
const width = window.screen.width;
const changetime = 500; //screen change time in ms
document.getElementById("debug").innerHTML = stripheight;
for(let i = 0; i < changeClass.length; i++){
	changeClass[i].style.width = (width + 100) + 'px';
	changeClass[i].style.height = stripheight + 'px';
  	changeClass[i].style.top = stripheight*i + 'px';
	changeClass[i].style.display = "none";
}
var changex = -width-200;

var id;
function screenchange() {
	for(let i = 0; i < changeClass.length; i++){
  	  changeClass[i].style.left = changex - 70*i + 'px';
          changeClass[i].style.display = "block";
  }
  changex = -width-200;
  id = setInterval(changeframe, 10);
}

function changeframe() {
     if(changex > 2*width) {
     		clearInterval(id);       
     } else {
     	changex = changex+width/(changetime/10);
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
	}, changetime);
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
	}, changetime);
}

document.getElementById("toMap").addEventListener("click", function() {
	maprender(level);
});

document.getElementById("map0").addEventListener("click", function() {
	maptoscreen(levelmap[0]);
});

document.getElementById("map1").addEventListener("click", function() {
	maptoscreen(levelmap[1]);
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
  
        // Access the display of each paragraph (only one should be block; rest should be none)
        let paragraphDisplays = [];
        for (let i=0; i<parClass.length;i++) {
                paragraphDisplays.push(getComputedStyle(document.getElementsByClassName(parClass[i])[0]).display);
        }
  
        // Change the display of the current paragraph and the next/prev paragraph (next if num is +1, prev if num is -1)
				unrender(parClass[screen]);
  			screen = screen + num;
        render(parClass[screen]);
        document.getElementById("debug").innerHTML = screen;
        
        
        
	
	// If going to the next paragraph, check if you need to process the input
	if (num === 1) {
		process(screen);
	}
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
function process(curr) {
	// If the next/prev paragraph is "sorting stars after," add to the paragraph and change display of next button depending on the answer given.
  			for(let i = 1; i < levelmap.length; i++){
          if(curr === levelmap[i] && level < i){
            level = 1;
          }
        }
  			
        if (parClass[curr] === "sorting stars after") {
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
	document.getElementsByClassName("sorting stars after")[0].innerHTML = html;
}

});
