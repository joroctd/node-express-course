const btn = document.querySelector('#get-products-btn');
const productList = document.querySelector('#products-list');

btn.addEventListener('click', async e => {
	const res = await fetch('/api/v1/products');
	const data = await res.json();
	const presentProducts = productList.querySelectorAll('li.product');
	let productIds = [];
	presentProducts.forEach(p => {
		productIds.push(parseInt(p.id.slice(-1)));
	});
	for (let product of data) {
		if (!productIds.includes(product.id)) {
			const item = document.createElement('li');
			item.id = `product-${product.id}`;
			item.classList.add('product');
			item.textContent = `Product: ${product.name} & Price: ${product.price}`;
			productList.appendChild(item);
		}
	}
});
