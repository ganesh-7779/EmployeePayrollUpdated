/*
Purpose :- JavaScript functions for home page.
@author :- Ganesh Gavhad
@Version :- 1.0
@Since :- 02/09/2021
*/

let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  empPayrollList=getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ?
              JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th>" +
                  "<th>Department</th><th>Salary</th><th>Start Date</th>" +
                  "<th>Actions</th>";
  let innerHtml = `${headerHtml}`;
  let empPayrollList = createEmployeePayrollJSON();  
  for ( const empPayrollData of empPayrollList) {
      innerHtml = `${innerHtml}
      <tr>
          <td>
              <img class="profile" alt="" src="${empPayrollData._profilePic}">
          </td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>
              ${getDeptHtml(empPayrollData._department)}
          </td>
          <td>${empPayrollData._salary}</td>
          <td>${empPayrollData._start_date}</td>
          <td>
              <img name="${empPayrollData._id}"onclick="remove()" 
                          src="../Assets/icons/delete-black-18dp.svg" alt="delete">
              <img name ="${empPayrollData._id}" onclick="update(this)" 
                          src="../Assets/icons/create-black-18dp.svg" alt="edit">           
          </td>
      </tr>
      `;
  }
  document.querySelector("#display").innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for ( const dept of deptList ) {
      deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
  }
  return deptHtml;
}

const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      _name: 'Ganesh Gavhad',
      _gender: 'Male',
      _department: [
        'Engineering', 'HR'
      ],
      _salary: '40000',
      _start_date: '20 Jun 2020',
      _note: '',
      _profilePic: '../Assets/profile-img/Ellipse -3.png'
    },
    {
      _name: 'Sachin GK',
      _gender: 'Male',
      _department: [
        'Engineering', 'Finance'
      ],
      _salary: '600000',
      _start_date: '21 Aug 2021',
      _note: '',
      _profilePic: '../Assets/profile-img/Ellipse -2.png'
    }
  ]
  return empPayrollListLocal;
}

let remove = (node) => {

  let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
  if( !empPayrollData ) 
    return;
  const index = empPayrollList.map( empData => empData._id ).indexOf(empPayrollData._id);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePyrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
} 

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if(!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}