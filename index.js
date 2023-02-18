var count = 0;

function print(){
    let name = document.getElementById("name").value
    let birthdate = document.getElementById("birth-date").value
    let form = document.querySelector("form")
    let table = document.getElementById("data")
    
    form.addEventListener("submit", (event) => {
      event.preventDefault()
    })
    
    let date = new Date(birthdate);
    let formatDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    if(name.length < 3){
        alert("Digite seu nome corretamente...");
    }
    else if(name.length > 120){
        alert("Seu nome não pode conter mais do que 120 caracteres...");
    }
    else if(/[0-9]/g.test(name)){
        alert("Digite seu nome corretamente...");
    }
    else if(formatDate == "Invalid Date"){
        alert("Insira uma data")
    }
    else{
        if(localStorage.length > count){
            count = localStorage.length
        }

        user = {
            name: name,
            birthdate: formatDate
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

        
    }

}

//Função para editar campo
function edit(){    
    //Recebo o nome do campo que o usuário deseja editar
    let name = prompt("Escreva o nome da pessoa que deseja editar")
    //faço um FOR para percorrer o localStorage e comparar o campo que deseja editar
    for(let i = 0; i < localStorage.length; i++){
        if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
            //Um novo nome e nova data são recebidos
            let newName = prompt("Digite o novo nome")
            let newDate = prompt("Digite a nova data\nExemplo: 01/12/2000")
            //As informações são colocadas em um objeto
            let user = {
                name: newName,
                birthdate: newDate
            }
            
            //As informações são computadas no localStorage e são mostradas na tabela
            localStorage.setItem(`${i}`, JSON.stringify(user))
            let getTr = document.getElementById(`${i}`)
            getTr.innerHTML = `
                    <td>${JSON.parse(localStorage[i]).name}</td>
                    <td>${JSON.parse(localStorage[i]).birthdate}</td>`;
            alert("Usuário editado com sucesso!")
        }
        else{
            alert("Nome inexistente")
        }
    }
}

//Função de apagar campo
function deleteItem(){
    //Recebo o nome do campo que o usuário deseja apagar
    let name = prompt("Escreva o nome da pessoa que deseja Apagar")
    //Percorro o localStorage para apagar o campo desejado
    for(let i = 0; i < localStorage.length; i++){
        let getTr = document.getElementById(`${i}`)
        if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
            // localStorage.clear()
            getTr.remove()
            // count = 0
        }
    }
}