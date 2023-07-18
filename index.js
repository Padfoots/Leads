const saved_bookmarks = document.getElementById("saved_ls")
const inputEl = document.getElementById("input-el")
const saveBtn=document.getElementById("save-btn")
const del_btn=document.getElementById("del-btn")
const save_current=document.getElementById("save-btn2")

del_btn.addEventListener("click",function delete_all(){
    localStorage.clear()
    myLeads_array=[]
    renderLeads(myLeads_array)
})

if(!localStorage.getItem("myLeads")){
    let myLeads_array=[]
    localStorage.setItem("myLeads",JSON.stringify(myLeads_array))
}


myLeads_array = JSON.parse(localStorage.getItem("myLeads"))
renderLeads(myLeads_array)

save_current.addEventListener("click",function(){

    chrome.tabs.query({active: true, currentWindow: true},
        function(tabs){
            console.log(tabs[0].url)

            myLeads_array.push(tabs[0].url)

        
            // convert the array to a string again and set its
            localStorage.setItem("myLeads",JSON.stringify(myLeads_array))
            
            //display it to the user in html format
            renderLeads(myLeads_array)
        })
    })
    
saveBtn.addEventListener("click",function(){

    if(inputEl.value!=0){

        // push the new item to the array as a string
        myLeads_array.push(inputEl.value)

        
        // convert the array to a string again and set its
        localStorage.setItem("myLeads",JSON.stringify(myLeads_array))
        
        //display it to the user in html format
        renderLeads(myLeads_array)
        
        inputEl.value = ""

    }
})


function renderLeads(myLeads_array){
    let listItems=""
    for(let i = 0; i<myLeads_array.length; i++){
       
        listItems+= 
        `
            <li id="myList">
                <a target="_blank" href="${myLeads_array[i]}"> ${myLeads_array[i]}</a> 
                </li>
        `
    }
    saved_bookmarks.innerHTML = listItems

    

}
