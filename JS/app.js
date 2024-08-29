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