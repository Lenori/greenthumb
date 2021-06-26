const options_data = select_options;

let selected_options = {
    sun: null,
    water: null,
    pets: null
}

function createOptions(data, element, type) {
    data.map(item => {
        let p = document.createElement("p");

        p.classList.add("form-option");

        p.id = item.id;
        p.setAttribute('data-value', item.value);
        p.textContent = item.label;
        p.onclick = () => selectOption(p, type);

        p.style.display = 'none';

        element.append(p);
    })
}

function selectOption(item, type) {

    if (selected_options[type]) {
        let oldSelection = document.getElementById(selected_options[type].id);

        oldSelection.classList.remove("form-selected");
    }

    selected_options[type] = item;
    item.classList.add("form-selected");

    let option_name = document.getElementById('select-header-' + type);
    option_name.textContent = item.textContent;

    controlOptions(type, 'close');
    checkOptions();
}

function controlOptions(type, action) {
    let arrow_img = document.getElementById('form-select-arrow-' + type);

    options_data[type].map(item => {
        let element = document.getElementById(item.id);

        if (action == 'open') {

            element.style.display = 'block';
            arrow_img.src = 'assets/icons/chev-up.png';

        } else if (action == 'close') {

            element.style.display = 'none';
            arrow_img.src = 'assets/icons/chev-down.png';
                        
        }
    });
}

function checkOptions() {
    if (selected_options.sun &&
        selected_options.water &&
        selected_options.pets) {
            loadProducts(selected_options);
        }
}

function loadOptions() {
    let sun_options = document.getElementById("select-sun");
    let water_options = document.getElementById("select-water");
    let pets_options = document.getElementById("select-pets");

    createOptions(options_data.sun, sun_options, "sun");
    createOptions(options_data.water, water_options, "water");
    createOptions(options_data.pets, pets_options, "pets");
}