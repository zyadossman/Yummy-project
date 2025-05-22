var navButton = document.querySelector('.navbar-toggler')
var navBar = document.querySelector('.navbar')
var closeButton = document.querySelector('.btn-close')
var first = document.querySelector('#data')
var desc = document.querySelector('#desc')
var finalResult;

$(".navbar-toggler").click(function(){
    $(".list-unstyled").slideup(2000)
})

navButton.addEventListener('click',function(){
 navBar.style.cssText = "left: 0;"
 navButton.classList.add('d-none')
    closeButton.classList.remove('d-none')
   
})
closeButton.addEventListener('click',function(){
     navBar.style.cssText = "left: -19.5%;"
 navButton.classList.remove('d-none')
    closeButton.classList.add('d-none')
})

async function getApi() {
    var res = await fetch ("https://www.themealdb.com/api/json/v1/1/search.php?f=c")
    var finalResult = await res.json()
    return finalResult

}


async function getData(){
    finalResult = await getApi()
    var cartona = ''
    for(var i=0 ; i < finalResult.meals.length ; i++){
        cartona+=`<div class="col-lg-3 overflow-hidden rounded-2" onclick="openData(${i})">
       <div class="position-relative "> 
      <img src="${finalResult.meals[i].strMealThumb}" alt="" class="w-100">
      
      <div class="layer position-absolute text-center rounded-4">
        <h2>${finalResult.meals[i].strMeal}</h2>
      </div>
    </div>
    </div>
        `

    }    
   
    document.getElementById('data').innerHTML = cartona

    
}
getData()

function openData(i){
    first.classList.add('d-none')
    searchPage.classList.add('d-none')
    homePage.classList.add('d-none')
    desc.classList.remove('d-none')
    ingredientsPage.classList.add('d-none')
    document.getElementById('desc').innerHTML = `
    <div class="row container m-auto my-3 text-white">
      <div class="col-lg-4">
        <div><img src="${finalResult.meals[i].strMealThumb}" alt="" class="w-100"></div>
        <h3>${finalResult.meals[i].strMeal}</h3>
      </div>
      <div class="col-lg-8">
        <h2>Instruction</h2>
        <p>${finalResult.meals[i].strInstructions}</p>
        <h3>Area : ${finalResult.meals[i].strArea}</h3>
        <h3>Category : ${finalResult.meals[i].strCategory}</h3>
        
        <div class="mt-4">
          <a href="${finalResult.meals[i].strSource}" target="_blank"><button type="button" class="btn btn-success">Source</button></a>
          <a href="${finalResult.meals[i].strYoutube}" target="_blank"><button type="button" class="btn btn-danger">Youtube</button></a>
        </div>
      </div>
    </div>
    `
    
}

var search = document.getElementById('search')
var categories = document.getElementById('categories')
var searchPage = document.getElementById('searchPage')
var homePage = document.querySelector('section')
var searchMeals =document.getElementById('searchData')
search.addEventListener('click' , function(){
    searchPage.classList.remove('d-none')
    homePage.classList.add('d-none')
    closeButton.classList.add('d-none')
    navButton.classList.remove('d-none')
    desc.classList.add('d-none')
    ingredientsPage.classList.add('d-none')
    categoriesPage.classList.add('d-none')
    navBar.style.cssText = "left: -19.5%;"
    
})
let nameSearch = document.querySelector('#nameSearch')
let letterSearch = document.querySelector('#letterSearch')
letterSearch.addEventListener('input' , function(){

    
    if(letterSearch.value.length > 0){
        startSearch(letterSearch.value)
    }
   
})

nameSearch.addEventListener('input' , function(){

    
    if(nameSearch.value.length > 3){
        startSearch(nameSearch.value)
    }
   
})

async function getSearchData(key) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    let data = await response.json()
    return data
    
}

