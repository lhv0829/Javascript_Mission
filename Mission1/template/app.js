// do something!
const toggle = document.getElementsByClassName('toggle')[0];
const sidebar = document.getElementsByTagName('nav')[0];
// let isOpen = false;

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.visibility = 'visible';
  let open = localStorage.getItem('open');
  console.log(`처음 open은? ${open}`);
  if(open === 'true'){
    sidebar.classList.add('active');
    console.log("okay");
  }
});
document.body.classList.remove('preload');

toggle.addEventListener("click", () => {
  sidebar.classList.toggle('active');
  console.log(sidebar.classList.contains('active'));
  if(sidebar.classList.contains('active')){
    // isOpen = true;
    localStorage.setItem('open', true);
    // console.log(`open 여부 : ${isOpen}`);
  }
  if(!sidebar.classList.contains('active')){
    // isOpen = false;
    localStorage.setItem('open', false)
  } 
  console.log(`변경된 open은? ${localStorage.getItem('open')}`);
});