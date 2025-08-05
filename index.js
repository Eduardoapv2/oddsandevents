const numberBank = [];
const oddNumbers = [];
const evenNumbers = [];


function FormComponent(){
const $form = document.createElement("form");
const $input = document.createElement("input");
const $button = document.createElement("button");

$input.type = "number";
$input.placeholder = "Enter a number";
$input.name = "number";

$button.textContent = "Add number";

$form.addEventListener("submit", event =>{
    event.preventDefault();
    const value = $input.value.trim();
    if (value==="")return;

    const num=Number(value);
    if(!Number.isNaN(num)){
        numberBank.push(num);
        $input.value="";
        render();
    }
});
$form.append($input,$button);
return $form;
} /*builds and returns the form with an input + “Add number” button*/

function BankListComponent(){
    const $section =document.createElement("section");
    const $h2 =document.createElement("h2");
    const $ul =document.createElement("ul");
    
    $h2.textContent = "Bank";
     $ul.className = "lineup";

   
    numberBank.forEach(num =>{
        const $li =document.createElement("li");
        $li.textContent=num;
        $ul.append($li);
    });
$section.append($h2,$ul);
return $section;
}  /* – renders the numbers currently in numberBank*/

function SortButtonsComponent(){
    const $div = document.createElement("div");
    const $sortOne =document.createElement("button");
    const $sortAll=document.createElement("button");

    $sortOne.textContent= "Sort One";
    $sortAll.textContent= "Sort All";

    $sortOne.addEventListener("click", () =>{
        if (numberBank.length === 0)return;

        const value = numberBank.shift();
        if(value % 2 === 0) evenNumbers.push(value);
        else oddNumbers.push(value);
        render ();
    });
    $sortAll.addEventListener("click", ()=>{
        while(numberBank.length > 0){
            const value = numberBank.shift();
            if (value % 2 === 0) evenNumbers.push(value);
            else oddNumbers.push(value);
        }
        render();
    });
    $div.append($sortOne, $sortAll);
    return $div;
} /*– produces your “Sort 1” and “Sort All” buttons*/

function CategoryListComponent(title, items){
    const $section =document.createElement("section");
    const $h2 =document.createElement("h2");
    const $ul =document.createElement("ul");

    $h2.textContent= title;
    $section.classList.add("category");
    $h2.classList.add("category-title");
    $ul.classList.add("category-list");

    items.forEach(num => {
        const $li = document.createElement("li");
        $li.textContent = num;
        $ul.append($li);
    });
    $section.append($h2, $ul);
    return $section;
}/*– given a title and an array, returns a labeled <ul>*/

function CategoryComponent(){
    const $div =document.createElement("div");
    const $odd =CategoryListComponent("Odd Numbers", oddNumbers);
    const $even =CategoryListComponent("Even Numbers", evenNumbers);
    $div.append($odd, $even);
    return $div;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <NumForm></NumForm>
    <BankList></BankList>
    <SortButtons></SortButtons>
    <Categories></Categories>`;
   
    $app.querySelector("NumForm").replaceWith(FormComponent());
    $app.querySelector("BankList").replaceWith(BankListComponent());
    $app.querySelector("SortButtons").replaceWith(SortButtonsComponent());
    const $catsPlaceholder= $app.querySelector("Categories");
    const $wrapper =document.createElement("div");
    $wrapper.append(
    CategoryListComponent("Even Numbers", evenNumbers),
    CategoryListComponent("Odd Numbers", oddNumbers)    );
    $catsPlaceholder.replaceWith($wrapper);
}
render();

