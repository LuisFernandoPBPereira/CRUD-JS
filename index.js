function print(){
    let name = ""
    name = document.getElementById("name").value
    let birthdate = document.getElementById("birth-date").value
    let form = document.querySelector("form")
    let table = document.getElementById("data")
    let button = document.querySelector("button")
    
    form.addEventListener("submit", (event) => {
      event.preventDefault()
    })


    let date = new Date(birthdate);
    let formatDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    if(name.length < 3){
        console.log("Digite seu nome corretamente...");
    }
    else if(name.length > 120){
        console.log("Seu nome não pode conter mais do que 120 caracteres...");
    }
    else if(/[0-9]/g.test(name)){
        console.log("Digite seu nome corretamente...");
    }
    else{
            user = {
                name: name,
                birthdate: formatDate
            }
            
            //Corta a primeira parte do nome ( MUDAR ISSO NO FUTURO )
            let splitedName = user.name.split(" ")

            //Adiciona um item no localStorage em format de String no JSON
            localStorage.setItem(`user${splitedName[0]}`, JSON.stringify(user)) 
            console.log(localStorage);
            
            //Pega um item buscado no localStorage
            const pessoas = JSON.parse(localStorage.getItem(`user${splitedName[0]}`)) || [];
            

            //Cria um elemento TR para adicionar na tabela
            let tr = document.createElement("tr")
            //Cria um ID para o TR
            tr.id = `${pessoas.name}`
            //Adiciona o TR na tabela
            table.appendChild(tr)
            
            //Pegamos o TR desejado
            let getTr = document.getElementById(`${pessoas.name}`)
            
            //Criando um espaço em uma tabela com as informações necessárias
            getTr.innerHTML = `
                <td>${pessoas.name}</td>
                <td>${pessoas.birthdate}</td>`;        
    }

}