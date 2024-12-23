const apiKey = 'AIzaSyB0JCZZ5YluPdcjTZsa5PCncWn8IB55Wvc'; 
const channelId = 'UCkA9dtpxsXLat-JfB-_1Dvg';  // ID do canal

let nextPageToken = ''; // Usado para carregar vídeos antigos

// Função para buscar os vídeos mais recentes do canal
async function getYouTubeVideos(pageToken = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=6&pageToken=${pageToken}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Adicionando um log para ver os dados da resposta

        const videoSection = document.getElementById('video-section');
        if (pageToken === '') {
            videoSection.innerHTML = ''; // Limpa antes de adicionar novos vídeos
        }

        // Verifique se existe a propriedade 'items' nos dados
        if (data.items) {
            data.items.forEach((item, index) => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                const videoContainer = document.createElement('div');
                videoContainer.classList.add('video-container');
                if (index === 0) {
                    videoContainer.classList.add('main-video'); // Classe para o vídeo principal (maior)
                }

                videoContainer.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    <h3><a href="${videoUrl}" target="_blank">${videoTitle}</a></h3>
                `;

                videoSection.appendChild(videoContainer);
            });

            // Atualiza o token para a próxima página de vídeos
            nextPageToken = data.nextPageToken || '';
        } else {
            console.log("Nenhum vídeo encontrado!");
        }

    } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
    }
}

// Carrega mais vídeos antigos
function loadMoreVideos() {
    if (nextPageToken) {
        getYouTubeVideos(nextPageToken);
    } else {
        alert('Não há mais vídeos para carregar.');
    }
}

// Função para atualizar a página
function reloadPage() {
    window.location.reload();
}

// Carrega os vídeos quando a página é carregada
getYouT




// Função para aguardar um tempo entre as requisições (espera exponencial)
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getYouTubeVideos(pageToken = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=6&pageToken=${pageToken}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Aguarda 1 segundo entre cada requisição
    await delay(1000);
    
    const videoSection = document.getElementById('video-section');
    if (pageToken === '') {
        videoSection.innerHTML = ''; // Limpa antes de adicionar novos vídeos
    }

    // Processa os dados dos vídeos
    data.items.forEach((item, index) => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');
        if (index === 0) {
            videoContainer.classList.add('main-video');
        }

        videoContainer.innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <h3><a href="${videoUrl}" target="_blank">${videoTitle}</a></h3>
        `;

        videoSection.appendChild(videoContainer);
    });

    nextPageToken = data.nextPageToken || '';
}
