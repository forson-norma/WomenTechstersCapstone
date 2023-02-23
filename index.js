var cars=[];
var car={
    model:null,
    make:null,
    year: null,
    color:null,
    regNum:null,
    image:null,
}

function dataStore(){
    //This part of the code updates the listcars dynamically.
    // This code checks to see if a gallery is already in the local storage.
    // If there isn't one already, it will create a new one.
    // then it will move all the objects from local storage into the cars list.
    if(localStorage.getItem("gallery")==null){
        localStorage.setItem("gallery",JSON.stringify(cars));
    }
    else{
        // only load from local storage when the data is small
        // cars.push(JSON.parse(localStorage.getItem('gallery')));
        cars=JSON.parse(localStorage.getItem('gallery'));
        console.log(cars);
        
    }
    
}
// this stores the new data in local storage
// it is called once when the page loads so an empty gallery will be created by default
dataStore();

// dataStore()
    var mk=document.getElementById("make");
    var md=document.getElementById("model");
    var cl=document.getElementById("color");
    var img=document.getElementById("image");
    var yr=document.getElementById("year");
    var rn=document.getElementById("regNum");
// This function takes the data of a car object, updates the cars list and then prints the list content
addTocarList = function(){
    // These variables are picking the properties from the admin's input in an html form
    // and creating a new object car which will have the latest inputs from the form
    
    nCar=Object.create(car);
    nCar.make = mk.value;
    nCar.model = md.value;
    nCar.color = cl.value;
    nCar.image = img.value;
    nCar.year = yr.value;
    nCar.regNum = rn.value;

    // update list of cars with the new car object
    cars.push(nCar);   
    // update the local storage
    localStorage.setItem('gallery',JSON.stringify(cars));
    // print out list of car objects in console
    console.log(cars);
    // Clear text inuts after adding to list of car objects
    clear();
    // notifies user that cars has been updated
    notify();
    // loading data from local storage
    console.log("loading data from local storage");
    loadData();
}

function clear(){
    mk.value="";
    md.value="";
    cl.value="";
    img.value="";
    yr.value="";
    rn.value="";
}
// addTocarList();
function notify(){
    Swal.fire(
        'Good job!',
        'Your entry has been saved!',
        'success'
      )
}



function photoUpload(){
    var pht=document.getElementById("photo");
    pht.src=document.getElementById("image").value;
}

function card(){
    `<div class="col-md-3">
    <div class="card" style="width: 18rem;">
        <img src="https://wallpapercave.com/dwp2x/wp10444983.jpg" class="card-img-top" alt="a card image">
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
</div>`
}

function loadData(){
    // this line reaches into local storage, finds the storage item called "gallery"
    // It converts it into an object.
    var data = JSON.parse(localStorage.getItem('gallery'))
    var result = data.map(function card(dt){
      return `<div class="col-md-3">
      <div class="card" style="width: 18rem;">
        <img src="${dt.image}" class="card-img-top" alt="...">
        <div class="card-body individual">
        <h5 class="card-title">${dt.make} - ${dt.model}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        </div>
        <button id="editButton" onclick="editCar(${data.indexOf(dt)})">Edit</button>
        <button type="button" class="btn btn-danger" onclick="deleteNotify(${data.indexOf(dt)})">Delete</button> 
      </div>
    </div>`
    })

    document.getElementById('carList').innerHTML= result;
}
loadData();

function deleteNotify(a){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        //   For as many objects as there are in the list, if an object has the same make 
        // and model as the selected card return the position of that object.
        //   remove that object from the list
          cars.splice(a,1);

        //   Update the local storage with the new cars list
          localStorage.setItem('gallery',JSON.stringify(cars));
        //   reloads the page so the update is seen
          location.reload();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })

}
function searchpage(){
  var x= document.getElementById("search").value;

  if(x=="Toyota"){
    // window.open('admin.html');
    window.open('https://global.toyota/en/');
  }
  else if(x=="Nissan"){
    window.open('https://www.nissanusa.com/');
  }
  else if(x=='Ford'){
    window.open('https://www.ford.com/');
  }
}
let count=0;
// This function takes in a card index and then gets the content and makes the text content editable
function editCar(idx){
  if(document.getElementById('editButton').textContent=="Edit")
  {
    document.getElementsByClassName('individual')[idx].contentEditable=true; //Gets car card
    console.log(idx) //checking which card was picked
    console.log(document.getElementsByClassName('individual')[idx].textContent)//verifying card
    cars.splice(idx,1,document.getElementsByClassName('individual')[idx].textContent); //changes current content
    console.log(document.getElementById('editButton').textContent)
    document.getElementById('editButton').textContent="Save"
    console.log(document.getElementById('editButton').textContent)
  }
  else
  {
    document.getElementsByClassName('individual')[idx].contentEditable=false; //saves current content
  }
  // document.getElementsByClassName('individual')[idx].contentEditable=true; //Gets car card
  // console.log(idx) //checking which card was picked
  // console.log(document.getElementsByClassName('individual')[idx].textContent)//verifying card
  // console.log("hi")
  // cars.splice(idx,1,document.getElementsByClassName('individual')[idx].textContent); //changes current content
  // console.log(document.getElementById('editButton').textContent)
  // document.getElementById('editButton').textContent="Save"
  // console.log(document.getElementById('editButton').textContent)

  // saveData(edit)
  // return edit;
  
}
// function saveData(a){
//   loadData();
// }
