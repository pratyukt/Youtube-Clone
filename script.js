const videoCardContainer = document.querySelector(".list_container");
let api_key = "AIzaSyA8Zpqswo6zpFrkNrOKpPOb0dvhJwLS7GM";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
var menuIcon = document.querySelector(".menu_icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidbar");
    container.classList.toggle("large_container");
}

let side = document.getElementsByClassName("1");
for (let index = 0; index < side.length; index++) {
    side[index].onclick = function () {
        side[index].style.color= "red"
    }
    
}

fetch(
    video_http + new  URLSearchParams({
        part: "snippet, contentDetails, statistics, player",
        chart: "mostPopular",
        maxResults: 20,
        regionCode : "IN",
        key: api_key,
    })
)

.then((res) => res.json())
.then((data) => {
    data.items.forEach((item) =>{
        getChannelIcon(item);
    })
})
.catch((err) => console.log(err));

const getChannelIcon = (video_data) =>{
    fetch(
        channel_http + new URLSearchParams({
            key: api_key,
            part: "snippet",
            id: video_data.snippet.channelId,
        })
    )
    .then((res) => res.json())
    .then((data) => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    });
};

const makeVideoCard =(data) => {
    const videocard = document.createElement("div");
    videocard.classList.add("video");
    videocard.innerHTML = `
                <div class="video-content">
                    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt=""/>
                </div>
                <div class="video-details">
                    <div class="channel-logo">
                        <img src="${data.channelThumbnail}" class="channel-icon" alt=""/>
                    </div>
                    <div class="detail">
                        <h3 class="title">${data.snippet.title}</h3>
                        <div class="channel-name">${data.snippet.channelTitle}</div>
                    </div>
                </div>
            `;
            videoCardContainer.appendChild(videocard);
};