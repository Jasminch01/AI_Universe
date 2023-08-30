
//

const cardContainer = document.getElementById('card-container');

const showAllBtn = document.getElementById('show-all-container');

const loadData = async ( isShowAll) => {
    const res = await fetch (' https://openapi.programming-hero.com/api/ai/tools');

    const data = await res.json();
    const products = data.data.tools;
    // console.log(products)
    showData(products, isShowAll)
}

const showData = (products, isShowAll) => {
  cardContainer.textContent = ''
  if (products.length > 6 && !isShowAll) {
    products = products.slice(0,6); 
  }
  if(isShowAll){
    showAllBtn.classList.add('hidden')
  }
    products.forEach(product => {
        const cards = document.createElement('div');
        cards.classList = `card card-compact border bg-base-100 rounded-xl`;
        cards.innerHTML = `
        <div><img src="${product?.image || ''}" alt="Shoes" /></div>
        <div class="card-body">
          <h2 class="card-title">${product?.name}</h2>
          <p>${product?.description || ''}</p>
          <div></div>
          <div class="flex justify-between items-center">
            <div>
                <h3 class="text-2xl font-medium">name</h3>
                <p> Publish Date: ${product.published_in}</p>
            </div>
            <button class="" id = ''> --></button>
          </div>
        </div>
        `
        cardContainer.appendChild(cards)
        console.log(product);
    });
}

const showBtn = () => {
  loadData(true);
}
loadData();