const removeBtnEl = selectByClassName('remove-item');
// console.log(removeBtnEl);
for(let i = 0; i < removeBtnEl.length; i += 1){
    let button = removeBtnEl[i];
    button.addEventListener('click', function(event){
        let buttonClick = event.target;
        buttonClick.parentElement.parentElement.remove();
        // console.log(event.target);
        
    })
}

function selectByClassName (classname){
    return document.getElementsByClassName(classname);
}
function selectById (id){
    return document.getElementElementById(id);
} 






























// printing document
const print =document.getElementById('print'); 
const printQR = () =>{
           
    // document.querySelector("#outputbox img").style.display = "none";
    document.body.classList.add("printProperty");
    // console.log(document.body.classList);
    let bodyContent = document.body.innerHTML;
    let printContent = document.getElementById("invoice").innerHTML;
    document.body.innerHTML = printContent;
    let priter = document.body.innerHTML;
    // console.log(priter);
    window.print();
    document.body.classList.remove("printProperty");
    location.reload();
    document.body.innerHTML = bodyContent;
}
print.addEventListener("click",printQR);