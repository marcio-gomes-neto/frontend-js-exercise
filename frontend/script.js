const beerBarCountry = document.getElementById("beerBarCountry");
const beerBarCity = document.getElementById("beerBarCity")
const beerBarContainer = document.getElementById("beerBarContainer")
const buttonShowBars = document.getElementById("buttonShowBars")
const buttonShowMoreBars = document.getElementById("buttonShowMoreBars")
const beerBarCategory = document.getElementById("beerBarCategory")
let counter = 0

runCountriesList()
runCategoryList()

beerBarCountry.addEventListener("change", () => {
    if(beerBarCountry.value == "none"){
        beerBarCity.disabled = true
        runCategoryList()
    }else{
        beerBarCity.disabled = false
        runCategoryList(beerBarCountry.value)
    }
    beerBarCity.innerHTML = "none";
    beerBarCategory.innerHTML ="none";
    runCitiesList(beerBarCountry.value)
})

beerBarCity.addEventListener("change", () => {
    beerBarCategory.innerHTML = ""
    if(beerBarCity.value == "none"){
        runCategoryList(beerBarCountry.value)
    }else{
        runCategoryList(beerBarCountry.value, beerBarCity.value)
    }
    
})

buttonShowBars.addEventListener("click",() => {
    
    if(beerBarCountry.value != "none" &&  beerBarCity.value == "none"){
        
        if(beerBarCategory.value != "none"){
            beerBarContainer.innerHTML = ""
            showListOfTheBars(false,beerBarCountry.value, undefined, beerBarCategory.value )
        } else {
            beerBarContainer.innerHTML = ""
            showListOfTheBars(false,beerBarCountry.value)
        }
        
        buttonShowMoreBars.style.display = "none"
        counter = 0
    }

    if(beerBarCountry.value != "none" && beerBarCity.value != "none"){
        
        if(beerBarCategory.value != "none"){
            beerBarContainer.innerHTML = ""
            showListOfTheBars(false,beerBarCountry.value, beerBarCity.value, beerBarCategory.value )
        } else {
            beerBarContainer.innerHTML = ""
            showListOfTheBars(false,beerBarCountry.value, beerBarCity.value)
        }
        
        buttonShowMoreBars.style.display = "none"
        counter = 0
    }

    if(beerBarCountry.value == "none" && counter == 0 && beerBarCategory.value == "none"){
            beerBarContainer.innerHTML = ""
            showListOfTheBars(counter)
            counter+=50
            buttonShowMoreBars.style.display = "block"
    }

    if(beerBarCategory.value != "none" && beerBarCountry.value == "none"){
        beerBarContainer.innerHTML = ""
        showListOfTheBars(undefined, undefined, undefined, beerBarCategory.value)

        buttonShowMoreBars.style.display = "none"
    }
    
})

buttonShowMoreBars.addEventListener("click",() => {
    showListOfTheBars(counter)
    counter+=50
})

async function getBeerBars(){
    let response  = await fetch("http://localhost:3000");
    let data = response.json();
    
    return data
}

async function runCountriesList(){
    const dataFromBars = await getBeerBars();
    let element = []
    

    for (let i = 0; i < dataFromBars.length; i++) {
        if(dataFromBars[i].country == undefined){
           continue
        }

        if(!element.includes(dataFromBars[i].country)){
            element.push(dataFromBars[i].country)
        }
        
    }

    for (let i = 0; i < element.length; i++) {
        let htmlOption = document.createElement("option");

        htmlOption.text = element[i];
        beerBarCountry.add(htmlOption);
    }
}

async function runCitiesList(country){
    const dataFromBars = await getBeerBars();
    let barsFromTheCountry = []
    let citiesFromTheBars = []

    for (let i = 0; i < dataFromBars.length; i++) {
        if(dataFromBars[i].country == country){
            barsFromTheCountry.push(dataFromBars[i])
        }
    }

    for (let i = 0; i < barsFromTheCountry.length; i++) {
        if(barsFromTheCountry[i].city === undefined){
           continue
        }
        
        if(!citiesFromTheBars.includes(barsFromTheCountry[i].city)){
            citiesFromTheBars.push(barsFromTheCountry[i].city)
        }
    }
    let htmlOption = document.createElement("option");
    htmlOption.text = "none";
    beerBarCity.add(htmlOption);

    for (let i = 0; i < citiesFromTheBars.length; i++) {
        htmlOption = document.createElement("option");

        htmlOption.text = citiesFromTheBars[i];
        beerBarCity.add(htmlOption);
    }
}

function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

