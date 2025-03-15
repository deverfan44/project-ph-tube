// Category load form database via API 
function loadCatagories() {
    // fetch data 
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            const allBtn = document.getElementById('allBtn');
            allBtn.classList.add('active');
            displayCategories(data);
        })
        .catch(err => console.log("The error is: ",err));
}


function removeActiveClass() {
    const activeBtn = document.getElementsByClassName('active');
    for(let btn of activeBtn) {
        btn.classList.remove('active');
    }
}
function loadCatagoriesVideos(id) {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url).then(res => res.json()).then(data => {
        removeActiveClass();
        const clickBtn = document.getElementById(`btn-${id}`);
        clickBtn.classList.add('active');
        displayVideos(data.category);
        
    });



}
// Video load form database via API 
function loadVideos(searchText = "") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos));
}

// Display Catagories button 
function displayCategories(data) {
    // target catagory container 
    const catagoryBtn = document.getElementById('catagoryBtn');
    // loop in catagory array
    for(let item of data.categories) {
        // create a button tag
        const btn = document.createElement('button');
        btn.classList.add("px-4", "py-1", "bg-gray-200", "text-gray-600", "mx-2", "cursor-pointer","hover:bg-red-600","hover:text-white");
        btn.setAttribute('onclick',`loadCatagoriesVideos(${item.category_id})`);
        btn.setAttribute('id',`btn-${item.category_id}`);
        btn.innerText = `${item.category}`;
        // append in catagory container 
        catagoryBtn.appendChild(btn)
    }
}

const displayVideoDetails = (video) => {
    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.innerHTML = "";
    const targetModel = document.getElementById('video_details');
    const div = document.createElement('div');
    div.innerHTML = `
                    <h3 class="text-lg font-bold">${video.title}</h3>
                    <p class="py-4">${video.description}</p>
            `
    detailsContainer.appendChild(div);
    targetModel.showModal();
}
const loadVideoDetials = (video_id) =>{
    // console.log(video_id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video));

}
// Display Videos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = "";
    if(videos.length == 0) {
        videosContainer.innerHTML = `
                <div class="col-span-full text-center">
                    <div>
                        <img src="./image/Icon.png" class="mx-auto" alt="">
                        <h2 class="text-2xl">Opps! Here no Collection</h2>
                    </div>
                </div>
        `
        return;
    }
    videos.forEach(video => {
        // console.log(video);
        // console.log(video['authors'][0]['profile_picture']);
        // console.log(video['thumbnail']);
        const div = document.createElement('div');
        div.innerHTML = `<div class='h-[200px] relative rounded-lg overflow-hidden'>
                            <img src="${video['thumbnail']}" class="w-full h-full object-cover" alt="">
                            <span class="absolute right-2 bottom-2 text-white bg-[#171717] px-2 py-1 text-xs rounded-sm">3hour 53min ago</span>
                        </div>
                        <div class="flex px-1 py-3">
                            <div class="basis-[30%]">
                                <div class="avatar text-center">
                                    <div class="w-[70%] rounded-full">
                                        <img src="${video['authors'][0]['profile_picture']}" />
                                    </div>
                                </div>
                            </div>
                            <div class="grow space-y-1">
                                <h3 class="text-[16px] font-semibold">${video.title}</h3>
                                <p class="text-[14px] text-gray-600">${video['authors'][0]['profile_name']} ${video['authors'][0]['verified'] == true ? '(Verified)':""}</p>
                                <p class="text-[14px] text-gray-600">${video['others']['views']}</p>
                            </div>
                        </div>
                        <div>
                            <button for="video_details" onclick="loadVideoDetials('${video.video_id}')" class="btn btn-block">Show Details</button>
                        </div>
                        `;
        videosContainer.appendChild(div);
    })
}

document.getElementById('searchInput').addEventListener('keyup',(event)=> {
    const inputValue = event.target.value;
    loadVideos(inputValue);
})



loadVideos();
loadCatagories();


