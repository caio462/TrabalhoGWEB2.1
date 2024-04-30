// Função para buscar os dados dos filmes
function obterFilmes() {
    fetch('filmes.json')
        .then(response => response.json())
        .then(filmes => {
            filmesArray = filmes; // Armazena os filmes no array
            exibirFilmes(filmesArray); // Exibe todos os filmes da array
        });
}

// Função de pesquisa
function pesquisarFilmes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filmesFiltrados = filmesArray.filter(filme =>
        filme.titulo.toLowerCase().includes(searchTerm)
    );
    exibirFilmes(filmesFiltrados);
}

// Array para guardar os filmes favoritados
let filmesFavoritados = [];

// Função para favoritar ou desfavoritar um filme
function toggleFavorito(titulo) {
    const index = filmesFavoritados.indexOf(titulo);
    if (index > -1) {
        filmesFavoritados.splice(index, 1);
    } else {
        filmesFavoritados.push(titulo);
    }
    // Atualiza o localStorage com a lista atualizada de filmes favoritados
    localStorage.setItem('filmesFavoritados', JSON.stringify(filmesFavoritados));
    // Chama a função para exibir os filmes favoritados
    exibirFilmesFavoritados();
}

let filmesNaLista = [];

// Função para adicionar ou remover um filme na lista
function toggleLista(titulo) {
    const index = filmesNaLista.indexOf(titulo);
    if (index > -1) {
        filmesNaLista.splice(index, 1);
    } else {
        filmesNaLista.push(titulo);
    }
    // Atualiza o localStorage com a lista atualizada de filmes na lista
    localStorage.setItem('filmesNaLista', JSON.stringify(filmesNaLista));
    // Chama a função para exibir os filmes na lista
    exibirFilmesNaLista();
}

let viewMode = 'all';

function exibirFilmesFavoritados() {

    const filmesFavoritados = JSON.parse(localStorage.getItem('filmesFavoritados')) || [];
    const filmesFavoritadosContainer = document.getElementById('filmesFavoritadosContainer');

    // Limpa o conteúdo anterior
    filmesFavoritadosContainer.innerHTML = '';

    // Se não houver filmes favoritados, exibe uma mensagem
    if (filmesFavoritados.length === 0) {
        filmesFavoritadosContainer.innerHTML = '<p>Nenhum filme favoritado.</p>';
        return;
    }

    // Cria um elemento para cada filme favoritado e adiciona ao container
    filmesFavoritados.forEach(titulo => {
        const filme = filmesArray.find(f => f.titulo === titulo);
        if (filme) {
            const filmeElement = document.createElement('div');
            filmeElement.classList.add('filme');

            const filmeImage = document.createElement('img');
            filmeImage.src = filme.poster;
            filmeImage.alt = filme.titulo;

            const filmeTitulo = document.createElement('h3');
            filmeTitulo.textContent = filme.titulo;

            const filmeAno = document.createElement('p');
            filmeAno.textContent = `Ano: ${filme.ano}`;

            const filmeDuracao = document.createElement('p');
            filmeDuracao.textContent = `Duração: ${filme.duracaoEmMinutos} minutos`;

            const filmeGenero = document.createElement('p');
            filmeGenero.textContent = `Gêneros: ${filme.genero.join(', ')}`;

            const assistirBtn = document.createElement('button');
            assistirBtn.textContent = 'Assistir';
            assistirBtn.classList.add('btn', 'btn-assistir');

            const removerFav = document.createElement('button');
            removerFav.textContent = 'Remover dos Favoritos';
            removerFav.classList.add('btn', 'btn-favorito');
            removerFav.addEventListener('click', () => {
            toggleFavorito(filme.titulo);
            });

            filmeElement.appendChild(filmeImage);
            filmeElement.appendChild(filmeTitulo);
            filmeElement.appendChild(filmeAno);
            filmeElement.appendChild(filmeDuracao);
            filmeElement.appendChild(filmeGenero);
            filmeElement.appendChild(assistirBtn);
            filmeElement.appendChild(removerFav);

            filmesFavoritadosContainer.appendChild(filmeElement);
        }
    });
}

