/*Chamando tag HTML pelo class dela no JS*/
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

/*Função de busca de dados dos pokemons*/
const fetchPokemon = async (pokemon) => {

    /*resposta da API, o fatch é assincrono, é uma promisse*/
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); /*${parametro}.*/

    /*await: serve pra esperar o fetch concluir antes de retornar uma resposta, funciona com async.*/


    /*Se: a resposta da api for igual a 200(funcionou) então execute: */
    if (APIResponse.status === 200) {
        
        /*Vai extrair para um .json os dados recebidos pela APIResponse e salvar no data*/
    const data = await APIResponse.json();

    console.log(data)

    /*retorna a resposta para o fetchPokemon*/ 
    return (data);
    }

    /*Se não a nossa função não vai retornar nada. */

   
}

/*
Função: Chamada:FetchPokemon a ser excutada -> parâmetro(pokemon)informação pra ação -> {ação} logica/calculo  -> retorno/resultado vai pro FetchPokemon

Nem toda função usa parametros e nem todas tem retorno.
*/


/*função de renderizar o pokemon na tela.*/
const renderPokemon = async (pokemon) => {


    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    /*por await pois ele precisa esperar o fetchPokemon terminar de executar. */ 

    /*Se tiver dados correspondetes ao data {} */
    if (data) {

    pokemonImage.style.display = 'block';
        /*InnerHTML: para por oque a gente quer dentro da tag referenciada*/ 
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    /*data.name referencia o objeto que vc quer pegar*/

    /*Imagem vc tem que por os objetos até chegar na img.*/ 
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    /*Pode usar Colchetes ao inves de '.' */
    input.value = '';
    searchPokemon = data.id;
    } else {/*Senao, execute.  */
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '*';
    }
    
}



/* addEventListener: ele ouve um evento'submit' e executa e vc pode execurtar uma função dentro dele.*/ 
form.addEventListener('submit', (event) => {
    /*vamos capturar o evento submit com o (event) pra não se perder*/ 

    event.preventDefault();/*Ele cancela refresh da pagina apos um input e não perde os dados*/


    renderPokemon(input.value.toLowerCase())
    /*chamada pra função e deixando minsculos as string de dados pra função execurtar a busca.*/

});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon) 
    }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

input.value = '';/*deixa a caixa do input sempre vazia apos um input. */

renderPokemon(searchPokemon);