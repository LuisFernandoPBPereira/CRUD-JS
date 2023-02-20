//Inicialização do contador: Auxilia no armazenamento dos dados
var count = 0;
//Capturo o id do Span dos avisos
var warning = document.getElementById("warning")
var success = document.getElementById("success")
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

function create(){
    try{
        success.innerHTML = ""
        warning.innerHTML = ""
    
        let name = document.getElementById("name").value
        let birthdate = document.getElementById("birth-date").value
        let form = document.querySelector("form")
        let table = document.getElementById("data")
        
        //Evita a atualização da página ao realizar o clique sobre os botões
        form.addEventListener("submit", (event) => {
          event.preventDefault()
        })
    
        let date = new Date(birthdate);
        let formatDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        
        //variável que verifica a existência de um usuário
        let userExists = false

        //Caso o usuário insira um nome já existente na base de dados
        for(let i = 0; i < localStorage.length; i++){
            if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
                userExists = true
                i = localStorage.length
            }
        }
        if(userExists == true){
            warning.innerHTML = "Usuário já existe"
            deleteWarning(warning)
        }
        else if(name.length < 3){
            warning.innerHTML= "Digite seu nome corretamente...";
            deleteWarning(warning)
        }
        else if(name.length > 120){
            warning.innerHTML="Seu nome não pode conter mais do que 120 caracteres...";
            deleteWarning(warning)
        }
        else if(/[0-9]/g.test(name)){
            warning.innerHTML="Digite seu nome corretamente...";
            deleteWarning(warning)
        }
        else if(formatDate == "Invalid Date" || formatDate.length > 10){
            warning.innerHTML="Insira a data correta"
            deleteWarning(warning)
        }
        else{
            //Caso o localStorage for maior que o contador
            //o contador receber o tamanho do localStorage
            if(localStorage.length > count){
                count = localStorage.length
            }
            
            //Defino a estrutura do usuário em um objeto
            user = {
                name: name,
                birthdate: formatDate,
                statusUser: "Ativo" 
            }
            
            //Adiciona um item no localStorage em format de String no JSON
            localStorage.setItem(`${count}`, JSON.stringify(user))           
            //Cria um elemento TR para adicionar na tabela
            let tr = document.createElement("tr")
            //Cria um ID para o TR
            tr.id = `${count}`
            //Adiciona o TR na tabela
            table.appendChild(tr)
            //Pegamos o TR desejado
            let getTr = document.getElementById(`${count}`)
            
            count++
            
            for (let i = 0; i < localStorage.length; i++) {
                //Criando um espaço em uma tabela com as informações necessárias
                getTr.innerHTML = `
                    <td class="tdName">${JSON.parse(localStorage[i]).name}</td>
                    <td class="tdBirthdate">${JSON.parse(localStorage[i]).birthdate}</td>`;
            }
            if(warning.length > 0){
                success.innerHTML = ""
            }else{
                success.innerHTML = "Usuário cadastrado com sucesso!"
                deleteWarning(success)
            }
        }
    }
    catch(error){
        warning.innerHTML = "Erro: Não é possível persistir o salvamento de um dado já existente"
        deleteWarning(warning)
    }
}

//Função para editar campo
function update(){
    try{
        success.innerHTML = ""
        warning.innerHTML = ""
        //Recebo o nome do campo que o usuário deseja editar
        let name = prompt("Escreva o nome da pessoa que deseja editar")
        if(!name){
            warning.innerHTML="Não foi possível realizar a operação..."
            deleteWarning(warning)
        }
        //faço um FOR para percorrer o localStorage e comparar o campo que deseja editar
        for(let i = 0; i < localStorage.length; i++){
            if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase() &&
               JSON.parse(localStorage[i]).statusUser == "Ativo"){
                //Um novo nome e nova data são recebidos
                let newName = prompt("Digite o novo nome")
                let newDate = prompt("Digite a nova data\nExemplo: 01/12/2000")
                
                if(newName == "" || newDate == ""){
                    warning.innerHTML="Insira um nome e uma data nova..."
                    deleteWarning(warning)
                    //i recebe o tamanho do localStorage para encerrar o FOR
                    i = localStorage.length
                }
                else if(/[0-9]/g.test(newName)){
                    warning.innerHTML = "Digite o novo nome corretamente..."
                    deleteWarning(warning)
                }
                else if(newDate.length < 10){
                    warning.innerHTML = "Digite a nova data corretamente..."
                    deleteWarning(warning)
                }
                else{
                    //As informações são colocadas em um objeto
                    let user = {
                        name: newName,
                        birthdate: newDate,
                        statusUser: "Ativo"
                    }
                    
                    //As informações são computadas no localStorage e são mostradas na tabela
                    localStorage.setItem(`${i}`, JSON.stringify(user))
                    let getTr = document.getElementById(`${i}`)
                    getTr.innerHTML = `
                        <td class="tdName">${JSON.parse(localStorage[i]).name}</td>
                        <td class="tdBirthdate">${JSON.parse(localStorage[i]).birthdate}</td>`;
        
                    //i recebe o tamanho do localStorage para encerrar o FOR
                    i = localStorage.length
                    success.innerHTML = "Usuário editado com sucesso!"
                    deleteWarning(success)
                }
            }
        }
    }
    catch(error){
        warning.innerHTML = "Operação Cancelada"
        deleteWarning(warning)
    }
    
}

//Função de apagar campo
function deleteItem(){
    try{
        success.innerHTML = ""
        warning.innerHTML = ""
        //Recebo o nome do campo que o usuário deseja apagar
        let name = prompt("Escreva o nome da pessoa que deseja Apagar")
        if(!name){
            warning.innerHTML = "Não foi possível realizar a operação..."
            deleteWarning(warning)
        }
        //Percorro o localStorage para apagar o campo desejado
        for(let i = 0; i < localStorage.length; i++){
            let getTr = document.getElementById(`${i}`)
            if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
                let user = {
                    name: "-",
                    birthdate: "-",
                    statusUser: "Deletado"
                }
                localStorage.setItem(`${i}`, JSON.stringify(user))
                
                getTr.remove()
                success.innerHTML = "Usuário apagado com sucesso!"
                deleteWarning(success)
            }
        }
    }
    catch(error){
        warning.innerHTML = "Operação Cancelada"
        deleteWarning(warning)
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