async function startSearch(key){
    let searchData = await getSearchData(key)
    var cartona = ''
    for(var i=0 ; i < searchData.meals.length ; i++){
        cartona+=`<div class="col-lg-3 overflow-hidden rounded-2" onclick="openData(${i})">
       <div class="position-relative "> 
      <img src="${searchData.meals[i].strMealThumb}" alt="" class="w-100">
      
      <div class="layer position-absolute text-center rounded-4">
        <h2>${searchData.meals[i].strMeal}</h2>
      </div>
    </div>
    </div>
        `

    }    
   
    document.getElementById('searchData').innerHTML = cartona
    
}

var categoriesPage = document.querySelector('#categoriesPage')
var categoriesData =document.querySelector('#categoriesData')

categories.addEventListener('click',function(){
    navBar.style.cssText = "left: -19.5%;"
    closeButton.classList.add('d-none')
    navButton.classList.remove('d-none')
     searchPage.classList.add('d-none')
    homePage.classList.add('d-none')
    categoriesPage.classList.remove('d-none')
    closeButton.classList.add('d-none')
    navButton.classList.remove('d-none')
    desc.classList.add('d-none')
    startCategories()
    
})

async function getCategoriesData() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = res.json()
    return data
}

async function startCategories(){
    let categoriesData = await getCategoriesData()
     var cartona = ''
    for(var i=0 ; i < categoriesData.categories.length ; i++){
        cartona+=`<div class="col-lg-3 overflow-hidden rounded-2">
       <div class="position-relative "> 
      <img src="${categoriesData.categories[i].strCategoryThumb}" alt="" class="w-100">
      
      <div class="layer position-absolute text-center rounded-4">
        <h2>${categoriesData.categories[i].strCategory}</h2>
      </div>
    </div>
    </div>
        `

    }    
   
    document.getElementById('categoriesData').innerHTML = cartona
    
}

var area = document.querySelector('#area')
var areaPage = document.querySelector('#areaPage')
var areaData = document.querySelector('#areaData')

area.addEventListener('click',function(){
    navBar.style.cssText = "left: -19.5%;"
    closeButton.classList.add('d-none')
    areaPage.classList.remove('d-none')
    navButton.classList.remove('d-none')
     searchPage.classList.add('d-none')
    homePage.classList.add('d-none')
    categoriesPage.classList.add('d-none')
    closeButton.classList.add('d-none')
    navButton.classList.remove('d-none')
    desc.classList.add('d-none')
    startArea()
    
})

async function getAreaData(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = res.json()
    return data
    
}

async function startArea(){
    let areaData = await getAreaData()
    var cartona=''
    for(var i=0 ; i < areaData.meals.length ; i++){
        cartona+=`<div class="col-lg-3 text-center rounded-2 text-white">
       <div class=" "> 
      <i class="fa-solid fa-house-laptop fs-1"></i>
      </div>
      <div class=" text-center rounded-4">
        <h2>${areaData.meals[i].strArea}</h2>
      </div>
    
    </div>
        `

    } 

    document.getElementById('areaData').innerHTML = cartona
    
}


var ingredients = document.querySelector('#ingredients')
var ingredientsPage = document.querySelector('#ingredientsPage')
var ingredientsData = document.querySelector('#ingredientsData')

ingredients.addEventListener('click',function(){
    navBar.style.cssText = "left: -19.5%;"
    closeButton.classList.add('d-none')
    ingredientsPage.classList.remove('d-none')
    areaPage.classList.add('d-none')
    navButton.classList.remove('d-none')
     searchPage.classList.add('d-none')
    homePage.classList.add('d-none')
    categoriesPage.classList.add('d-none')
    closeButton.classList.add('d-none')
    navButton.classList.remove('d-none')
    contactPage.classList.add('d-none')
    desc.classList.add('d-none')
    startIngredients()
    
})

