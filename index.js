function print(){
    let name = ""
    name = document.getElementById("name").value
    let birthdate = document.getElementById("birth-date").value
    let form = document.querySelector("form")
    
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
        let show = `Seu nome é ${name} e seu aniversário é nesta data: ${formatDate}`
        console.log(show);         
    }

}