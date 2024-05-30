document.addEventListener('DOMContentLoaded', () => {
    const movieCatalog = new MovieCatalog();

    document.getElementById('movieForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const year = document.getElementById('year').value;
        const imageUrl = document.getElementById('imageUrl').value;

        if (title && description && year && imageUrl) {
            movieCatalog.addMovieCard(title, description, year, imageUrl);
            document.getElementById('movieForm').reset();
        }
    });
});

class MovieCatalog {
    #movieCatalogElement;

    constructor() {
        this.#movieCatalogElement = document.getElementById('movieCatalog');
    }

    addMovieCard = (title, description, year, imageUrl) => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-4 mb-4';
        
        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm';

        const cardImage = document.createElement('img');
        cardImage.className = 'card-img-top';
        cardImage.src = imageUrl;
        cardImage.alt = title;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = `${description} (${year})`;

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer text-right';

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning mr-2';
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
            this.#editMovieCard(cardCol, cardTitle, cardText, cardImage, title, description, year, imageUrl);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            this.#movieCatalogElement.removeChild(cardCol);
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardFooter.appendChild(editButton);
        cardFooter.appendChild(deleteButton);
        card.appendChild(cardImage);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        cardCol.appendChild(card);
        this.#movieCatalogElement.appendChild(cardCol);
    }

    #editMovieCard = (cardCol, cardTitle, cardText, cardImage, title, description, year, imageUrl) => {
        const newTitle = prompt('Editar título:', title);
        const newDescription = prompt('Editar descripción:', description);
        const newYear = prompt('Editar año:', year);
        const newImageUrl = prompt('Editar URL de la imagen:', imageUrl);

        if (newTitle && newDescription && newYear && newImageUrl) {
            cardTitle.textContent = newTitle;
            cardText.textContent = `${newDescription} (${newYear})`;
            cardImage.src = newImageUrl;
            cardImage.alt = newTitle;
        }
    }
}
