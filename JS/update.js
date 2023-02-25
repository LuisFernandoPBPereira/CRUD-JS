//Função para editar campo
function update(){
    try {
        success.innerHTML = ""
        warning.innerHTML = ""
        //Desabilito os botões que não vão ser usados na atualização
        disableButtons()
        let form = document.getElementById("confirmationForm")
        form.innerHTML = `
            <div>
                <label for="name">Digite o nome do usuário que deseja editar</label>
                <div class="name">
                    <input class="form-field js-field" id="nameConfirmation" maxlength="120" name="name" required type="text" placeholder="Digite seu nome" value="">
                    <br>
                </div>
            </div>
            <div>
                <label for="name"><strong>Editando</strong></label>
                <br>
                <br>
                <label for="name">Nome</label>
                <div class="name">
                <input class="form-field js-field" id="newNameConfirmation" maxlength="120" name="name" required type="text" placeholder="Digite seu nome" value="">
                <br>
                </div>
            </div>   
            <label for="birth-date">
            Data de Nascimento
            </label>
            <div class="birth-date">
                <input class="form-field js-field" id="newBirthdateConfirmation" name="birth-date" type="date" value="">
            </div>
            <section class="button buttonConfirmation">
                <button onclick="confirmUpdate()" type="submit">Atualizar</button>
                <button onclick="cancel()" type="submit">Cancelar</button>
            </section>  
        `       
    } 
    catch(error){
        warning.innerHTML = "Erro interno"
        deleteWarning(warning)
    } 
}


function confirmUpdate(){
    try {
        //Recebo elementos e valores
        let form = document.getElementById("confirmationForm")
        let name = document.getElementById("nameConfirmation").value
        let newName = document.getElementById("newNameConfirmation").value
        let newDate = document.getElementById("newBirthdateConfirmation").value
        let userExists = true
         
        //Se o nome e a data estiverem vazios
        if(newName == "" && newDate == ""){
            warning.innerHTML="Insira um nome e/ou uma data nova..."
            deleteWarning(warning)
            //i recebe o tamanho do localStorage para encerrar o FOR
            i = localStorage.length
        }
        //Se o nome antigo for igual ao novo
        else if(name == newName){
            warning.innerHTML = "Este nome já existe"
            deleteWarning(warning)
        }
        //Se a variável conter números
        else if(/[0-9]/g.test(newName)){
            warning.innerHTML = "Digite o novo nome corretamente..."
            deleteWarning(warning)
        }
        else if(newDate.length > 10){
            warning.innerHTML = "Digite a nova data corretamente..."
            deleteWarning(warning)
        }
        else{
            //Monto a estrutura do usuário editado conforme os dados fornecidos
            let date = new Date(newDate);
            let formatDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            let user = {
                name: newName,
                birthdate: formatDate,
                statusUser: "Ativo"
            }
            //Se não for fornecido o nome, ele permanecerá igual
            if(newName == ""){
                for(let i = 0; i < localStorage.length; i++){
                    if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
                        let defaultName = JSON.parse(localStorage[i]).name
                        user = {
                            name: defaultName,
                            birthdate: formatDate,
                            statusUser: "Ativo"
                        }
                        i = localStorage.length
                    }
                }
            }
            //Se não for fornecido a data, ela permanecerá igual
            else if(newDate == ""){
                for(let i = 0; i < localStorage.length; i++){
                    if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase()){
                        let date = JSON.parse(localStorage[i]).birthdate
                        user = {
                            name: newName,
                            birthdate: date,
                            statusUser: "Ativo"
                        }
                        i = localStorage.length
                    }
                }   
            }
            for(let i = 0; i < localStorage.length; i++){
                //Atualizando o usuário se ele existir no localStorage
                if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase() &&
                JSON.parse(localStorage[i]).statusUser == "Ativo"){
                    userExists = true
                    //As informações são computadas no localStorage e são mostradas na tabela
                    localStorage.setItem(`${i}`, JSON.stringify(user))
                    let getTr = document.getElementById(`${i}`)
                    getTr.innerHTML = `
                        <td class="tdName">${JSON.parse(localStorage[i]).name}</td>
                        <td class="tdBirthdate">${JSON.parse(localStorage[i]).birthdate}</td>`;
                
                    //i recebe o tamanho do localStorage para encerrar o FOR
                    i = localStorage.length
                    //Limpo o formulário da tela
                    form.innerHTML = ""
                    success.innerHTML = "Usuário editado com sucesso!"
                    deleteWarning(success)
                    //Ativo os botões que não foram usados na atualização
                    activeButtons()
                }
                //Caso contrário, aparecerá um aviso na tela
                else if(name.toUpperCase() != JSON.parse(localStorage[i]).name.toUpperCase() &&
                JSON.parse(localStorage[i]).statusUser == "Ativo"){
                    userExists = false
                }
            }
            if(userExists == false){
                warning.innerHTML = "Usuário inexistente"
                deleteWarning(warning)
                activeButtons()
            }
        }           
    } catch (error) {
        warning.innerHTML = "Erro interno"
    }
}
