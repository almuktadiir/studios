let globalSort;
const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategories(data.data);
    // console.log(data.data.length);
}

// display categories menu
const displayCategories = (categories) => {
    // console.log(categories.length);
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.textContent = '';
    // if(categories.length)
    categories.forEach(category => {
        // console.log(category);

        const categoryDiv = document.createElement('div');
        categoryDiv.classList = `inline px-2`;
        categoryDiv.innerHTML = `
        <button onclick="categoryItems('${category.category_id}')" class="bg-gray-300 px-5 py-2 rounded font-medium block md:inline lg:inline mx-auto">${category.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

// display each categories items
const categoryItems = async (categoryId) => {
    // console.log(categoryId);
    spinnerLoading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const categoryItems = data.data;
    displayCategoryProductItems(categoryItems);
    globalSort = categoryItems;
    // console.log(globalSort);
}

const displayCategoryProductItems = (categoryItemsProduct) => {
    // for drawing category
    categoryItemsProduct.length === 0 ? drawing(true) : drawing(false);

    // each item loop through
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    categoryItemsProduct.forEach(categoryItem => {
        console.log(categoryItem);

        const cardDiv = document.createElement('div');
        cardDiv.classList = `card bg-base-100 shadow-xl`;
        cardDiv.innerHTML = `
                <figure class="relative"><img class="h-52 w-full" src="${categoryItem.thumbnail}" alt="videos" />
                <span class="bg-slate-900 rounded text-white text-center absolute bottom-2 right-2 text-xs py-1">${categoryItem.others.posted_date ? timeConvertion(categoryItem.others.posted_date) : ''}</span>
                </figure>
                
                <div class="card-body">
                        <div class="flex">
                            <div class="mr-4">
                                <img class="rounded-full w-16 h-16" src="${categoryItem.authors[0].profile_picture}" alt="">
                            </div>
                            <div>
                                <h3 class="font-bold text-base mb-2">${categoryItem.title}</h3>
                                <h2 class="card-title text-sm font-normal pb-2">
                                ${categoryItem.authors[0].profile_name}
                                    <div class="">
                                    ${categoryItem.authors[0].verified ? '<img src="images/varified.png"/>' : ''}
                                    </div>
                                </h2>
                                <p>${categoryItem.others.views} views</p>
                            </div>
                        </div>
                    </div>
            `;
        cardContainer.appendChild(cardDiv);
    });
    spinnerLoading(false);
}

// data sorting
const sortCategory = () => {
    globalSort.sort((a,b)=>{
        const sortA = parseFloat(a.others.views);
        const sortB = parseFloat(b.others.views);
        return sortB - sortA;
    })
    displayCategoryProductItems(globalSort);
}

//${categoryItem.authors[0].verified} ${ data.verofied== true? '<img src=""/>':''}
// drawing category function
const drawing = (isDrawing) => {
    const drawingContainer = document.getElementById('drawning-container');
    isDrawing ? drawingContainer.classList.remove('hidden') : drawingContainer.classList.add('hidden');
}

// hrs mins convertion
// Divide the seconds by 60 to get the total minutes. The remainder will be the seconds in the output.
// Divide the total minutes by 60 to get the hours. The whole number in the result will be the hours, and the remainder will be the minutes in the output.


// function hrsConvertion(totalSeconds) {
//     const totalMs = totalSeconds * 1000;
//     const result = new Date(totalMs).toISOString().slice(11, 16);

//     return result;
// }

function timeConvertion(seconds) {

    let d = Number(seconds);

    if (d <= 0) {
        return '00:00:00'
    } else {
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = h <= 9 ? '' + h + 'hrs ' : h + "hrs ";
        let mDisplay = m <= 9 ? '0' + m + 'min ago ' : m + "min ago ";
        let sDisplay = s <= 9 ? '0' + s : s;


        return hDisplay + mDisplay;

    }
}

// spinner  loader
const spinnerLoading = (isLoading) => {
    const spinner = document.getElementById('spinner-container');
    isLoading ? spinner.classList.remove('hidden') : spinner.classList.add('hidden');
}

loadData();
categoryItems("1000")