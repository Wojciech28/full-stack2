/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list,page){
   let startIndex = (page * 9) - 9;
   let endIndex =  page * 9;

   let ul = document.querySelector('.student-list');
   ul.innerHTML = " ";
   for(let i=0 ; i< list.length; i++){
      if(i>= startIndex && i< endIndex){
         let li = document.createElement("LI");
         
         li.innerHTML =  `<li class="student-item cf">
         <div class="student-details">
           <img   class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last} </h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${list[i].registered.date}</span>
         </div>
       </li>`
         
       ul.appendChild(li)
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination (list){

   var number; 
   
    number = Math.ceil(list.length/9) ;
 
   let ul = document.querySelector('.link-list')
   ul.innerHTML= " ";

   for(let i=1; i<=number; i++){
      let li= document.createElement("LI");
      li.innerHTML = `<button type="button"> ${i} </button>`
      ul.appendChild(li);
   }
   document.getElementsByTagName("BUTTON")[1].classList.add("active");
   
   ul.addEventListener("click",(e)=>{
     if(e.target.tagName === "BUTTON" && e.target.className!="searched"){
      for(let i=0; i<=number; i++){
         document.getElementsByTagName("BUTTON")[i].classList.remove("active");
      }
       e.target.classList.add("active");
      showPage(list,e.target.textContent)
     }
   })
   

}



// this part of code adds search bar dynamicly to the page; 
let header = document.querySelector('.header')
header.style.alignItems="center"; 
header.style.display = "flex"; 
header.insertAdjacentHTML('beforeend',`<label for="search" class="student-search">
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`)

// this part adds paragraph to the page 
let pp = document.createElement("P");
pp.textContent= "    there is no matches"; 
pp.style.display="none";
pp.style.position="absolute";
pp.style.top="150px";
pp.style.right="650px"; 
pp.style.color="red"; 
header.appendChild(pp);


// Search functions 

let inputs = document.querySelector('#search')

inputs.addEventListener("keyup",(e)=>{
  
   let datanew = []
   // this for loops checks if inputs value contains strings from object array and it creates new array

   for(let i=0 ; i< data.length; i++){
      if(inputs.value!== "" && data[i].name.first.toUpperCase().includes(inputs.value.toUpperCase())||data[i].name.last.toUpperCase().includes(inputs.value.toUpperCase())){
         datanew.push(data[i]);       
      }
   }

   

   showPage(datanew,1)
  
   if(datanew[0]===undefined){
      pp.style.display="block"
   }else{
     
      pp.style.display="none"; 
   }

      
   let number = Math.ceil(datanew.length/9) ;
   let ul = document.querySelector('.link-list');

   ul.innerHTML = "";

   for(let i=1; i<=number; i++){
      let li= document.createElement("LI");
      li.innerHTML = `<button class="searched" type="button"> ${i} </button>`;
      ul.appendChild(li);
      
   }
   
   
   let buttons = document.getElementsByClassName("searched");
   buttons[0].classList.add("active");

   ul.addEventListener("click",(e)=>{

      if(e.target.className === "searched"){
         
         for(let i=0; i<number; i++){
         buttons[i].classList.remove("active");
         }
      
         e.target.classList.add("active");
         showPage(datanew,e.target.textContent);

      }
    
      
 
   })

   if( inputs.value===""){
      ul.innerHTML=""
      document.querySelector('.student-list').innerHTML="";
      showPage(data,1);
      addPagination(data);
   }




});












// Call functions

showPage(data,1);
addPagination (data);


