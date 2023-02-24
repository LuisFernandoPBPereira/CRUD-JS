//Função para editar campo
function update(){
    try {
        success.innerHTML = ""
        warning.innerHTML = ""
        //Desabilito os botões que não vão ser usados na atualização
        disableButtons()
        
        //Crio o formulário para editar o usuário desejado
        let form = document.getElementById("confirmationForm")
        form.innerHTML = `
            <div>
                <label for="name">Digite o nome do usuário que deseja editar</label>
                <div class="name">
                    <input class="form-field js-field" id="nameConfirmation" maxlength="120" name="name" required type="text" placeholder="Digite seu nome" value="">
                    <br>
                </div>
            </div>
            <section class="button buttonConfirmation">
                <button onclick="updating()" type="submit">Confirmar</button>
                <button onclick="cancel()" type="submit">Cancelar</button>
            </section>  
    
        `
    } 
    catch(error){
        warning.innerHTML = "Operação cancelada"
        deleteWarning(warning)
    }
   
    
}

function updating(){
    try {
        let userExists = true
        //Recebo o nome do campo que o usuário deseja editar
        let name = document.getElementById("nameConfirmation").value
        let form = document.getElementById("confirmationForm")
        if(!name){
            warning.innerHTML="Não foi possível realizar a operação..."
            deleteWarning(warning)
        }
        //faço um FOR para percorrer o localStorage e comparar o campo que deseja editar
        for(let i = 0; i < localStorage.length; i++){

            if(name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase() &&
                JSON.parse(localStorage[i]).statusUser == "Ativo"){
                    userExists = true
                    //Crio o formulário para serem passados os novos dados
                    form.innerHTML = `
                        <div>
                            <label for="name"><strong>Editando ${name}</strong></label>
                            <br>
                            <br>
                            <label for="name">Nome</label>
                            <div class="name">
                            <input class="form-field js-field" id="nameConfirmation" maxlength="120" name="name" required type="text" placeholder="Digite seu nome" value="">
                            <br>
                            </div>
                        </div>   
                        <label for="birth-date">
                        Data de Nascimento
                        </label>
                        <div class="birth-date">
                            <input class="form-field js-field" id="birthdateConfirmation" name="birth-date" type="date" value="">
                        </div>
                        <section class="button buttonConfirmation">
                            <button onclick="confirmUpdate()" type="submit">Atualizar</button>
                            <button onclick="cancel()" type="submit">Cancelar</button>
                        </section>  
                        `
                        //Encerro o loop
                        i = localStorage.length
            }
            //Se o nome passado for diferente do armazenado, não será editado
            else if(name.toUpperCase() != JSON.parse(localStorage[i]).name.toUpperCase()){
                userExists = false
            }
        }
        //Aviso que o usuário informado não existe
        if(userExists == false){
            warning.innerHTML = `O usuário "${name}" não existe`
            deleteWarning(warning)
            //Retiro o formulário da tela
            form.innerHTML = ""
            //Ativo os botões que não foram usados na atualização
            activeButtons()
        }
       
    } 
    catch(error){
        warning.innerHTML = "Operação cancelada"
        deleteWarning(warning)
    } 
}


function confirmUpdate(){
    try {
        let form = document.getElementById("confirmationForm")
        let newName = document.getElementById("nameConfirmation").value
        let newDate = document.getElementById("birthdateConfirmation").value
           
        if(newName == "" || newDate == ""){
            warning.innerHTML="Insira um nome e/ou uma data nova..."
            deleteWarning(warning)
            //i recebe o tamanho do localStorage para encerrar o FOR
            i = localStorage.length
        }
        //Se a variável conter números
        else if(/[0-9]/g.test(newName)){
            warning.innerHTML = "Digite o novo nome corretamente..."
            deleteWarning(warning)
        }
        else if(newDate.length < 10 || newDate.length > 10){
            warning.innerHTML = "Digite a nova data corretamente..."
            deleteWarning(warning)
        }
        else{
            let userExists = false
            let date = new Date(newDate);
            let formatDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            let user = {
                name: newName,
                birthdate: formatDate,
                statusUser: "Ativo"
            }
            for(let i = 0; i < localStorage.length; i++){
                if(user.name.toUpperCase() != JSON.parse(localStorage[i]).name.toUpperCase()){
                    userExists = false
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
                
                else if(user.name.toUpperCase() == JSON.parse(localStorage[i]).name.toUpperCase() &&
                JSON.parse(localStorage[i]).statusUser == "Ativo"){
                    userExists = true
                    i = localStorage.length
                }
            }
    
            if(userExists == true){
                warning.innerHTML = "O novo nome de usuário já existe"
                deleteWarning(warning)
            }
        }    
        
    } catch (error) {
        warning.innerHTML = "Operação cancelada"
    }
}
