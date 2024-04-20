

function search() {
    // prendo il valore 
    const input = document.getElementById('searchField').value;
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`)
    .then(response => response.json())
    .then(data => {
        const albums = data.data;
        const container = document.getElementById('searchSection');
            albums.forEach(song => {
                let cards = document.createElement('div');

                cards.classList.add('Card-album');

                  cards.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center my-3 text-success">
                                     <img src=${song.album.cover} alt=${song.title}>
                                     <h3 class ="text-center">${song.album.title}</h3>
                                     <span>${song.title}</span>
                                     <span>${song.artist.name}
                                     </div>`;

                 container.appendChild(cards)
                 document.getElementById('found').classList.remove('d-none');
                });
                artistiPresenti.forEach(artista => {
                    //Estraggo da ogni risultato mi estraggo l'id dato che equivale al nome dell'artista
                     let nomeArtista= artista.id;
                     document.getElementById(nomeArtista).classList.add('d-none');
                  });  
    })  

}


// seleziono tutte le row dove mostrerò il contenuto di default
let artistiPresenti = document.querySelectorAll('.mostrarisultati')
artistiPresenti.forEach(artista => {
    // recupero l'id
    //ottengo il nome da cercare e l'id
    let nomeArtista = artista.id;
    document.getElementById( nomeArtista).classList.remove('d-none');
    // const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`;

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${nomeArtista}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // vado a puntare il container di eminem
            const artistiContainer = document.getElementById(nomeArtista + 'Section');
            const albums = data.data;

            albums.forEach(song => {
                          let cards = document.createElement('div');

            cards.classList.add('Card-album');

                cards.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center my-3">
                                   <img src=${song.album.cover} alt=${song.title}>
                                   <h3 class ="text-center">${song.album.title}</h3>
                                   <span>${song.title}</span>
                                   <span>${song.artist.name}
                                   </div>`;

               artistiContainer.appendChild(cards)
            });

        })
        .catch(error => {
            console.error('fratm si è rotto tutto!');
        })
})



