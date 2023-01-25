var x;
var id;
var input = document.getElementById("slow");
var f = 1;
function liczydlo() {
    var span = document.getElementById("form");
var tags = span.getElementsByTagName("span");
for (var i in tags) {
    tags[i].innerHTML = x;
}
if (x != 0){
    x -= 1;
    f = 1
}
else if (f === 1){
    input.value = 0;
    f = 0;
}
}

function dzialaj() {
    id = setInterval(liczydlo, 1000);

}

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    x = input.value;
    clearInterval(id);
    dzialaj();
  }
}); 
