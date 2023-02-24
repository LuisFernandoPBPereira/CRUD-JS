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
        
        //Recebo a data em seu formato Date
        let date = new Date(birthdate);
        //formato o tipo da data para a localização do Brasil
        let formatDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        
        //variável que verifica a existência de um usuário
        let userExists = false

        //Caso o usuário insira um nome já existente na base de dados
        for(let i = 0; i < localStorage.length; i++){
            //Se o nome recebido for igual ao armazenado, não será cadastrado
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
            //o contador recebe o tamanho do localStorage
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
        warning.innerHTML = "Erro interno"
        deleteWarning(warning)
    }
}
