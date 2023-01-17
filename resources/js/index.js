//check the rss link before final

async function fetchNews(url) {
  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
    const data = await res.json();
    return data;
  }
  catch(err) {
    return err;
  }
}

function createCard() {
  let count = 1;
  magazines.forEach(async ele => {
    const news = await fetchNews(ele);
    let accordionHeaderDiv = document.createElement("div");
    accordionHeaderDiv.className = "accordion-item pt-4 m-0";
    let upIcon = document.createElement("span");
    // upIcon.innerHTML = `<i class="fa fa-solid fa-chevron-up"></i>`;
    upIcon.className = "accordion_header";
    upIcon.id = "headingOne";
    let button = document.createElement("button");
    button.className = "accordion_button ms-4 collapsed";
    button.type = "button";
    button.setAttribute("data-bs-toggle","collapse");
    button.setAttribute("data-bs-target", "#collapse"+count);
    button.setAttribute("aria-expanded","true");
    button.setAttribute("aria-controls","collapse"+count);
    button.innerHTML=`<i class="fa fa-solid fa-chevron-down me-1"></i> ${news.feed.title}`;
    upIcon.append(button);
    accordionHeaderDiv.append(upIcon);

    let accordionBodyDiv = document.createElement("div");
    accordionBodyDiv.id = "collapse"+count;
    accordionBodyDiv.classList.add("accordion-collapse","collapse");
  
    accordionBodyDiv.setAttribute("aria-labelledby","heading"+count);
    accordionBodyDiv.setAttribute("data-bs-parent","#accordionExample");
    count++;
    accordionHeaderDiv.append(accordionBodyDiv);

    accordionBodyDiv.innerHTML = `
      <div class="accordion-body">
          <div id="carouselExampleControls${count}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" id="carousel-inner${count}">
            </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${count}" data-bs-slide="prev">
          <span aria-hidden="true"><i class="fa fa-solid fa-chevron-left"></i></span>
          <span class="visually-hidden">Previous</span>
          </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${count}" data-bs-slide="next">
            <span aria-hidden="true"><i class="fa fa-solid fa-chevron-right"></i></span>
            
            <span class="visually-hidden">Next</span>
           </button>
          </div>
       </div>
     </div>`
    
     

     document.getElementById("accordionExample").append(accordionHeaderDiv);
    news.items.forEach(element => {
      let carouselDiv = document.createElement("div");
      carouselDiv.classList.add("carousel-item");
      // carouselDiv.firstChildElement.className = "carousel-item active";
      let date=new Date(element.pubDate);

      carouselDiv.innerHTML=`
      <a href=${element.link}
      <div class="card">
      <img src="${element.enclosure.link}" class="d-block w-100 card-img-top">
     <div class="card-body">
     <h5 class="card-title">${element.title}</h5>
     <h6>${element.author} • ${date.toLocaleDateString()}</h6>
     <p class="card-text">${element.content}</p>
  
      </div>
      </div></a>`
      document.getElementById(`carousel-inner${count}`).append(carouselDiv);

      let accordionElem = document.getElementById("collapse1");
      accordionElem.className = "show";
      // accordionBodyDiv.className = "show";


      let getElem = document.getElementById(`carousel-inner${count}`);
      getElem.children[0].className = "carousel-item active";

    });


    console.log(news.feed.title);
  });
}

createCard();