// Chama a função para exibir os filmes favoritados quando a página carrega
window.addEventListener('load', exibirFilmesFavoritados);

 // Função para exibir os filmes na lista
 function exibirFilmesNaLista() {
    const filmesNaLista = JSON.parse(localStorage.getItem('filmesNaLista')) || [];
    const filmesNaListaContainer = document.getElementById('filmesNaListaContainer');

    // Limpa o conteúdo anterior
    filmesNaListaContainer.innerHTML = '';

    // Se não houver filmes favoritados, exibe uma mensagem
    if (filmesNaLista.length === 0) {
        filmesNaListaContainer.innerHTML = '<p>Nenhum filme Na Lista.</p>';
        return;
    }

    // Cria um elemento para cada filme favoritado e adiciona ao container
    filmesNaLista.forEach(titulo => {
        const filme = filmesArray.find(f => f.titulo === titulo);
        if (filme) {
            const filmeElement = document.createElement('div');
            filmeElement.classList.add('filme');

            const filmeImage = document.createElement('img');
            filmeImage.src = filme.poster;
            filmeImage.alt = filme.titulo;

            const filmeTitulo = document.createElement('h3');
            filmeTitulo.textContent = filme.titulo;

            const filmeAno = document.createElement('p');
            filmeAno.textContent = `Ano: ${filme.ano}`;

            const filmeDuracao = document.createElement('p');
            filmeDuracao.textContent = `Duração: ${filme.duracaoEmMinutos} minutos`;

            const filmeGenero = document.createElement('p');
            filmeGenero.textContent = `Gêneros: ${filme.genero.join(', ')}`;

            const assistirBtn = document.createElement('button');
            assistirBtn.textContent = 'Assistir';
            assistirBtn.classList.add('btn', 'btn-assistir');

            const removerLista = document.createElement('button');
            removerLista.textContent = 'Remover da Sua Lista';
            removerLista.classList.add('btn', 'btn-favorito');
            removerLista.addEventListener('click', () => {
            toggleLista(filme.titulo);
            });

            filmeElement.appendChild(filmeImage);
            filmeElement.appendChild(filmeTitulo);
            filmeElement.appendChild(filmeAno);
            filmeElement.appendChild(filmeDuracao);
            filmeElement.appendChild(filmeGenero);
            filmeElement.appendChild(assistirBtn);
            filmeElement.appendChild(removerLista);

            filmesNaListaContainer.appendChild(filmeElement);
        }
    });
}

// Chama a função para exibir os filmes favoritados quando a página carrega
window.addEventListener('load', exibirFilmesNaLista);

