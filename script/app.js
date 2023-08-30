//

const cardContainer = document.getElementById("card-container");

const showAllBtn = document.getElementById("show-all-container");
const modalContainer = document.getElementById("modal-container");

const loadData = async (isShowAll) => {
  const res = await fetch(" https://openapi.programming-hero.com/api/ai/tools");

  const data = await res.json();
  const products = data.data.tools;
  // console.log(products)
  showData(products, isShowAll);
};

const showData = (products, isShowAll) => {
  cardContainer.textContent = "";
  if (products.length > 6 && !isShowAll) {
    products = products.slice(0, 6);
  }
  if (isShowAll) {
    showAllBtn.classList.add("hidden");
  }
  products.forEach((product) => {
    const cards = document.createElement("div");
    cards.classList = `card card-compact border bg-base-100 rounded-xl`;
    cards.innerHTML = `
        <div><img src="${product?.image || ""}" alt="Shoes" /></div>
        <div class="card-body">
          <h2 class="card-title">${product?.name}</h2>
          <p>${product?.description || "Description not found"}</p>
          <div></div>
          <div class="flex justify-between items-center">
            <div>
                <h3 class="text-2xl font-medium">${product.name}</h3>
                <p> Publish Date: ${product.published_in}</p>
            </div>
            <button class="" id = '' onclick = 'modalHandle("${
              product.id
            }")'> --></button>
          </div>
        </div>
        `;
    cardContainer.appendChild(cards);
    // console.log(product.id);
  });
};

const showBtn = () => {
  loadData(true);
};

const modalHandle = async (productId) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/ai/tool/${productId}`
  );
  const data = await res.json();
  const productInfo = data.data;
  modalContainer.textContent = ''
  showDetailsData(productInfo)

};

const showDetailsData = (info) =>{
  console.log(info)
  const modaldiv = document.createElement("div");
  modaldiv.innerHTML = `
  <dialog id="my_modal" class="modal">
    <form method="dialog" class="modal-box">
    <div class = 'flex justify-between items-center gap-4'>
    <div class = 'border border-red-400 bg-red-100 p-3 text-center rounded-xl'>
      <h3 class = "text-2xl font-medium"> ${info.description}</h3>
      <div>
        <button class = "p-5 bg-white"> btn</button>
        <button class = "p-5 bg-white"> btn</button>
        <button class = "p-5 bg-white"> btn</button>
      </div>
      <div class = 'flex justify-between items-center'>
        <div>
            <h1>Feature</h1>
            <p> </p>
            <p> </p>
        </div>
        <div>
          <h1>Integrations</h1>
          <p> </p>
          <p> </p>
        </div>
      </div>
    </div> 
    <div class= 'border rounded-xl p-3'>
      <img src = "${info.image_link[0]}"/>
      <h1>Integrations</h1>
      <p> </p>
    </div> 
  </div>
  <div class="modal-action text-center">
    <button class="btn bg-red-500 text-white">Close</button>
  </div>
  
    </form>
  </dialog>
  `;

  modalContainer.appendChild(modaldiv);

  const modalId = document.getElementById("my_modal");
  modalId.showModal();
  
}

loadData();
