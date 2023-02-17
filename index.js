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
        console.log("Digite seu nome corretamente...");
    }
    else if(name.length > 120){
        console.log("Seu nome não pode conter mais do que 120 caracteres...");
    }
    else if(/[0-9]/g.test(name)){
        console.log("Digite seu nome corretamente...");
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