const addButton = document.querySelector('#add');
const Update_LS_data=()=>{
    const textAreaData =document.querySelectorAll('#text_edit');
    const notes =[];
    console.log(textAreaData);
    textAreaData.forEach((note)=>{
        if(note.value !=''){
            return notes.push(note.value);
        }
        
    })
    console.log(notes);
    localStorage.setItem('notes',JSON.stringify(notes));
}
const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');
    let bg_color = ["bg-slate-200","bg-green-200","bg-red-200","bg-blue-200","bg-yellow-200","bg-orange-200","bg-cyan-200","bg-purple-200"];
    let bg = bg_color[Math.floor(Math.random() * bg_color.length)];
    const htmlData = `
    <div class="w-[288px] h-[350px] ${bg} rounded-lg mt-12 mx-6">
    <div id="operation" class="flex justify-end items-center space-x-4 h-[20%]">
        <div id="edit_bg" class="w-[45px] h-[45px]  flex justify-center items-center ${text ? "":"bg-white"} rounded-lg ">
            <button id="edit"   class="fa-regular fa-pen-to-square text-[30px] "></button>
        </div>
            <button id="delete" class="fa-regular fa-trash-can text-[30px]"></button>
    </div>
    <hr class="border-2 border-green-900 rounded-lg mb-1">
    <div id="text" class="h-[79%]">
        <textarea disabled id="main" class="${bg} w-[100%] h-[95%] p-8 scr ${text ? "" : "hidden"}" style="outline:none;resize:none" ></textarea>
        <textarea
            id="text_edit"
            type="text"
            class="${bg} w-[100%] h-[95%] p-8 ${text ? "hidden" : ""}"
            style="outline:none;resize:none"
            placeholder="Write Your Note Here"
        ></textarea>
    </div>
    </div>`;

    note.insertAdjacentHTML('afterbegin',htmlData);
    // getting the references
    console.log(note);
    
    const editButton = note.querySelector('#edit');
    const delButton = note.querySelector('#delete');
    const mainDiv = note.querySelector('#main');
    const textArea =note.querySelector('#text_edit');
    const edit_bg =note.querySelector('#edit_bg')

    // deleting the node
    delButton.addEventListener('click',()=>{
        note.remove();
        Update_LS_data();
    })

    // toggle using edit button
    if(text !=''){
        textArea.value =text;
        mainDiv.value =text;
    }
    
    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })
    editButton.addEventListener('click',()=>{
        edit_bg.classList.toggle('bg-red');
        edit_bg.classList.toggle('bg-white');
    })
    textArea.addEventListener('change',(event)=>{
        
        console.log(event.target.value);
        const value = event.target.value;
        textArea.value= value;
        mainDiv.value=value;
        console.log("Value= "+value);
        Update_LS_data();
    })
    document.getElementById('center').appendChild(note);


}
const notes =JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note)=> addNewNote(note))};
if(notes == null)
{
    addNewNote();
}
else if(notes.length == 0){
    addNewNote();
}
addButton.addEventListener('click',()=>addNewNote());