async function showListOfTheBars(counter, country, city, category){
    const dataFromBars = await getBeerBars();
    dataFromBars.sort(compare)
    if(category && !counter && !country && !city){
        for (let i = 0; i < dataFromBars.length; i++) {
            const a = document.createElement('a');
            const div = document.createElement('div')
            const div1 = document.createElement('div')
            const span = document.createElement('span')
            a.title = "bar";
            
            if(dataFromBars[i].category === category){
                if(!dataFromBars[i].website){
                    span.setAttribute("id", "barWithoutSite")
                    beerBarContainer.appendChild(span)

                    div.textContent = `${dataFromBars[i].name}`
                    span.appendChild(div)

                    div.appendChild(div1)
                    div1.setAttribute("id", "barInfo")
                    div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                    div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                    div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                    div1.innerHTML += ` Website Avaliable!`
                }
                
                if(dataFromBars[i].website){
                    a.href = dataFromBars[i].website
                    beerBarContainer.appendChild(a)
                    
                    div.textContent = `${dataFromBars[i].name}`
                    a.appendChild(div)

                    div.appendChild(div1)
                    div1.setAttribute("id", "barInfo")
                    div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                    div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                    div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                    div1.innerHTML += ` Website Avaliable!`
                }
            }
        }
    }

    if(country && !city){
        for (let i = 0; i < dataFromBars.length; i++) {
            const a = document.createElement('a');
            const div = document.createElement('div')
            const div1 = document.createElement('div')
            const span = document.createElement('span')
            a.title = "bar";

            if(category){
                if(dataFromBars[i].category != category) continue
            }
            
            if(dataFromBars[i].country === country){
                if(!dataFromBars[i].website){
                    span.setAttribute("id", "barWithoutSite")
                    beerBarContainer.appendChild(span)

                    div.textContent = `${dataFromBars[i].name}`
                    span.appendChild(div)

                    div.appendChild(div1)
                    div1.setAttribute("id", "barInfo")
                    div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                    div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                    div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                    div1.innerHTML += ` No Website Avaliable!`
                }
                
                if(dataFromBars[i].website){
                    a.href = dataFromBars[i].website
                    beerBarContainer.appendChild(a)
                    
                    div.textContent = `${dataFromBars[i].name}`
                    a.appendChild(div)

                    div.appendChild(div1)
                    div1.setAttribute("id", "barInfo")
                    div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                    div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                    div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                    div1.innerHTML += ` Website Avaliable!`
                }
            }
        }
        
    }

    if(country && city){
        for (let i = 0; i < dataFromBars.length; i++) {
            const a = document.createElement('a');
            const div = document.createElement('div')
            const div1 = document.createElement('div')
            const span = document.createElement('span')
            a.title = "bar";

            if(category){
                if(dataFromBars[i].category != category) continue
            }
            
            if(dataFromBars[i].country === country && dataFromBars[i].city === city){
                if(!dataFromBars[i].website){
                    span.setAttribute("id", "barWithoutSite")
                    beerBarContainer.appendChild(span)

                    div.textContent = `${dataFromBars[i].name}`
                    span.appendChild(div)
                    
                    div.appendChild(div1)
                    div1.setAttribute("id", "barInfo")
                    div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                    div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                    div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                    div1.innerHTML += ` No Website Avaliable!`
                }
                
                if(dataFromBars[i].website){
                    a.href = dataFromBars[i].website
                    beerBarContainer.appendChild(a)
                    
                    div.textContent = `${dataFromBars[i].name}`
                    a.appendChild(div)

                    div.appendChild(div1)
                    div1.setAttribute("id", "barInfo")
                    div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                    div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                    div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                    div1.innerHTML += ` Website Avaliable!`
                }
            }
        }
    }

    if(!country){
        
        for (let i = 0+counter; i < 51+counter; i++) {
            const a = document.createElement('a');
            const div = document.createElement('div')
            const div1 = document.createElement('div')
            const span = document.createElement('span')
            a.title = "bar";
            if(dataFromBars[i].address == undefined) dataFromBars[i].address = "No Address Informed"
            
            if(category){
                if(dataFromBars[i].category != category) continue
            }
            console.log(dataFromBars[i].category)
            if(!dataFromBars[i].website){
                span.setAttribute("id", "barWithoutSite")
                beerBarContainer.appendChild(span)
    
                div.textContent = `${dataFromBars[i].name}`
                span.appendChild(div)
                div.appendChild(div1)
                
                div1.setAttribute("id", "barInfo")
                div1.innerHTML =  `Country: ${dataFromBars[i].country}`+ "<br>"
                div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                div1.innerHTML += ` No Website Avaliable!`
            }
            
            if(dataFromBars[i].website){
                a.href = dataFromBars[i].website
                beerBarContainer.appendChild(a)
                
                div.textContent = `${dataFromBars[i].name}`
                a.appendChild(div)
                div.appendChild(div1)

                div1.setAttribute("id", "barInfo")
                div1.innerHTML = `Country: ${dataFromBars[i].country}`+ "<br>"
                div1.innerHTML += ` Address: ${dataFromBars[i].address}` + "<br>"
                div1.innerHTML += ` ABV: ${dataFromBars[i].abv}` + "<br>"
                div1.innerHTML += ` Website Avaliable!`
            }
        }
    }
}

async function runCategoryList(country, city){
    const dataFromBars = await getBeerBars();
    let categories = []

    if(country && !city){

        for (let i = 0; i < dataFromBars.length; i++) {
            if(dataFromBars[i].category == undefined) continue
            if(dataFromBars[i].country == country){
                if(!categories.includes(dataFromBars[i].category)){
                    categories.push(dataFromBars[i].category)
                }
            }
            
        }

    }
    
    if(city){

        for (let i = 0; i < dataFromBars.length; i++) {
            if(dataFromBars[i].category == undefined) continue
            if(dataFromBars[i].city == city){
                if(!categories.includes(dataFromBars[i].category)){
                    categories.push(dataFromBars[i].category)
                }
            }
        }
    }

    if(!country){

        for (let i = 0; i < dataFromBars.length; i++) {   
            if(dataFromBars[i].category == undefined) continue
                if(!categories.includes(dataFromBars[i].category)){
                    categories.push(dataFromBars[i].category)
                }             
        }
    }

    let htmlOption = document.createElement("option");
    htmlOption.text = "none";
    beerBarCategory.add(htmlOption);

    for (let i = 0; i < categories.length; i++) {
        let htmlOption = document.createElement("option");

        htmlOption.text = categories[i];
        beerBarCategory.add(htmlOption);
    }
}