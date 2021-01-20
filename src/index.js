// write your code here

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenRating = document.querySelector('#ramen-rating')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const ramenComment = document.querySelector('#comment')
const ramenFormRating = document.querySelector('#rating')
const newRamenForm = document.querySelector('#new-ramen')


fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(data => createRamenImgs(data));



  function createRamenImgs(ramenData) {
      ramenData.forEach(ramen => {
          ramenMenu.innerHTML += `
            <img class='ramen-${ramen.id}' data-id='${ramen.id}' src='${ramen.image}' alt='${ramen.name}'>
          `
      });
  }



  ramenMenu.addEventListener('click', function(e) {
    fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`)
    .then(response => response.json())
    .then(data => updateRamenPage(data));
  })


  function updateRamenPage(data) {
      ramenDetailImage.src = data.image
      ramenName.innerText = data.name
      ramenRestaurant.innerText = data.restaurant
      ramenComment.innerText = data.comment
      ramenComment.dataset.id = data.id
      ramenFormRating.value = data.rating
  }



  ramenRating.addEventListener('submit', function(e) {
      e.preventDefault()

      newRating = e.target.rating.value
      newComment = e.target.comment.value
      ramenId = e.target.comment.dataset.id
      const updatedRatingObj = {
        rating: newRating,
        comment: newComment,
        id: ramenId
      }
      updateOnBackend(updatedRatingObj)
      e.target.reset()
  })


  function updateOnBackend(data) {
      fetch(`http://localhost:3000/ramens/${data.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => console.log(data))
  }





  //////// ADVANCED DELIVERABLES /////////////////

  document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/ramens/1')
    .then(response => response.json())
    .then(data => populateFirstRamen(data));
});


function populateFirstRamen(data) {
    ramenDetailImage.src = data.image
      ramenName.innerText = data.name
      ramenRestaurant.innerText = data.restaurant
      ramenComment.innerText = data.comment
      ramenComment.dataset.id = data.id
      ramenFormRating.value = data.rating
}

newRamenForm.addEventListener('submit', function(e) {
    e.preventDefault()
      newRamenName = e.target.name.value
      newRamenRestaurant = e.target.restaurant.value
      newRamenRating = e.target.rating.value
      newRamenImage = e.target.image.value
      newRamenComment = e.target.new-comment.value

      newRamenObj = {
          name: newRamenName,
          restaurant: newRamenRestaurant,
          image: newRamenImage,
          rating: newRamenRating,
          comment: newRamenComment 
      }

      postNewRamen(newRamenObj)
})


function postNewRamen(ramenObject) {
    fetch('http://localhost:3000/ramens', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramenObject),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
}

