jQuery(function ($) {
  const products = [
    { id: 'arabica', name: 'Arabica Đà Lạt', category: 'Arabica', price: 168000, original: 210000, stock: 18, capacity: 24, badge: 'Mới', rating: 4.7, description: 'Rang vừa, thơm nhẹ và có vị chua thanh. Hợp với cách pha lọc.', photo: 'arabica' },
    { id: 'robusta', name: 'Robusta Buôn Ma Thuột', category: 'Robusta', price: 119000, original: 140000, stock: 8, capacity: 24, badge: 'Bán chạy', rating: 4.8, description: 'Vị đậm, hậu đắng nhẹ. Hợp với phin và cà phê sữa.', photo: 'robusta' },
    { id: 'blend', name: 'Phối trộn Mộc Rang', category: 'Phối trộn', price: 144000, original: 160000, stock: 22, capacity: 24, badge: 'Mới', rating: 4.5, description: 'Cân bằng giữa vị đậm của Robusta và hương thơm của Arabica.', photo: 'blend' }
  ];
  const currency = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'});
  const storeKey = 'moc-rang-demo';
  const data = { cart: [], orders: [], reviews: {} };
  try { Object.assign(data, JSON.parse(localStorage.getItem(storeKey) || '{}')); } catch {}

  const $detail = $('#detail');
  const $cart = $('#cart');
  let $mainPhoto;

  function save() {
    try { localStorage.setItem(storeKey, JSON.stringify(data)); } catch {}
    $('#cart-count').text(data.cart.reduce((sum, item) => sum + item.quantity, 0));
  }

  function findProduct(id) {
    return products.find(product => product.id === id);
  }

  function available(product) {
    const sold = data.orders.flatMap(order => order.items).filter(item => item.id === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);
    return Math.max(0, product.stock - sold);
  }

  function remaining(product) {
    return Math.max(0, available(product) - data.cart.filter(item => item.id === product.id)
      .reduce((sum, item) => sum + item.quantity, 0));
  }

  const ratingOptions = {
    min: 0, max: 5, step: .1, size: 'xs', showClear: false, showCaption: false,
    filledStar: '<span>★</span>', emptyStar: '<span>☆</span>'
  };

  function initRatings($area) {
    $area.find('.stars').each(function () {
      $(this).rating({...ratingOptions, displayOnly: this.readOnly, step: this.readOnly ? .1 : 1});
    });
  }

  function ratingMarkup(value, label, readOnly = true) {
    return `<input class="stars" type="number" value="${value}" aria-label="${label}" ${readOnly ? 'readonly' : ''}>`;
  }

  function priceMarkup(product) {
    return `<p class="price">${currency.format(product.price)} <del>${currency.format(product.original)}</del></p>`;
  }

  function stockMarkup(product) {
    const stock = available(product);
    const percent = Math.round(stock / product.capacity * 100);
    return `<p class="stock">Tồn kho: ${stock} / ${product.capacity} gói</p>
      <div class="progress"><div class="progress-bar" role="progressbar" aria-label="Tồn kho"
      aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" style="width:${percent}%"></div></div>`;
  }

  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
  }

  function renderProducts() {
    const query = normalize($('#search').val());
    const category = $('#category').val();
    const filtered = products.filter(product =>
      normalize(product.name).includes(query) && (!category || category === product.category));
    const $area = $('#products').empty();
    filtered.forEach(product => {
      const discount = Math.round((1 - product.price / product.original) * 100);
      $area.append(`<article class="product">
        <button class="product-photo" type="button" data-detail="${product.id}" aria-label="Xem ${product.name}">
        <img src="images/${product.photo}.jpg" alt="${product.name}"><span class="tag sale">−${discount}%</span>
        <span class="tag flag">${product.badge}</span></button>
        <div class="product-info"><h3>${product.name}</h3><p>${product.category} · 250 g</p>
        ${priceMarkup(product)}${ratingMarkup(product.rating, `Đánh giá ${product.rating} trên 5 sao`)}${stockMarkup(product)}
        <div class="buy"><button type="button" data-detail="${product.id}">Chi tiết</button>
        <button class="action" type="button" data-add="${product.id}" ${remaining(product) ? '' : 'disabled'}>Thêm vào giỏ</button></div></div></article>`);
    });
    $('#empty-products').prop('hidden', filtered.length > 0);
    initRatings($area);
  }

  function disposeZoom() {
    const zoom = $mainPhoto?.data('xzoom');
    if (zoom) {
      zoom.closezoom();
      zoom.destroy();
    }
    $mainPhoto = null;
  }

  function openDetail(product) {
    disposeZoom();
    $('#detail-title').text(product.name);
    const related = products.filter(item => item.id !== product.id)
      .map(item => `<button type="button" data-detail="${item.id}">${item.name}</button>`).join(' ');
    const photo = `images/${product.photo}.jpg`;
    const stock = remaining(product);
    const $body = $('#detail-body').html(`<div class="detail-grid"><div>
      <div class="zoom-frame"><img class="xzoom" src="${photo}" xoriginal="${photo}" alt="${product.name}"></div>
      <div class="thumbs">
        <a href="${photo}"><img class="xzoom-gallery" xpreview="${photo}" src="${photo}" alt="Ảnh sản phẩm"></a>
        <a href="images/brew.jpg"><img class="xzoom-gallery" xpreview="images/brew.jpg" src="images/brew.jpg" alt="Gợi ý pha cà phê"></a>
      </div><p>Chọn ảnh thu nhỏ rồi di chuột hoặc chạm ảnh lớn để phóng to.</p></div>
      <div>${priceMarkup(product)}<p>${product.description}</p>${stockMarkup(product)}
      <form id="add-detail" data-product="${product.id}"><label>Kiểu xay <select name="grind"><option>Nguyên hạt</option><option>Xay pha phin</option><option>Xay pha lọc</option></select></label>
      <label>Số lượng <input name="quantity" type="number" min="1" max="${Math.max(1, stock)}" value="1" required></label>
      <button class="action" ${stock ? '' : 'disabled'}>Thêm vào giỏ</button></form><p id="detail-status" role="status"></p></div></div>
      <section><h3>Đánh giá</h3>${ratingMarkup(product.rating, `Điểm mẫu ${product.rating} trên 5 sao`)}<ul id="review-list"></ul>
      <form id="review-form" data-product="${product.id}">${ratingMarkup(0, 'Chọn số sao', false)}
        <label>Nhận xét <textarea name="comment" maxlength="240" required></textarea></label>
        <button type="submit">Gửi đánh giá</button><p id="review-status" role="status"></p></form>
      </section><section><h3>Cà phê khác</h3><div class="related">${related}</div></section>`);
    if (!$detail[0].open) $detail[0].showModal();
    $mainPhoto = $body.find('.xzoom');
    $mainPhoto.add($body.find('.xzoom-gallery')).xzoom({
      position: 'inside', mposition: 'inside', rootOutput: false, title: false
    });
    initRatings($body);
    renderReviews(product);
  }

  function renderReviews(product) {
    const list = data.reviews[product.id] || [];
    const $list = $('#review-list').empty();
    if (!list.length) $list.append($('<li>').text('Chưa có nhận xét trong bản demo.'));
    list.forEach(review => {
      const $line = $('<li>').append(ratingMarkup(review.stars, `Đánh giá ${review.stars} trên 5 sao`));
      $line.append($('<span>').text(review.comment)).appendTo($list);
    });
    initRatings($list);
  }

  function addToCart(product, quantity, grind) {
    if (quantity > remaining(product)) return false;
    const line = data.cart.find(item => item.id === product.id && item.grind === grind);
    if (line) line.quantity += quantity;
    else data.cart.push({ id: product.id, quantity, grind });
    save();
    renderProducts();
    return true;
  }

  function renderCart() {
    const $lines = $('#cart-lines').empty();
    if (!data.cart.length) $lines.append($('<p>').text('Giỏ hàng đang trống.'));
    let total = 0;
    data.cart.forEach((item, index) => {
      const product = findProduct(item.id);
      const max = item.quantity + remaining(product);
      total += product.price * item.quantity;
      $lines.append(`<div class="cart-line"><span>${product.name} · ${item.grind}<br>
        <strong>${currency.format(product.price * item.quantity)}</strong></span>
        <input type="number" aria-label="Số lượng ${product.name}" min="1" max="${max}" value="${item.quantity}" data-quantity="${index}">
        <button type="button" data-remove="${index}">Xóa</button></div>`);
    });
    $('#cart-total').text(currency.format(total));
    $('#place-order').prop('disabled', !data.cart.length);
    return total;
  }

  function renderOrders() {
    const $orders = $('#orders-list').empty();
    if (!data.orders.length) $orders.append($('<p>').text('Chưa có đơn hàng mẫu.'));
    data.orders.toReversed().forEach(order => {
      const $order = $('<article class="order">');
      $order.append($('<h3>').text(`${order.code} · Đã xác nhận`));
      const $items = $('<ul>');
      order.items.forEach(item => {
        $items.append($('<li>').text(`${findProduct(item.id).name} · ${item.grind} × ${item.quantity}`));
      });
      $order.append($items, $('<p>').text(`Tổng cộng ${currency.format(order.total)}`)).appendTo($orders);
    });
  }

  $('#search').on('input', renderProducts);
  $('#category').on('change', renderProducts);
  $(document).on('click', '[data-detail]', function () {
    openDetail(findProduct(this.dataset.detail));
  }).on('click', '[data-add]', function () {
    const product = findProduct(this.dataset.add);
    if (addToCart(product, 1, 'Nguyên hạt')) {
      $('#status').text(`Đã thêm ${product.name} vào giỏ.`);
      $('#products').find(`[data-add="${product.id}"]`).trigger('focus');
    }
  }).on('click', '[data-close]', function () {
    this.closest('dialog').close();
  });

  $detail.on('close', disposeZoom).on('submit', '#add-detail', function (event) {
    event.preventDefault();
    const product = findProduct(this.dataset.product);
    const fields = new FormData(this);
    if (addToCart(product, Number(fields.get('quantity')), fields.get('grind'))) {
      const left = remaining(product);
      this.elements.quantity.max = Math.max(1, left);
      this.elements.quantity.value = 1;
      $(this).find('button').prop('disabled', !left);
      $('#detail-status').text('Đã thêm sản phẩm vào giỏ.');
    }
  }).on('submit', '#review-form', function (event) {
    event.preventDefault();
    const stars = Number($(this).find('.stars').val());
    const comment = this.elements.comment.value.trim();
    if (!Number.isInteger(stars) || stars < 1 || stars > 5 || !comment) {
      $('#review-status').text('Hãy chọn từ 1 đến 5 sao và nhập nhận xét.');
      return;
    }
    const product = findProduct(this.dataset.product);
    (data.reviews[product.id] ||= []).push({stars, comment});
    save();
    renderReviews(product);
    this.elements.comment.value = '';
    $(this).find('.stars').rating('update', 0);
    $('#review-status').text('Đã lưu đánh giá trên trình duyệt.');
  });

  $('#open-cart').on('click', () => {
    renderCart();
    $cart[0].showModal();
  });
  $('#open-orders').on('click', () => {
    renderOrders();
    $('#orders')[0].showModal();
  });

  $cart.on('click', '[data-remove]', function () {
    data.cart.splice(Number(this.dataset.remove), 1);
    save();
    renderCart();
    renderProducts();
  }).on('change', '[data-quantity]', function () {
    const item = data.cart[Number(this.dataset.quantity)];
    item.quantity = Math.max(1, Math.min(Number(this.max), Math.floor(Number(this.value)) || 1));
    save();
    renderCart();
    renderProducts();
  });

  $('#checkout').on('submit', function (event) {
    event.preventDefault();
    if (!data.cart.length) return;
    const total = renderCart();
    const code = 'MR-' + String(data.orders.length + 1).padStart(3, '0');
    data.orders.push({code, total, items: data.cart});
    data.cart = [];
    save();
    this.reset();
    renderCart();
    renderProducts();
    $('#cart-status').text(`Đã xác nhận đơn mẫu ${code}. Xem lại trong Đơn hàng.`);
  });

  $('#hero-gallery').carousel({interval: false});
  save();
  renderProducts();
});

