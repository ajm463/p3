document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const artworksContainer = document.getElementById("artworksContainer");


    let allArtworks = null;


    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterArtworks(searchTerm);
    });

    function fetchArtworks() {
        fetch("https://api.artic.edu/api/v1/artworks")
            .then(response => response.json())
            .then(data => {
                allArtworks = data.data;
                displayArtworks(allArtworks);
            })
            .catch(error => console.error("Error fetching artworks:", error));
    }

    function displayArtworks(artworks) {
        artworksContainer.innerHTML = "";
        artworks.forEach(function(artwork) {
            const artworkCard = document.createElement("div");
            artworkCard.classList.add("artwork-card");
            const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg?w=740";
            artworkCard.innerHTML = `
                <img src="${imageUrl}" alt="${artwork.title} width=100% height = 100%">
                <h3>${artwork.title}</h3>
            `;
            artworkCard.addEventListener("click", function() {
                alert(`Nombre de la Obra: ${artwork.title}, Fecha: ${artwork.date_start}, Artista: ${artwork.artist_title}.\nDo you wish to make an offer?`);
                modal.style.display = "block";
            });
            if (imageUrl != "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg?w=740") {
                artworksContainer.appendChild(artworkCard);
            }
        });
    }

    function filterArtworks(searchTerm) {
        const artworks = document.querySelectorAll(".artwork-card");
        artworks.forEach(function(artwork) {
            const title = artwork.querySelector("h3").textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                artwork.style.display = "inline";
            } else {
                artwork.style.display = "none";
            }
        });
    }

    const modal = document.getElementById("modal");
    const closeButton = document.getElementsByClassName("close")[0];
    const openModalBtn = document.getElementById("openModalBtn");

    openModalBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    const purchaseForm = document.getElementById("purchaseForm");
    purchaseForm.addEventListener("submit", function(event) {
        alert(`Request sent!`);
        modal.style.display = "none";
    });

    const obraInput = document.getElementById("obra");
    const artistInput = document.getElementById("artist");

    obraInput.addEventListener("input", function() {
        const searchObra = obraInput.value.toLowerCase();
        const artwork = allArtworks.find(artwork => artwork.title.toLowerCase() === searchObra);
        if (artwork) {
            artistInput.value = artwork.artist_title;
        } else {
            artistInput.value = "";
        }
    });

    fetchArtworks();
});

