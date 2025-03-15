const allBtn = document.getElementById('allBtn');
allBtn.addEventListener('click', ()=> {
    removeActiveClass();
    allBtn.classList.add('active');
});
allBtn.addEventListener('click', ()=> {
    loadVideos();
})