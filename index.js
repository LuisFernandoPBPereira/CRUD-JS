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

//Retira os avisos da tela
function deleteWarning(event){
    setTimeout(() => {
        event.innerHTML = ""
      }, "5000")
}
