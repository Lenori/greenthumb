const featured_class = document.getElementById('featured-product');
const featured_half_class = document.getElementById('featured-product-half');
const list_quarter_class = document.getElementById('list-quarter');

function loadProducts(options) {

    let sun = options.sun.getAttribute("data-value");
    let water = options.water.getAttribute("data-value");
    let pets = options.pets.getAttribute("data-value");

    const url = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`

    fetch(url)
        .then(response => response.json())
        .then(data => prepare(data));
}

function clearDivs() {
    featured_class.innerHTML = "";
    featured_half_class.innerHTML = "";
    list_quarter_class.innerHTML = "";
}

function changeGridStyle(featured) {
    let grid = document.getElementById('product-grid');

    if (featured > -1) {
        grid.classList.add('grid-with-featured');
        grid.classList.remove('grid-without-featured');
    } else {
        grid.classList.remove('grid-with-featured');
        grid.classList.add('grid-without-featured');
    }
}

function getTemplate(templateSelector){
    return document.querySelector(templateSelector).content;
 }

function editTemplate(item, featured) {
    let template = null;

    if (featured) {
        template = getTemplate('#featured-product-template');
    } else {
        template = getTemplate('#common-product-template');
    }

    let content = template.cloneNode(true);

    content.querySelector('.product-cover').src = item.url
    content.querySelector('.product-name').textContent = item.name
    content.querySelector('.product-price').textContent = '$' + item.price

    return content;
}

function showProducts(data, featured) {
    let featured_product = null;

    if (featured > -1) {
        featured_product = data[featured];
        data.splice(featured, 1);
    }

    data.map((item, index) => {
        let content = editTemplate(item, false);

        if (index < 4) {
            featured_half_class.append(content);
        } else {
            list_quarter_class.append(content);
        }
    });

    if (featured_product) {
        let featured_content = editTemplate(featured_product, true);

        featured_class.append(featured_content);
    }
    
}

function prepare(data) {
    clearDivs();

    const featured_index = data.findIndex(item => item.staff_favorite == true);

    changeGridStyle(featured_index);

    showProducts(data, featured_index);
}