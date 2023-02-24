//Função para desabilitar todos os botões ao realizar uma ação
function disableButtons(){
    document.getElementById("createButton").disabled = true
    document.getElementById("updateButton").disabled = true
    document.getElementById("deleteButton").disabled = true
    document.getElementById("deleteAllButton").disabled = true
}
//Função para habilitar todos os botões depois de realizar uma ação
function activeButtons(){
    document.getElementById("createButton").disabled = false
    document.getElementById("updateButton").disabled = false
    document.getElementById("deleteButton").disabled = false
    document.getElementById("deleteAllButton").disabled = false
}
//Função do botão "Ler mais"
function showInformation(){
    let span = document.getElementById("span")
    let button = document.getElementById("button")
    span.innerHTML = `
        <ul>
            <li>
                Seus dados estão sendo armazenados em seu
                local storage (o armazenamento do seu
                navegador), do qual não temos acesso.
            </li>
            <li>
                Caso queira limpar seu local storage,
                apenas clique sobre o botão "Limpar tudo".
            </li>
            <br>
            <h3>Sobre o site:</h3>
            <li>
                Neste site, você pode cadastrar a data de aniversário 
                de seu amigo, assim você nunca vai esquecer 😄.
            </li>
            <li>
                <strong>Para os desenvolvedores:</strong> Este site foi desenvolvido
                 para testar meus conhecimentos ao realizar um CRUD 
                 (Create, Read, Update and Delete => Criar,
                 Ler, Atualizar e Apagar), além de que este site não possui
                 nenhum tipo de framework, library ou database
            </li>
            <li>
                Desenvolvido e publicado por: Luis Fernando P. B. Pereira
            </li>
        </ul>`
        
        button.innerHTML = `<button id="seeMore" onclick="hideInformation()">Fechar</button>`

}
//Função do botão "Fechar"
function hideInformation(){
    let span = document.getElementById("span")
    let button = document.getElementById("button")

    span.innerHTML = `
    <ul>
        <li>
            Seus dados estão sendo armazenados em seu
            local storage (o armazenamento do seu
            navegador), do qual não temos acesso.
        </li>
    </ul>`
    button.innerHTML = `<button id="seeMore" onclick="showInformation()">Ler mais</button>`
}