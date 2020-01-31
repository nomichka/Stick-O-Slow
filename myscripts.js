/*
        Organization: global variables, then eventListeners, then process methods, then render methods

        Current methods: animate(), move(num), process(curr), sortingStarsAfter()
	
	To process the input the user entered and do actions based off that input:
		Check in the process(curr) method if the user is in the correct place to make changes (e.g. if (parClass[curr] === "sorting-stars-problem"))
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
    "sorting-stars-numbers-after",
    "learn-to-sort",
    "learn-to-sort-1",
    "learn-to-sort-2",
    "learn-to-sort-3",
    "sorting-stars-problem",
    "sorting-stars-after"
 ]

const levelmap = [
  0,
  4
]

let level = 0;
let screen = 0;

let sortingStarsNumbers = [];
let sortingStarsNumbersSorted = [];
let sortingStarsNumber = 0;

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

// Trigger animation
document.getElementById("myButton1").addEventListener("click", animate, false);

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

document.getElementById("insertion").addEventListener("click", function() {
	learnSort("insertion");
});
document.getElementById("quick").addEventListener("click", function() {
	learnSort("quick");
});
document.getElementById("merge").addEventListener("click", function() {
	learnSort("merge");
});

// ----- METHODS -----

// Do actions when the user clicks the next/prev button -> main action is to make the current paragraph have display:none and have the next/prev paragraph have display:block
function move(num) {
	// If the next button isn't being displayed and the user clicks the previous button, re-display the next button
        if (document.getElementById('next').style.display === 'none') {
  	        document.getElementById('next').style.display = "inline-block";
        }
        if (document.getElementById('next').innerHTML !== 'Next') {
        	document.getElementById('next').innerHTML = 'Next';
        }
        // Change the display of the current paragraph and the next/prev paragraph (next if num is +1, prev if num is -1)
				unrender(parClass[screen]);
  			screen = screen + num;
        render(parClass[screen]);
        document.getElementById("debug").innerHTML = screen;

	// Process the input
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
  			if(curr === 4 && level < 1){
        	level = 1;
        }
        for(let i = 1; i < levelmap.length; i++){
          if(curr === levelmap[i] && level < i){
            level = 1;
          }
        }
  			// If the next/prev paragraph is "sorting stars after," make the set-up.
          if (parClass[curr] === "sorting-stars-intro-1" && num === 1) {
          	sortingStarsIntro1(num);
          }
          // If you go backwars to "welcome4," re-set the set-up.
          if (parClass[curr] === "welcome4" && num === -1) {
          	sortingStarsIntro1(num);
          }
          if (parClass[curr] === "welcome4") {
          	document.getElementById("next").innerHTML = "Let's go!";
          }
          if (parClass[curr] === "sorting-stars-intro-3") {
          	document.getElementById("next").innerHTML = "Next...";
          }
          if (parClass[curr] === "sorting-stars-intro-4") {
          	document.getElementById("next").innerHTML = "Yeah...";
          }
          if (parClass[curr] === "sorting-stars-intro-8") {
          	document.getElementById("next").innerHTML = "Next :(";
          }
          if (parClass[curr] === "sorting-stars-intro-10") {
          	document.getElementById("next").innerHTML = "Of course!";
          }
          if (parClass[curr] === "sorting-stars-intro-11") {
          	document.getElementById("next").innerHTML = "Next :)";
          }
          // Give a good job and figure out the answer if the numbers were made correctly, or write the error if wrong in this paragraph.
          if (parClass[curr] === "sorting-stars-numbers-after" && num === 1) {
          	sortingStarsNumbersAfter();
          }
	      // If the next/prev paragraph is "sorting stars after," add to the paragraph and change display of next button depending on the answer given.
          if (parClass[curr] === "sorting-stars-after") {
                  sortingStarsAfter();
          }
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
function sortingStarsNumbersAfter() {
	const numbers = document.getElementsByName("sorting-stars-numbers-answer")[0].value;
  if (!numbers.includes(", ")) {
  	const html = "Sorry, improper format! Were your numbers comma-and-space-seperated?"
    document.getElementById('next').style.display = 'none';
  	document.getElementsByClassName("sorting-stars-numbers-after")[0].innerHTML = html;
    return;
  }
  // first, assume good format
  let str = "";
  let comma = -1;
  let nums = 0;
  let array = [];
  let arrayString = "";
  let i = 0;
  let html = "";
  let html2 = "";
  let works = true;
  while (numbers.substring(i).includes(",")) {
  	comma = numbers.substring(i).indexOf(",") + i;
    str = numbers.substring(i, comma);
    if (isNaN(str)) {
    	html = "Sorry, improper format! Did you only use numbers, commas, and spaces?";
      works = false;
    	break;
    } if (array.includes(Number(str))) {
    	html = "Sorry, not all of your numbers are distinct! Error at number: " + str;
      works = false;
      break;
    }
    array.push(Number(str));
    arrayString += str + ", ";
    i = comma + 2;
  }
  array.push(Number(numbers.substring(i)));
  arrayString += str;
  if (array.length != 1000) {
  	html = "Did you enter 1000 numbers?";
    works = false;
  }
  if (!works) {
    document.getElementById('next').style.display = 'none';
  } else {
  	html = "Nice, I've saved your 1000 volumes of your 1000 stars!";
    html2 = arrayString;
    sortingStarsNumbers = array;
    sortingStarsNumbersSorted = array.concat().sort();
    sortingStarsNumber = sortingStarsNumbers[420];
  }
  document.getElementsByClassName("sorting-stars-numbers-after")[0].innerHTML = html;
	document.getElementsByClassName("sorting-stars-problem")[2].innerHTML = html2;
  // Example answer: 3401; Example numbers: 1196, 2125, 203, 79, 2079, 9318, 3558, 2699, 634, 660, 3486, 1938, 6, 3430, 4435, 1890, 4769, 1081, 2128, 311, 1294, 4484, 389, 1826, 2853, 22, 92, 964, 8173, 4099, 345, 2379, 39, 653, 4263, 532, 4928, 2091, 1403, 2438, 3986, 878, 968, 6886, 1126, 927, 7, 1774, 3803, 501, 3684, 610, 1030, 3966, 2263, 223, 3928, 4898, 4392, 5741, 3865, 665, 586, 2947, 716, 1827, 2319, 2027, 3099, 3648, 2627, 5455, 151, 1396, 2837, 2716, 952, 2826, 2612, 3528, 1153, 6369, 715, 727, 1978, 3740, 2577, 3534, 2952, 172, 803, 1855, 722, 645, 162, 6539, 2983, 2050, 1781, 948, 3362, 3996, 1664, 607, 1725, 590, 2881, 1009, 49, 3220, 25, 3331, 482, 4711, 4905, 2809, 3254, 759, 6123, 2261, 394, 1677, 3406, 3184, 2103, 1374, 4159, 248, 6167, 160, 1218, 7395, 953, 287, 56, 2713, 7951, 4009, 8935, 863, 2249, 396, 1303, 3814, 1545, 3256, 117, 1530, 84, 5352, 6240, 5628, 2625, 3065, 999, 5, 4273, 5626, 1039, 3231, 377, 6738, 1981, 247, 8873, 2342, 2792, 6888, 441, 666, 1147, 843, 9043, 2149, 2233, 523, 266, 6423, 4331, 2437, 5038, 60, 614, 1686, 919, 6751, 1651, 4141, 3170, 1529, 3573, 865, 988, 6414, 4506, 1968, 386, 2231, 6952, 3801, 351, 7429, 907, 3813, 6439, 3578, 4791, 1034, 812, 96, 5022, 402, 130, 2440, 417, 4129, 1357, 2346, 4681, 771, 973, 1346, 400, 1870, 889, 2457, 1780, 1173, 403, 5093, 5132, 826, 471, 97, 4805, 53, 696, 1047, 230, 1054, 2053, 1214, 197, 1221, 4398, 269, 129, 5812, 6813, 2788, 4694, 6698, 34, 746, 2459, 5058, 5984, 1431, 194, 6321, 100, 897, 355, 1007, 4548, 1367, 4008, 1504, 1949, 4962, 2345, 6318, 949, 1783, 4420, 4439, 170, 3617, 752, 701, 2943, 6162, 822, 3068, 2038, 2553, 603, 4481, 1738, 4798, 2292, 190, 5394, 1940, 109, 1455, 1273, 7203, 8046, 6019, 2750, 486, 638, 89, 7076, 793, 1345, 1188, 4297, 3357, 365, 6039, 5266, 4, 327, 2166, 1586, 1816, 2636, 4656, 3788, 2665, 1088, 319, 721, 908, 618, 5643, 5579, 1493, 4027, 9248, 146, 3583, 139, 67, 3039, 6236, 4563, 568, 1166, 1821, 347, 222, 5664, 5670, 868, 1129, 4414, 518, 2416, 972, 4730, 4868, 1491, 5834, 6541, 270, 147, 4070, 1621, 4195, 263, 2327, 7747, 58, 2029, 2692, 2058, 3905, 4559, 775, 5007, 4411, 1012, 2808, 4151, 9222, 2314, 57, 191, 8163, 8010, 3868, 672, 41, 860, 753, 1062, 2955, 91, 1962, 6389, 4020, 21, 2192, 204, 9390, 747, 14, 387, 2914, 1167, 1369, 1740, 8754, 931, 3028, 1825, 754, 1460, 1646, 426, 1375, 4532, 1001, 1419, 250, 2, 76, 3401, 2214, 2032, 1865, 278, 1240, 1572, 1087, 587, 857, 8591, 5886, 5631, 246, 2825, 3818, 825, 2068, 102, 6150, 234, 1752, 1414, 4058, 2982, 2549, 929, 5061, 3682, 6042, 5142, 7668, 1353, 994, 2500, 2401, 3946, 2857, 850, 2066, 2741, 781, 2967, 3212, 3597, 5102, 640, 1315, 2187, 4449, 8858, 2142, 6776, 1407, 2964, 182, 1590, 1861, 6082, 1716, 1723, 2117, 4865, 923, 1280, 1619, 3972, 1786, 6139, 2191, 1503, 6130, 1029, 733, 5450, 1479, 4792, 6905, 235, 2389, 3536, 1952, 6926, 497, 6664, 409, 4861, 2986, 268, 3291, 1388, 413, 2824, 5748, 7481, 7151, 6616, 661, 2039, 636, 1969, 212, 478, 152, 604, 20, 2641, 1655, 4614, 6141, 5066, 3950, 1233, 6995, 2999, 373, 1037, 1268, 2121, 6064, 4290, 52, 415, 5088, 2794, 4288, 2101, 5588, 890, 5625, 554, 601, 1178, 3396, 530, 5597, 285, 1074, 3381, 2770, 6503, 932, 2442, 2559, 5357, 145, 6295, 1467, 1690, 1682, 885, 8632, 2036, 7006, 276, 2226, 1801, 691, 4467, 7250, 1333, 558, 3639, 1631, 260, 66, 476, 1495, 4111, 4885, 1617, 534, 2696, 7244, 1288, 598, 2280, 1366, 539, 2449, 3579, 3364, 5478, 429, 830, 4672, 370, 658, 350, 2473, 2918, 420, 5740, 947, 6072, 2069, 1537, 2185, 4130, 1544, 509, 456, 2420, 28, 5085, 827, 3056, 3985, 1961, 4120, 2620, 3722, 1072, 221, 3407, 2683, 23, 3476, 187, 259, 881, 2169, 5804, 2608, 5283, 483, 1570, 5310, 188, 6434, 985, 5159, 3981, 2156, 2161, 3359, 5448, 2519, 9252, 508, 503, 4908, 7013, 323, 125, 2503, 358, 6898, 1057, 736, 4505, 2603, 1975, 1281, 19, 2402, 1547, 1362, 2498, 1269, 8820, 4558, 567, 4074, 64, 5458, 2291, 5089, 83, 884, 1043, 3300, 2382, 329, 3082, 3712, 1287, 1121, 1568, 1600, 1542, 2116, 1858, 703, 7106, 4423, 384, 10, 303, 2988, 1295, 909, 5700, 2111, 1118, 4082, 1984, 459, 712, 6426, 207, 2909, 2332, 1213, 2610, 3, 3077, 13, 1606, 4478, 3518, 520, 9263, 3427, 3310, 1972, 88, 3088, 1522, 1236, 6244, 5123, 5456, 980, 917, 1899, 1085, 3262, 1579, 62, 5292, 905, 8832, 9301, 3783, 4187, 570, 1593, 1027, 3909, 2832, 38, 3873, 4733, 2426, 1318, 7490, 1829, 4489, 3130, 5603, 106, 1956, 1425, 934, 6197, 1836, 3162, 1777, 3577, 4094, 433, 2845, 2120, 2797, 15, 3452, 1638, 3691, 5602, 1067, 26, 131, 1893, 1112, 3713, 206, 786, 55, 1113, 4314, 1629, 3089, 1471, 1, 594, 3191, 1282, 7288, 8106, 1255, 1446, 3530, 516, 163, 332, 284, 5160, 3519, 43, 472, 4369, 3925, 113, 3514, 4443, 3356, 1032, 4959, 6409, 6785, 1850, 4493, 9283, 464, 6063, 726, 6186, 74, 3539, 1710, 4969, 2074, 5868, 1337, 2485, 2619, 7976, 50, 669, 3321, 1656, 1526, 3789, 4961, 1123, 724, 6750, 2318, 2347, 4569, 743, 1314, 983, 173, 470, 3192, 1767, 3021, 5587, 573, 5560, 1862, 336, 1056, 1438, 6663, 114, 1297, 639, 333, 3850, 485, 1739, 3009, 295, 2071, 3728, 2660, 6999, 1761, 3834, 6016, 4152, 108, 2118, 2073, 966, 4631, 3215, 1958, 255, 3386, 2624, 2098, 6514, 5683, 4205, 2041, 1923, 695, 1973, 1181, 469, 7408, 8061, 349, 4895, 149, 1687, 5965, 2354, 5519, 2324, 7568, 1059, 7026, 2946, 6560, 2172, 267, 2240, 1368, 3537, 2004, 1378, 5528, 8, 797, 1775, 3101, 1863, 5866, 4437, 82, 4265, 7642, 3774, 529, 1902, 316, 3472, 1204, 2544, 6314, 3375, 296, 2764, 1299, 1476, 1605, 5326, 47, 326, 1389, 3272, 690, 3960, 5914, 795, 1109, 1434, 2143, 2998, 3025, 95, 6343, 4680, 2880, 4883, 904, 6481, 2136, 3479, 4259, 1915, 3348, 3176, 4105, 4394, 1788, 3031, 6385, 406, 1124, 787, 1163, 4835, 2923, 8150
}

function learnSort(type) {
  for (let i=1; i<=3; i++) {
  	alert("learn-to-sort-"+i);
  	document.getElementsByClassName("learn-to-sort-" + i)[0].innerHTML = type + " " + i;
  }
}


// Do actions on whether or not they got the first problem correct. Correct answer is 25.
function sortingStarsAfter() {
	const answer = document.getElementsByName("sorting-stars-answer")[0].value;
        let html = "";
        if (answer == sortingStarsNumber) {
                html =  "Good job! \\(^.^)/";
        } else {
  	        document.getElementById('next').style.display = 'none';
                html = "Sorry, try again! /(v.v)\\";
        }
	document.getElementsByClassName("sorting-stars-after")[0].innerHTML = html;
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

function maptolevel() {
	unrender("map");
  render(parClass[screen]);
  document.getElementById('prev').style.display = "inline-block";
  document.getElementById('next').style.display = "inline-block";
  document.getElementById("debug").innerHTML = screen;
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
