function clicked() {
  var elem = document.getElementById("myButton1");
  switch (elem.value) {
    case "1":
      elem.innerHTML = "(v0.0)v  <(^.^<)";
      elem.value = "2";
      break;
    case "2":
      elem.innerHTML = "(/^.^)/\\(^.^\\)";
      elem.value = "3";
      break;
    case "3":
      elem.innerHTML = "<(v.v)>";
      elem.value = "1";
  }
}

function move(num) { 
  if (document.getElementById('next').style.display === 'none') {
  	 document.getElementById('next').style.display = "inline-block";
  }
  
  var pc = [
    "welcome1",
    "welcome2",
    "welcome3",
    "welcome4",
    "problem",
    "after"
  ];
  
  var paragraphDisplays = [
  	getComputedStyle(document.getElementsByClassName(pc[0])[0]).display,
  	getComputedStyle(document.getElementsByClassName(pc[1])[0]).display,
  	getComputedStyle(document.getElementsByClassName(pc[2])[0]).display,
  	getComputedStyle(document.getElementsByClassName(pc[3])[0]).display,
  	getComputedStyle(document.getElementsByClassName(pc[4])[0]).display,
  	getComputedStyle(document.getElementsByClassName(pc[5])[0]).display,
  ];
  
  var index = paragraphDisplays.indexOf("block") + num;
  var paragraph = document.getElementsByClassName(pc[index]);

  for (var i=0; i<paragraph.length;i++){
    paragraph[i].style.display="block";
  }
  
  var before = document.getElementsByClassName(pc[index - num]);
  for (var i=0; i<before.length;i++){
    before[i].style.display='none';
  }

  
  if (pc[index] === "after") {
    var answer = document.getElementsByName("answer")[0].value;
    var html = after(answer);
    document.getElementsByClassName("after")[0].innerHTML = html;
  }
}

function after(answer) {
  if (answer == 25) {
    return "Good job! \\(^.^)/";
  } else {
  	document.getElementById('next').style.display = 'none';
    return "Sorry, try again! /(v.v)\\";
  }
}
