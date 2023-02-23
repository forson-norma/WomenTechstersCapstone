function loadData(){
    // this line reaches into local storage, finds the storage item called "gallery"
    // It converts it into an object.
    var data = JSON.parse(localStorage.getItem('gallery'))
    var result = data.map(function card(dt){
      return `<div class="col-md-3">
      <div class="card" style="width: 18rem;">
        <img src="${dt.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${dt.make} - ${dt.model}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        </div>
      </div>
    </div>`
    })

    document.getElementById('CarList').innerHTML= result;
}
loadData();