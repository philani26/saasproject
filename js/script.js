document.querySelector(".search-btn").addEventListener('click', ()=> {
    let text = document.getElementById('filter-job').value;
    getJobs().then(jobs => {
        let filterjobs = filterJob(jobs, text);
        showJobs(filterjobs)
    })   
})

function getJobs(){
    return fetch('data.json').then(res => res.json()).then(data => {
        // console.log(data);
        return data
    })
}

function showJobs(jobs){
let jobContainer = document.querySelector('.job-container');

let jobsHTML = '';
jobs.forEach(job => {
    jobsHTML += `
    <div class="job-tile">
    <div class="top">
       <img src="${job.logo}">
       <span class="material-icons" more_horz>more_horiz</span> 
    </div>
        <div class="rolename">
            <span>${job.roleName}</span>
        </div>
        <div class="description">
            <span>${job.requirements.content}</span>
        </div>
        <div class="btns">
            <div class="button apply-now">Apply now</div>
            <div class="button ">Message</div>
        </div>
   
</div>
    `

})
jobContainer.innerHTML = jobsHTML
}

getJobs().then(data => {

    showJobs(data);
})

function filterJob(jobs, searchText){
    if(searchText){
        let filterJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText)
            || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)
            ){
                return true
            }else{
                return false;
            }
        })
        return filterJobs;
    }
    
}