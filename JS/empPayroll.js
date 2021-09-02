/*
Purpose :- Contains all the javascript functons for employee wage page.
@author :- Ganesh Gavhad
@Version :- 1.0
@Since :- 02/09/2021
*/
//UC-2
let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
checkForUpdate();
});
//UC-3
const save = () =>{
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);

    }
    catch(e){
        return;
    }
}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollDatanote = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+ getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
});

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}
//UC4
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList"), JSON.stringify(employeePayrollList)
}
//UC5
const resetForm = () =>{
 setvalue('#name','');
 unsetSelectedValues('[name=profile]');
 unsetSelectedValues('[name=gender]');
 unsetSelectedValues('[name=department]');
 setvalue('#salary','');
 setvalue('#notes','');
 setvalue('#day','1');
 setvalue('#month','January');
 setvalue('#year','2020');
}

const unsetSelectedValues = (propertyValue) =>
{
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item =>{
        item.checked=false;
    });
}
 
const setTextValue = (id , value)=>{
    const element = document.querySelector(id)
    element.textContent=value;
}

const setValue =(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}