
  const handleCatagori = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const data = await res.json();
    const news = data.data.news_category;
    displayCatagory(news);
  };

  const displayCatagory = (news) => {
    console.log(news);
    const tabContainer = document.getElementById("tab-container");
    news.slice(0, 3).forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <a onclick = "handleLoadNews('${category.category_id}')" class='tab'>${category.category_name}</a>
      `;
      tabContainer.appendChild(div);
    });
  }

  const handleLoadNews = async (catagoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${catagoryId}`);
    const data = await res.json();
    const news = data.data[2];
    console.log(news);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    news.forEach(data => {
      const div = document.createElement('div');
      div.innerHTML = `
         <div class="card bg-base-100 shadow-xl">
         <figure>
           <img
             src="${data?.image_url
        }"
             alt="Shoes"
           />
         </figure>
         <div class="card-body">
           <h2 class="card-title">
             ${data?.title.slice(0, 40)}
             <div class="badge badge-secondary p-5">${data?.rating?.badge}</div>
           </h2>
           <p>
           ${data?.details.slice(0, 80)}
           </p>
           <h3> totoal viws: ${data.total_view ? data.total_view : "no vviews"
        }</h3>
           <div class="card-footer flex justify-between mt-8">
             <div class="flex">
               <div>
                 <div class="avatar online">
                   <div class="w-14 rounded-full">
                     <img
                       src="${data?.author?.img
        }"
                     />
                   </div>
                 </div>
               </div>
               <div>
                 <h6>${data?.author?.name
        }</h6>
                 <small>${data?.author?.published_date
        }</small>
               </div>
             </div>
             <div class="card-detaild-btn">
               <button onclick=handleModal('${data._id}') class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
               >
                 Details
               </button>
             </div>
           </div>
         </div>
       </div>
         `
      cardContainer.appendChild(div)
    });
  }

  const handleModal = async (newsId) => {
    // console.log(newsId);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await res.json()
    const news = data.data[2];
    news.forEach(data => {
        showPhoneDetails(data);
    });
  }

  const showPhoneDetails = (phone) =>{
  console.log(phone);
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img  class="m-auto" src="${phone.image}" alt="" />
  <h1 class='font-bold'>${phone.name}</h1>
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
  <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
  `
  // show the modal
  show_details_modal.showModal();
}
  handleCatagori();
  handleLoadNews('01')
