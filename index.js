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
                table.innerHTML += `<tr id="${i}">
                        <td>${JSON.parse(localStorage[i]).name}</td>
                        <td>${JSON.parse(localStorage[i]).birthdate}</td></tr>`;
            }
            }
        console.log("carregou");
    } 
}

function print(){
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
        
        if(name.length < 3){
            warning.innerHTML= "Digite seu nome corretamente...";
        }
        else if(name.length > 120){
            warning.innerHTML="Seu nome não pode conter mais do que 120 caracteres...";
        }
        else if(/[0-9]/g.test(name)){
            warning.innerHTML="Digite seu nome corretamente...";
        }
        else if(formatDate == "Invalid Date"){
            warning.innerHTML="Insira uma data"
        }
        
        else{
            //Caso o localStorage for maior que o contador
            //o contador receber o tamanho do localStorage
            if(localStorage.length > count){
                count = localStorage.length
            }
            
            user = {
                name: name,
                birthdate: formatDate,
                statusUser: "Ativo" 
            }
            
            //Caso o usuário insira um nome já existente na base de dados
            for(let i = 0; i < localStorage.length; i++){
                if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
                    let getTr = document.getElementById(`${i}`)
                    getTr.remove()
                    user = {
                        name: name,
                        birthdate: JSON.parse(localStorage[i]).birthdate,
                        statusUser: "Deletado" 
                    }
                    warning.innerHTML = "Usuário já existe"
                    i = localStorage.length
                }
            }
            //Adiciona um item no localStorage em format de String no JSON
            localStorage.setItem(`${count}`, JSON.stringify(user)) 
            console.log(localStorage);
                    
            
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
                <td>${JSON.parse(localStorage[i]).name}</td>
                <td>${JSON.parse(localStorage[i]).birthdate}</td>`;
            }
            if(warning.length > 0){
                success.innerHTML = ""
            }else{
                success.innerHTML = "Usuário cadastrado com sucesso!"
            }   
        }
    }
    catch(error){
        warning.innerHTML = "Erro: Não é possível persistir o salvamento de um dado já existente" 
    }
}

//Função para editar campo
function edit(){
    try{
        success.innerHTML = ""
        warning.innerHTML = ""
        //Recebo o nome do campo que o usuário deseja editar
        let name = prompt("Escreva o nome da pessoa que deseja editar")
        if(!name){
            warning.innerHTML="Não foi possível realizar a operação..."
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
                    //i recebe o tamanho do localStorage para encerrar o FOR
                    i = localStorage.length
                }
                else if(/[0-9]/g.test(newName)){
                    warning.innerHTML = "Digite o novo nome corretamente..."
                }
                else if(newDate.length < 10){
                    warning.innerHTML = "Digite a nova data corretamente..."
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
                            <td>${JSON.parse(localStorage[i]).name}</td>
                            <td>${JSON.parse(localStorage[i]).birthdate}</td>`;
        
                    //i recebe o tamanho do localStorage para encerrar o FOR
                    i = localStorage.length
                }
            }
        }
        success.innerHTML = "Usuário editado com sucesso!"
    }
    catch(error){
        warning.innerHTML = "Operação Cancelada"
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
                
                console.log(JSON.parse(localStorage[i]).statusUser);
                getTr.remove()
            }
        }
        success.innerHTML = "Usuário apagado com sucesso!"
    }
    catch(error){
        warning.innerHTML = "Operação Cancelada"
    }
}

function deleteAll(){
    //Limpa o localStorage
    localStorage.clear()
    //Atualiza a página
    document.location.reload(true);
}