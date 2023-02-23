function disableButtons(){
    document.getElementById("createButton").disabled = true
    document.getElementById("updateButton").disabled = true
    document.getElementById("deleteButton").disabled = true
    document.getElementById("deleteAllButton").disabled = true
}

function activeButtons(){
    document.getElementById("createButton").disabled = false
    document.getElementById("updateButton").disabled = false
    document.getElementById("deleteButton").disabled = false
    document.getElementById("deleteAllButton").disabled = false
}