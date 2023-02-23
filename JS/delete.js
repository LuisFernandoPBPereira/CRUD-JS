//Função de apagar campo
function deleteItem(){
    try{
        success.innerHTML = ""
        warning.innerHTML = ""
        disableButtons()
        //Recebo o nome do campo que o usuário deseja apagar
        // let name = prompt("Escreva o nome da pessoa que deseja Apagar")
        let form = document.getElementById("confirmationForm")
        form.innerHTML = `
            <div>
                <label for="name">Digite o nome do usuário que deseja apagar</label>
                <div class="name">
                    <input class="form-field js-field" id="nameConfirmation" maxlength="120" name="name" required type="text" placeholder="Digite seu nome" value="">
                    <br>
                </div>
            </div>
            <section class="button buttonConfirmation">
                <button onclick="deleting()" type="submit">Confirmar</button>
                <button onclick="cancel()" type="submit">Cancelar</button>
            </section>  

    `
        
    }
    catch(error){
        warning.innerHTML = "Operação Cancelada"
        deleteWarning(warning)
    }
}

function deleting(){
    try{
        let form = document.getElementById("confirmationForm")
        let name = document.getElementById("nameConfirmation").value
        let userExists = true
        if(!name){
            warning.innerHTML = "Não foi possível realizar a operação..."
            deleteWarning(warning)
        }
        //Percorro o localStorage para apagar o campo desejado
        for(let i = 0; i < localStorage.length; i++){
            let getTr = document.getElementById(`${i}`)
            if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
                userExists = true
                let user = {
                    name: "-",
                    birthdate: "-",
                    statusUser: "Deletado"
                }
                localStorage.setItem(`${i}`, JSON.stringify(user))
                
                getTr.remove()
                success.innerHTML = "Usuário apagado com sucesso!"
                deleteWarning(success)
                form.innerHTML = ""
                i = localStorage.length
                activeButtons()
            }
            else if(name.toUpperCase() != JSON.parse(localStorage[i]).name.toUpperCase()){
                userExists = false
            }
        }
        if(userExists == false){
            warning.innerHTML = `O usuário "${name}" não existe`
            deleteWarning(warning)
            form.innerHTML = ""
            activeButtons()
        }
    }
    catch(error){
        warning.innerHTML = "Operação Cancelada"
        deleteWarning(warning)
    }
}
