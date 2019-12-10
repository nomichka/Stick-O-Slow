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
  var paragraphs = [
    document.getElementById("welcome1").style.display === "none",
    document.getElementById("welcome2").style.display === "none",
    document.getElementById("welcome3").style.display === "none",
    document.getElementById("welcome4").style.display === "none",
    document.getElementById("problem").style.display === "none",
    document.getElementById("after").style.display === "none"
  ];
  
  var i = paragraphs.indexOf("false");
  paragraphs[i].style.display = "none";
  if (i < paragraphs.length) {
    paragraphs[i + 1].style.display = "block";
  }
  
}
