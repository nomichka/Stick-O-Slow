function clicked() {
  var elem = document.getElementById("myButton1");
  switch (elem.value) {
    case "<(v.v)>":
      elem.value = "(v0.0)v  <(^.^<)";
      break;
    case "(v0.0)v  <(^.^<)":
      elem.value = "(/^.^)/\\(^.^\\)";
      break;
    case "(/^.^)/\\(^.^\\)":
      elem.value = "<(v.v)>";
  }
}  

function next() {  
  var pc = [
    "welcome1",
    "welcome2",
    "welcome3",
    "welcome4",
    "probelem",
    "after"
  ];
  
  var paragraphDisplays = [
    getComputedStyle(document.querySelector("." + pc[0])).display,
    getComputedStyle(document.querySelector("." + pc[1])).display,
    getComputedStyle(document.querySelector("." + pc[2])).display,
    getComputedStyle(document.querySelector("." + pc[3])).display,
    getComputedStyle(document.querySelector("." + pc[4])).display,
    getComputedStyle(document.querySelector("." + pc[5])).display
  ];
  alert(paragraphDisplays[0]);
  var index = paragraphDisplays.indexOf("block");
  var paragraph = document.getElementsByClassName(pc[index]);
  for (var i=0; i<paragraph.length;i++){
    paragraph[i].style.display='block';
  }
  if (i < paragraphDisplays.length) {
    var before = document.getElementsByClassName(pc[index - 1]);
    for (var i=0; i<before.length;i++){
      before[i].style.display='none';
    }
  }
}