async function getIngredientsData(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=beef`)
    let data = res.json()
    return data
}

async function startIngredients(){
    let ingredientsData = await getIngredientsData()
    var cartona = ''
    for(var i=0 ; i < ingredientsData.meals.length ; i++){
        cartona+=`<div class="col-lg-3 overflow-hidden rounded-2" onclick="openData(${i})">
       <div class="position-relative "> 
      <img src="${ingredientsData.meals[i].strMealThumb}" alt="" class="w-100">
      
      <div class="layer position-absolute text-center rounded-4">
        <h2>${ingredientsData.meals[i].strMeal}</h2>
      </div>
    </div>
    </div>
        `

    }    
   
    document.getElementById('ingredientsData').innerHTML = cartona
    

}

var contact = document.querySelector('#contact')
var contactPage = document.querySelector('#contactPage')
var contactData = document.querySelector('#contactData')

contact.addEventListener('click',function(){
    navBar.style.cssText = "left: -19.5%;"
    closeButton.classList.add('d-none')
    ingredientsPage.classList.add('d-none')
    contactPage.classList.remove('d-none')
    areaPage.classList.add('d-none')
    navButton.classList.remove('d-none')
     searchPage.classList.add('d-none')
    homePage.classList.add('d-none')
    categoriesPage.classList.add('d-none')
    closeButton.classList.add('d-none')
    navButton.classList.remove('d-none')
    desc.classList.add('d-none')

    
})

var nameInput = document.querySelector('#name')
var emailInput = document.querySelector('#email')
var ageInput = document.querySelector('#age')
var phoneInput = document.querySelector('#phone')
var passwordInput = document.querySelector('#password')
var repasswordInput = document.querySelector('#repassword')

function nameValidation(){
    var regex = /^[a-z0-9_-]{3,15}$/
    var text = nameInput.value
    var message = document.getElementById('nameMsg')
    
    if(regex.test(text)){
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        message.classList.add('d-none')
        return true
    }else{
        nameInput.classList.remove('is-valid')
        nameInput.classList.add('is-invalid')
        message.classList.remove('d-none')

        return false
    }
}

function ageValidation(){
    var regex = /^[0-9]{2}$/
    var text = ageInput.value
    var message = document.getElementById('ageMsg')
    
    if(regex.test(text)){
        ageInput.classList.add('is-valid')
        ageInput.classList.remove('is-invalid')
        message.classList.add('d-none')
        return true
    }else{
        ageInput.classList.remove('is-valid')
        ageInput.classList.add('is-invalid')
        message.classList.remove('d-none')

        return false
    }
}

function emailValidation(){
    var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    var text = emailInput.value
    var message = document.getElementById('emailMsg')
    
    if(regex.test(text)){
        emailInput.classList.add('is-valid')
        emailInput.classList.remove('is-invalid')
        message.classList.add('d-none')
        return true
    }else{
        emailInput.classList.remove('is-valid')
        emailInput.classList.add('is-invalid')
        message.classList.remove('d-none')

        return false
    }
}

function passwordValidation(){
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    var text = passwordInput.value
    var message = document.getElementById('passwordMsg')
    
    if(regex.test(text)){
        passwordInput.classList.add('is-valid')
        passwordInput.classList.remove('is-invalid')
        message.classList.add('d-none')
        return true
    }else{
        passwordInput.classList.remove('is-valid')
        passwordInput.classList.add('is-invalid')
        message.classList.remove('d-none')

        return false
    }
}

var submitBtn = document.querySelector('#submit')
var successMsg = document.querySelector('#successMsg')
var emailMsg = document.querySelector('#emailMsg')
var nameMsg = document.querySelector('#nameMsg')

submitBtn.addEventListener('click',function(){
if(nameValidation() && emailValidation() && passwordValidation() && ageValidation()){

    
    successMsg.classList.remove('d-none')
    clear()
}
})


function clear(){
     nameInput.value =null
    passwordInput.value =null
    ageInput.value =null
    phoneInput.value =null
    repasswordInput.value =null
    emailInput.value =null
    passwordInput.classList.remove('is-valid')
    emailInput.classList.remove('is-valid')
    nameInput.classList.remove('is-valid')
    phoneInput.classList.remove('is-valid')
    ageInput.classList.remove('is-valid')
    repasswordInput.classList.remove('is-valid')
}
