console.log("Hello Index js");


function loadCatagories() {
    // fetch data 
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            displayUi(data);
        })
        .catch(err => console.log("The error is: ",err));
}

function displayUi(data) {
    // target catagory container 
    const catagoryBtn = document.getElementById('catagoryBtn');
    // loop in catagory array
    for(let item of data.categories) {
        // create a button tag
        const btn = document.createElement('button');
        btn.classList.add("px-4", "py-1", "bg-gray-200", "text-gray-600", "mx-2", "cursor-pointer");
        btn.innerText = `${item.category}`;
        // append in catagory container 
        catagoryBtn.appendChild(btn)
    }
}


loadCatagories();