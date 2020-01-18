document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('.search');
  const cartBtn = document.getElementById('cart');
  const wishlistBtn = document.getElementById('wishlist');
  const goodsWrapper = document.querySelector('.goods-wrapper');
  const cart = document.querySelector('.cart');
  const category = document.querySelector('.category');
  const preloader = document.getElementById('spinner');

  const getGoods = (handler, filter) => {
    fetch('./db/db.json')
      .then(response => response.json())
      .then(filter)
      .then(handler)
      .then(closeSpinner);
  }

  const loadSpinner = () => {
    preloader.style.display = 'block';
  }

  const closeSpinner = () => {
    preloader.style.display = 'none';
  }

  const createCardGoods = (id, title, price, img) => {
    const card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = `<div class="card">
      									<div class="card-img-wrapper">
      										<img class="card-img-top" src="${img}" alt="">
      										<button class="card-add-wishlist" data-goods-id="${id}"></button>
      									</div>
      									<div class="card-body justify-content-between">
      										<a href="#" class="card-title">${title}</a>
      										<div class="card-price">${price} ₽</div>
      										<div>
      											<button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
      										</div>
      									</div>
      								</div>`

    return card;
  };

  const renderCard = (items) => {
    goodsWrapper.textContent = '';

      items.forEach(({id, title, price, imgMin}) => {
        goodsWrapper.appendChild(createCardGoods(id, title, price, imgMin));
      });

  };

  const randomSort = (items) => items.sort(() => Math.random() - 0.5);

  getGoods(renderCard, randomSort);

  const closeCart = (e) => {
    const target = e.target;

    if (target === cart || target.classList.contains('cart-close')) {
      cart.style.display = 'none';
    }
  }

  const openCart = (e) => {
    e.preventDefault();
    cart.style.display = 'flex';
  };

  const choiceCategory = (e) => {
    e.preventDefault();
    const target = e.target;

    loadSpinner();

    if (target.classList.contains('category-item')) {
      const category = target.dataset.category;
      goodsWrapper.textContent = '';
      setTimeout(() => {
        getGoods(renderCard, (goods) => goods.filter( (item) => item.category.includes(category)));
      },1500);
    }
  };

  cartBtn.addEventListener('click', openCart);
  cart.addEventListener('click', closeCart);
  category.addEventListener('click', choiceCategory);

  document.onkeydown = function(e) {
    if (e.keyCode == 27) {
      cart.style.display = 'none';
    }
  }

});
