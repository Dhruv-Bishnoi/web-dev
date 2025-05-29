const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const child = card.querySelector('.player');

      card.addEventListener('mouseenter', () => {
        child.classList.add('playhoverd');
      });

      card.addEventListener('mouseleave', () => {
        child.classList.remove('playhoverd');
      });
    });



function hoverInli(){
  const items = document.querySelector(".library-main").getElementsByTagName("li");

  for (let item of items) {
    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = "#444";
      var changeno = item.querySelector(".song-no")
      changeno.innerHTML = '<img src="assets/play-svgrepo-com.svg" width="20x" hight="20px" alt="">'

      
     
    });
  }
  }


async function hoverOutli(){
  
  const items = document.querySelector(".library-main").getElementsByTagName("li");
  songs = await getsongsname(); 
   for (const song of songs) {
    var index = songs.indexOf(song);
  for (let item of items) {
   item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "bkack";
        let change = item.querySelector(".song-no")

        change.innerHTML = index+1

        
      });
    }
  }
}

async function getsongsname() {

  let a = await fetch("http://127.0.0.1:3000/assets/song/")
  let response = await a.text();

  let div = document.createElement("div")
  div.innerHTML = response
  let as = div.getElementsByTagName('a')
  let songname =[]
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
     if (element.href.endsWith(".mp3")) {
        
      songname.push(element.href)
    }
    
  }
   return songname
}





// This is your global audio object
let track = null;

// Update progress bar
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  if (track && track.duration) {
    const percent = (track.currentTime / track.duration) * 100;
    console.log(percent)
    progressBar.style.width = `${percent}%`;
  }
}

// Add event listener when playing
function attachProgressUpdater() {
  if (track) {
    track.addEventListener("timeupdate", updateProgressBar);
  }
}

let currentLi = null;

// Update play/pause icons
function updatePlayIcons(isPlaying) {
  const barIcon = document.getElementById("play-btn");
  barIcon.innerHTML = isPlaying
    ? `<img src="assets/pause-svgrepo-com.svg" width="40px" height="40px" alt="">`
    : `<img src="assets/play2-svgrepo-com.svg" width="40px" height="40px" alt="">`;

  document.querySelectorAll(".library-main li").forEach((li, index) => {
    const iconDiv = li.querySelector(".song-no");
    if (li === currentLi && isPlaying) {
      iconDiv.innerHTML = `<img src="assets/pause-svgrepo-com.svg" width="20px" height="20px" alt="">`;
    } else {
      iconDiv.textContent = index + 1;
    }
  });
}

// Play or pause song
function playsong(url, liElement) {
  if (track && track.src === url) {
    // Toggle pause/play
    if (track.paused) {
      track.play();
      currentLi = liElement;
      
      updatePlayIcons(true);
    } else {
      track.pause();
      updatePlayIcons(false);
    }
  } else {
    // New song selected
    if (track) track.pause();
    
    track = new Audio(url);
    track.play();
    currentLi = liElement;
    attachProgressUpdater(); // <-- attach progress updater here
    updatePlayIcons(true);

    track.addEventListener("ended", () => {
      updatePlayIcons(false);
    });
  }
}
async function main() {
  songs = await getsongsname();
  audio = new Audio(songs[3]);

  let songul = document.querySelector(".library-main ul");
  songul.innerHTML = ""; // Clear any previous content

  songs.forEach((song, index) => {
    const songhalf = song.split("/song/")[1]
    const songname = songhalf.replaceAll("%20", " ").replace(".mp3", "");
    const displayName = songname.split("-");

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="song-no">${index + 1}</div>
      <div class="songpic">
        <img src="assets/img/ab67616d00001e02a5183fa4b99bcec1f506418d.jpeg" width="40px" height="40px">
      </div>
      <div class="album">
        <div class="songname">${displayName[0]}</div>
        <div class="singer">${displayName[1]}</div>
        <div hidden class="url">${song}</div>

      </div>`;

    // Add hover behavior with correct index
    li.addEventListener("mouseenter", () => {
      li.style.backgroundColor = "#444";
      const changeno = li.querySelector(".song-no");
      changeno.innerHTML = `<img src="assets/play-svgrepo-com.svg" width="20px" height="20px" alt="">`;
    });

    li.addEventListener("mouseleave", () => {
      li.style.backgroundColor = "";
      const changeno = li.querySelector(".song-no");
      changeno.textContent = index + 1;
    });

    li.addEventListener('click',()=>{
     let urls = li.innerHTML.split('class="url">')[1].split("</div>")[0]
     console.log(urls)
     playsong(urls, li);


    })

    songul.appendChild(li);
  });

  
}

 const barIcon = document.getElementById("play-btn");

if (barIcon) {
  barIcon.addEventListener("click", () => {
    
      if (track.paused) {
        track.play();
        updatePlayIcons(true); // update UI (playbar + library)
      } else {
        track.pause();
        updatePlayIcons(false);
      }
    }
  );
}






    


main() 
