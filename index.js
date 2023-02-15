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
        let count = 0
        button.addEventListener("click", () => {
            user = {
                name: name,
                birthdate: formatDate
            }
            
            var aux = count++
            
            //Adiciona um item no localStorage em format de String no JSON
            localStorage.setItem(aux ,JSON.stringify(user)) 
            console.log(localStorage);
            
            //Pega um item buscado no localStorage
            const pessoas = JSON.parse(localStorage.getItem(aux)) || [];
            console.log(aux);
            
            //Criando um espaço em uma tabela
            table.innerHTML = `
            <tr>
                <td>${pessoas.name}</td>
                <td>${pessoas.birthdate}</td>
            </tr>`;
        })

        
    }

}