// Função para exibir os filmes na tela
function exibirFilmes(filmes) {
    const filmesContainer = document.querySelector('.filmes');
    filmesContainer.innerHTML = ''; // Limpa os filmes exibidos antes de adicionar novos

    const filmesPorGenero = filmes.reduce((acc, filme) => {
        filme.genero.forEach(genero => {
            if (!acc[genero]) acc[genero] = [];
            acc[genero].push(filme);
        });
        return acc;
    }, {});

    Object.keys(filmesPorGenero).forEach(genero => {
        
        const generoDiv = document.createElement('div');
        generoDiv.classList.add('categoria-genero');

        const generoTitulo = document.createElement('h3');
        generoTitulo.textContent = genero;
        generoTitulo.classList.add('titulo-genero');
        generoDiv.appendChild(generoTitulo);
        
        filmesContainer.appendChild(generoDiv);


        filmesPorGenero[genero].forEach(filme => {

            const filmeElement = document.createElement('div');
            filmeElement.classList.add('filme');

            const filmeImage = document.createElement('img');
            filmeImage.src = filme.poster;
            filmeImage.alt = filme.titulo;

            const filmeTitulo = document.createElement('h3');
            filmeTitulo.textContent = filme.titulo;

            const filmeAno = document.createElement('p');
            filmeAno.textContent = `Ano: ${filme.ano}`;

            const filmeDuracao = document.createElement('p');
            filmeDuracao.textContent = `Duração: ${filme.duracaoEmMinutos} minutos`;

            const filmeGenero = document.createElement('p');
            filmeGenero.textContent = `Gêneros: ${filme.genero.join(', ')}`;

            const assistirBtn = document.createElement('button');
            assistirBtn.textContent = 'Assistir';
            assistirBtn.classList.add('btn', 'btn-assistir');

            const favoritarBtn = document.createElement('button');
            favoritarBtn.textContent = 'Favoritar';
            favoritarBtn.classList.add('btn', 'btn-favoritar');

            const listaBtn = document.createElement('button');
            listaBtn.classList.add('btn', 'btn-Na-Lista');
            listaBtn.textContent = filmesNaLista.includes(filme.titulo) ? 'Remover da Lista' : 'Adicionar à Lista';
            
            // Adiciona um evento de clique no botão 'Adicionar/Remover da Lista'
            listaBtn.addEventListener('click', () => {
                if (filmesNaLista.includes(filme.titulo)) {
                    if (confirm('Tem certeza que deseja remover este filme da sua lista?')) {
                        toggleLista(filme.titulo); // Remove o filme da lista
                    }
                } else {
                    toggleLista(filme.titulo); // Adiciona o filme à lista
                }
            });

            const isFavoritado = filmesFavoritados.includes(filme.titulo);
            favoritarBtn.textContent = isFavoritado ? 'Favoritado' : 'Favoritar';
            favoritarBtn.classList.toggle('btn-favoritado', isFavoritado);

            // Adiciona um evento de clique no botão favoritar
            favoritarBtn.addEventListener('click', function() {
                // Checa se o filme já está na lista de favoritados
                if (filmesFavoritados.includes(filme.titulo)) {
                    // Se estiver, mostra a caixa de diálogo de confirmação antes de remover
                    if (confirm('Tem certeza que deseja remover dos favoritos?')) {
                        toggleFavorito(filme.titulo);
                    }
                } else {
                    // Se não estiver na lista de favoritados, apenas adiciona aos favoritos
                    toggleFavorito(filme.titulo);
                }
            });

                // Muda o texto do botão ao passar o mouse e voltar ao texto original ao tirar o mouse de cima
                favoritarBtn.addEventListener('mouseover', function() {
                if (filmesFavoritados.includes(filme.titulo)) {
                    this.textContent = 'Remover';
                    }
                });
                favoritarBtn.addEventListener('mouseout', function() {
                    this.textContent = filmesFavoritados.includes(filme.titulo) ? 'Favoritado' : 'Favoritar';
                });

            //Cria os elementos no site

            filmeElement.appendChild(filmeImage);
            filmeElement.appendChild(filmeTitulo);
            filmeElement.appendChild(filmeAno);
            filmeElement.appendChild(filmeDuracao);
            filmeElement.appendChild(filmeGenero);
            filmeElement.appendChild(assistirBtn);
            filmeElement.appendChild(favoritarBtn);
            filmeElement.appendChild(listaBtn);

            // Adiciona filmeElement ao container de gênero

            generoDiv.appendChild(filmeElement); // Importante: Adiciona o filme ao container do gênero
        });

        filmesContainer.appendChild(generoDiv); // Adiciona o container do gênero ao container principal
    });
    }

// Supondo que esta função é chamada para criar um novo botão de assistir
function criarBotaoAssistir(filmeElement, filme) {
    const assistirBtn = document.createElement('button');
    assistirBtn.textContent = 'Assistir';
    assistirBtn.classList.add('btn', 'btn-assistir');
    filmeElement.appendChild(assistirBtn);

    // Adiciona o evento de clique logo após criar o botão
    assistirBtn.addEventListener('click', () => {
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('filmeVideo');
        
        modal.style.display = 'flex';
        video.play();
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-assistir')) {
        // Seu código para mostrar o modal
        const modal = document.getElementById('videoModal');
        modal.style.display = 'flex'; // Mostra o modal
        const video = document.getElementById('filmeVideo');
        video.play(); // Começa a reproduzir o vídeo
    }

    if (e.target && e.target.classList.contains('modal-close')) {
        // Seu código para fechar o modal
        const modal = document.getElementById('videoModal');
        modal.style.display = 'none'; // Esconde o modal
        const video = document.getElementById('filmeVideo');
        video.pause(); // Pausa o vídeo
        video.currentTime = 0; // Volta para o começo do vídeo
    }
});

function init() {
    obterFilmes();
    document.getElementById('search-bar').addEventListener('input', pesquisarFilmes);
}

// Event listener para a barra de pesquisa
document.getElementById('search-bar').addEventListener('input', pesquisarFilmes);

init(); // Chamada da função para iniciar a aplicação

obterFilmes(); // Chamada inicial para buscar e exibir os filmes
