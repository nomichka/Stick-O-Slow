function clicked(){
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
