//Variables globales
const btnSearch = document.getElementById('btnSearch')
const inputSearch = document.getElementById('searchArtist')
let playlist = null

btnSearch.addEventListener('click', () => {
    const artist = inputSearch.value
    if (artist.trim().length > 0){
        searchArtist(artist)
    }
})
/*
document.addEventListener('DOMContentLoaded', () => {
    
})

const loadPlaylist = async() => {
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/playlist/%7Bid%7D';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'e2dfc24a75msh6ff4f43c78749d0p10957bjsnb01dd21f854a',
		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
}*/

const searchArtist = async(name) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e2dfc24a75msh6ff4f43c78749d0p10957bjsnb01dd21f854a',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }   
}

const loadArtist = async(id) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '92dddc4295msha48d53b765bbb5cp180a36jsn4616440b70db',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result){
            loadArtistData(result)
        }
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

const loadArtistData = async(info) => {
    console.log('@@@info=> ',info)
    const img = document.querySelector('.imagen')
    const tituloArtista = document.querySelector('.tituloArtista')
    const descripcionArtista = document.querySelector('.descripcionArtista')

    const urlTracks = info.tracklist
    const canciones = await fetch(urlTracks)
    tracks = await canciones.json()
    tituloArtista.textContent = ''
    tituloArtista.textContent = info.name
    descripcionArtista.textContent = ''
    descripcionArtista.textContent = `Este artista tiene ${info.nb_album} albums y ${info.nb_fan} fan's`
    //img.setAttribute('src',info.picture_medium)
    img.src = info.picture_medium
    if(tracks){
        dibujarRenglones(tracks)
    }
    console.log('@@@ canciones => ', tracks)
}

const dibujarRenglones = (canciones) => {
    const templateRenglon = document.getElementById('templateMusica').content
    console.log('@@@ pasa')
    const fragment = document.createDocumentFragment()
    const musica = document.querySelector('.musicaBusqueda')

    musica.innerHTML = ''
    canciones.data.forEach((track) => {
        const clone = templateRenglon.cloneNode(true)
        clone.querySelector('.tituloCancion').textContent = track.title || 'N/A'
        clone.querySelector('.albumCancion').textContent  = track.album.title || 'N/A'
        clone.querySelector('.durcacionCancion').textContent = formatTime(track.duration)
        clone.querySelector('.imgCancion > img').setAttribute('src',track.album.cover_small)

        fragment.appendChild(clone)
    })
    musica.appendChild(fragment)
}

const formatTime = (segundos) => {
    if (segundos < 0){
        return '00 : 00'
    }
    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60

    const formatMins = String(minutos).padStart(2,'0')
    const formatSecs = String(segundosRestantes).padStart(2,'0')

    return `${formatMins} : ${formatSecs}`
}