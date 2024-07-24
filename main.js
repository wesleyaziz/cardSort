document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById('cardContainer');

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pokemon.push(...data.pokemon);
            displayCards();

            cardContainer.addEventListener('dragstart', dragStart);
            cardContainer.addEventListener('dragover', dragOver);
            cardContainer.addEventListener('drop', drop);
            cardContainer.addEventListener('dragend', dragEnd);
        })
        .catch(error => console.error('Error:', error));

});

const pokemon = [];

function displayCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    pokemon.forEach((poke, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', 'true'); 
        card.setAttribute('id', `card-${index}`); 

        card.innerHTML = `
            <img class="member_pic" src='${poke.pic}'>
            <div class="name">
                <h3>${poke.ChName}</h3>
                <p>${poke.EnName}</p>
            </div>
            <div class="attributes">
                <div class="${poke.attributes1}">${poke.attributes1}</div>
                <div class="${poke.attributes2}">${poke.attributes2}</div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    const targetElement = e.target.closest('.card');

    if (targetElement && targetElement !== draggableElement) {
        const draggableRect = draggableElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        if (e.clientY < targetRect.top + targetRect.height / 2) {
            cardContainer.insertBefore(draggableElement, targetElement);
        } else {
            cardContainer.insertBefore(draggableElement, targetElement.nextSibling);
        }
    }

    draggableElement.classList.remove('dragging');
}

function dragEnd(e) {
    const draggableElement = document.querySelector('.card.dragging');
    if (draggableElement) {
        draggableElement.classList.remove('dragging');
    }
}
