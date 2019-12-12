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
  var paragraphDisplays = [
    document.getElementById("welcome1").style.display,
    document.getElementById("welcome2").style.display,
    document.getElementById("welcome3").style.display,
    document.getElementById("welcome4").style.display,
    document.getElementById("problem").style.display,
    document.getElementById("after").style.display
  ];
  alert("inside method");
  var i = paragraphDisplays.indexOf("block");
  paragraphDisplays[i] = "none";
  if (i < paragraphDisplays.length) {
    paragraphDisplays[i + 1] = "block";
  }
}
