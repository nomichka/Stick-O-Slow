function clicked(){
  var elem = document.getElementById("myButton1");
  switch (elem.innerHTML) {
    case "<(v.v)>":
      elem.innerHTML = "(v0.0)v  <(^.^<)";
    case "(v0.0)v <(^.^<)":
      elem.innerHTML = "(/^.^)/\\(^.^\\)";
    case "(/^.^)/\\(^.^\\)":
      elem.innerHTML = "<(v.v)>";
  }
  document.getElementById("myButton1").innerHTML = elem.innerHTML;
}  
