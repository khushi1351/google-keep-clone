const addButton = document.querySelector('#add');

const updateLS = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}
const addNewNote = (text = '') =>{
   const note = document.createElement('div');
   note.classList.add('note');  

   const htmlData = `
   <div class="operation">
   <button class="edit"><i class="fas fa-edit"></i></button>
   <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>

<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea> `;

note.insertAdjacentHTML('afterbegin', htmlData);

const editButton = note.querySelector('.edit');
const deleteButton = note.querySelector('.delete');
const mainDiv = note.querySelector('.main');
const textarea = note.querySelector('textarea');

deleteButton.addEventListener('click', ()=>{
    const val = notes.filter((curr)=>{
        console.log(curr);
        return curr != textarea.value;
    })
    
    localStorage.setItem('notes', JSON.stringify(val));
    


    note.remove();
})

textarea.value = text;
mainDiv.innerHTML = text;

textarea.addEventListener('change', (event)=>{
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLS();
})

   

 editButton.addEventListener('click', () => {
    mainDiv.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
 })


document.body.appendChild(note);

}

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){notes.forEach((note) => addNewNote(note))}

addButton.addEventListener('click', () => addNewNote());