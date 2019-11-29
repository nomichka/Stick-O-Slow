function clicked(){
  var elem = document.getElementById("myButton1");
  switch (elem.value) {
    case "<(v.v)>":
      elem.value = "(v0.0)v  <(^.^<)";
    case "(v0.0)v <(^.^<)":
      elem.value = "(/^.^)/\\(^.^\\)";
    case "(/^.^)/\\(^.^\\)":
      elem.value = "<(v.v)>";
  }
}  
