// const { response } = require("express");

const showlistEL = document.querySelector('.showlist');
    const tabmenu = document.querySelectorAll('li button.menu-item');
    let studentArray;
  // fetch student record from database using fetch API
  const fetchStudentlist = async () =>{
    try{
      const list = await fetch('/student/record/data');
      const data = await list.json();
      studentArray = await data.data;
      let recent = filterRecent(studentArray);
      renderTable(recent);

      // changing tab menu state and passing tab data index into filterschool function
      for (let i = 0; i < tabmenu.length; i++) {
       tabmenu[i].onclick = function(e) {
          
          var c = 0;
          while (c < tabmenu.length) {
            tabmenu[c++].className = 'menu-item';
          }
          tabmenu[i].className = 'menu-item active';
         index = tabmenu[i].dataset.index;
         let subarr = filterSchool(studentArray, index)
         renderTable(subarr);
        //  getStudentlist(index);
        }
      }

    }catch(err){
      console.log(err);
    }
}
fetchStudentlist();

// render student data in a table
function renderTable(arr){
  let reverseArr = arr.reverse();
  let outputTable = `<table width="100%">
      <tr><td>Name</td><td>email</td><td>actions</td></tr>`;
      reverseArr.forEach(student => {
        outputTable += `<tr><td>${student.name}</td><td>${student.email}</td><td>
          <div class="action-btn">
            <a href="/student/record/${student._id}"><span class="fas fa-list"></span></a>
            <a href="/student/record/edit/${student._id}" class="edit" data-id='${student._id}'><span class="fas fa-edit"></span></a>
            <button class="delete" data-id='${student._id}'><span class="fas fa-trash"></span></button>
            </div></td></tr>`;
      });
      outputTable += `</table>`;
      showlistEL.innerHTML = outputTable;
      const editEL = document.querySelector('.edit');
    const deleteEL = document.querySelectorAll('.delete');
    deleteEL.forEach(dlbtn => {
        dlbtn.addEventListener('click', async (e) => {
            let id = e.currentTarget.dataset.id;
            let endpoint = '/student/record/'+id;
        fetch(endpoint, {method: 'DELETE'})
        .then((response) =>response.json())
        .then((data) => {
            window.location.href = data.redirect;
        })
        .catch((err) => {
            console.log(err);
        })


        });
    })
   

}

// filter recent data from fetch data

function filterRecent(dataArray){
  let recent = dataArray.slice(-10);
  return recent;
}
// filter fetch data base on school using tab index
function filterSchool(dataArray, cat){
  if(cat != 0){
    let subdata = dataArray.filter((elem) => {
    if(elem.school == cat){
      return true;
    }
  })
  return subdata;
  }else{
    let recent = filterRecent(dataArray);
    return recent;
  }
}
