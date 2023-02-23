//Inicialização do contador: Auxilia no armazenamento dos dados
var count = 0;
//Capturo o id do Span dos avisos
var warning = document.getElementById("warning")
var success = document.getElementById("success")
//============================================ READ =======================================
//Realiza a busca dos dados se houver dados 
//armazenados no localstorage ao carregar a página
if(localStorage.length > 0){
    window.onload = () => {
        let table = document.getElementById("data") 
         
         for (let i = 0; i < localStorage.length; i++) {
            if(JSON.parse(localStorage[i]).statusUser == "Ativo"){
                //Criando um espaço na tabela com as informações necessárias
                table.innerHTML += `
                    <tr id="${i}">
                        <td class="tdName">${JSON.parse(localStorage[i]).name}</td>
                        <td class="tdBirthdate">${JSON.parse(localStorage[i]).birthdate}</td>
                    </tr>`;
            }
        }
    } 
}

function deleteAll(){
    //Limpa o localStorage
    localStorage.clear()
    //Atualiza a página
    document.location.reload(true);
}

function deleteWarning(event){
    setTimeout(() => {
        event.innerHTML = ""
      }, "5000")
}

function showInformation(){
    let span = document.getElementById("span")
    let button = document.getElementById("button")
    let seeMore = document.getElementById("seeMore")
    span.innerHTML = `
        <ul>
            <li>
                Seus dados estão sendo armazenados em seu
                local storage (o armazenamento do seu
                navegador), do qual não temos acesso.
            </li>
            <li>
                Caso queira limpar seu local storage,
                apenas clique sobre o botão "Limpar tudo".
            </li>
            <br>
            <h3>Sobre o site:</h3>
            <li>
                Neste site, você pode cadastrar a data de aniversário 
                de seu amigo, assim você nunca vai esquecer 😄.
            </li>
            <li>
                <strong>Para os desenvolvedores:</strong> Este site foi desenvolvido
                 para testar meus conhecimentos ao realizar um CRUD 
                 (Create, Read, Update and Delete => Criar,
                 Ler, Atualizar e Apagar), além de que este site não possui
                 nenhum tipo de framework, library ou database
            </li>
            <li>
                Desenvolvido e publicado por: Luis Fernando P. B. Pereira
            </li>
        </ul>`
        
        button.innerHTML = `<button id="seeMore" onclick="hideInformation()">Fechar</button>`

    }
function hideInformation(){
    let span = document.getElementById("span")
    let button = document.getElementById("button")

    span.innerHTML = `
    <ul>
        <li>
            Seus dados estão sendo armazenados em seu
            local storage (o armazenamento do seu
            navegador), do qual não temos acesso.
        </li>
    </ul>`
    button.innerHTML = `<button id="seeMore" onclick="showInformation()">Ler mais</button>`
}