// const ramenMenu = document.querySelector('#ramen-menu')
// const ramenDetail = document.querySelector('#ramen-detail')
// const ramenRating = document.querySelector('#ramen-rating')
// const ramenDetailImage = document.querySelector('.detail-image')
// const ramenName = document.querySelector('.name')
// const ramenRestaurant = document.querySelector('.restaurant')
// const ramenComment = document.querySelector('#comment')
// const ramenFormRating = document.querySelector('#rating')
// const newRamenForm = document.querySelector('#new-ramen')


// fetch('http://localhost:3000/ramens')
//   .then(response => response.json())
//   .then(data => createRamenImgs(data));


// function createRamenImgs(ramenData) {
//     ramenData.forEach(ramen => {
//         ramenMenu.innerHTML += `
//         <img class='ramen-${ramen.id}' data-id='${ramen.id}' src='${ramen.image}' alt='${ramen.name}'>
//         `
//     });
// }


// ramenMenu.addEventListener('click', function(e) {
//     fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`)
//     .then(response => response.json())
//     .then(data => updateRamenPage(data));
// })


// function updateRamenPage(data) {
//     ramenDetailImage.src = data.image
//     ramenName.innerText = data.name
//     ramenRestaurant.innerText = data.restaurant
//     ramenRestaurant.dataset.id = data.id
//     ramenComment.innerText = data.comment
//     ramenComment.dataset.id = data.id
//     ramenFormRating.value = data.rating
// }


// ramenRating.addEventListener('submit', function(e) {
//     e.preventDefault()

//     newRating = e.target.rating.value
//     newComment = e.target.comment.value
//     ramenId = e.target.comment.dataset.id

//     const updatedRatingObj = {
//     rating: newRating,
//     comment: newComment,
//     id: ramenId
//     }
//     updateOnBackend(updatedRatingObj)
//     e.target.reset()
// })


// function updateOnBackend(data) {
//     fetch(`http://localhost:3000/ramens/${data.id}`, {
//     method: 'PATCH', 
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
// }
// //////// ADVANCED DELIVERABLES /////////////////
//   document.addEventListener('DOMContentLoaded', (event) => {
//     fetch('http://localhost:3000/ramens/1')
//     .then(response => response.json())
//     .then(data => populateFirstRamen(data));
// });


// function populateFirstRamen(data) {
//     ramenDetailImage.src = data.image
//       ramenName.innerText = data.name
//       ramenRestaurant.innerText = data.restaurant
//       ramenComment.innerText = data.comment
//       ramenComment.dataset.id = data.id
//       ramenFormRating.value = data.rating
// }


// newRamenForm.addEventListener('submit', function(e) {
//     e.preventDefault()

//       newRamenName = e.target.name.value
//       newRamenRestaurant = e.target.restaurant.value
//       newRamenRating = e.target.rating.value
//       newRamenImage = e.target.image.value
//       newRamenComment = e.target['new-comment'].value

//       newRamenObj = {
//           name: newRamenName,
//           restaurant: newRamenRestaurant,
//           image: newRamenImage,
//           rating: newRamenRating,
//           comment: newRamenComment 
//       }

//       postNewRamen(newRamenObj)
// })


// function postNewRamen(ramenObject) {
//     fetch('http://localhost:3000/ramens', {
//         method: 'POST', 
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(ramenObject),
//         })
//         .then(response => response.json())
//         .then(data => {
//         console.log('Success:', data);
//         })
// }


// ramenRestaurant.addEventListener('click', function(e) {
//     let parsedID = parseInt(e.target.dataset.id)
//     deleteRamen(parsedID)
// })


// function deleteRamen(ID) {
//     fetch(`http://localhost:3000/ramens/${ID}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//     })
//     .then(console.log('Ramen deleted'))
// }


////////////////////////////// GREG REVEIW 
///////////////////// Get Elements off the DOM  

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenForm = document.querySelector('#ramen-rating')

///////////////////// Add Event Listeners  

ramenMenu.addEventListener('click', handleClick)
ramenForm.addEventListener('submit', grabFormData)

//////////////////// Do Network Requests  

getAllRamens()
function getAllRamens() {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramenArray =>  {
        ramenArray.forEach(ramen => displayRamenImage(ramen));
    })
}

// this network request responds to the handleClick function
function getSingleRamen(ramenId) {
    return fetch(`http://localhost:3000/ramens/${ramenId}`)
      .then(res => res.json())
    //   .then(ramenObj => {
    //       populateImgDetail(ramenObj)
    //       populateImgDForm(ramenObj)
    // })  
}
///////////////////// Manipulate the DOM ///////////////////// 

function displayRamenImage(ramen) {
        const img = document.createElement('img')
        img.src = ramen.image
        img.alt = ramen.name
        img.className = 'detail-img'
        img.dataset.id = ramen.id
        ramenMenu.append(img)
};


function handleClick(e) {
    if (e.target.matches('img.detail-img')) {
        const ramenId = e.target.dataset.id
        getSingleRamen(ramenId).then(populateImgDetail)
        getSingleRamen(ramenId).then(populateImgForm)
    }
}

function populateImgDetail(ramenObj) {
  ramenDetail.innerHTML = `
      <img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
      <h2 class="name">${ramenObj.name}</h2>
      <h3 class="restaurant">${ramenObj.restaurant}</h3>
  `
}

function populateImgForm(ramenObj) {
    ramenForm.dataset.id = ramenObj.id

    ramenForm.innerHTML = `
    <label for="rating">Rating: </label>
      <input type="text" name="rating" id="rating" value=${ramenObj.rating} />
      <label for="comment">Comment: </label>
      <textarea name="comment" id="comment">${ramenObj.comment}</textarea>
      <input type="submit" value="Update" />
    `
}


function grabFormData(e) {
    e.preventDefault()

    const ramenId = e.target.dataset.id
    const formRating = parseInt(e.target.rating.value)
    const formComment = e.target.comment.value

    ramenObj = {
        rating: formRating,
        comment: formComment,
    }
    
    updateRamenPage(ramenId, ramenObj)
}


function updateRamenPage(id, ramen) {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramen),
      })
      .then(res => res.json())
      .then(console.log)
}