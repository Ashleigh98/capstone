let productInArray = [{
    id: 1,
    name: "Tanjiro Necklace",
    tag: "tanjironecklace", 
    price: 150,
    inCart: 0,
},
{
    id: 2,
    name: "Gojo Hoodie",
    tag: "gojohoodie",
    price: 400,
    inCart: 0,
},
{
    id: 3,
    name: "Dabi LED Lamp",
    tag: "dabilamp",
    price: 300,
    inCart: 0,
},
{
    id: 4,
    name: "Bleach Sticker",
    tag : "bleachsticker",
    price: 10,
    inCart: 0,
},
{
    id: 5,
    name: "Nezuko Doll",
    tag: "nezukodoll",
    price: 100,
    inCart: 0,
}];
//A friend of mine helped me with the syntax on line 52.
//add to cart function has the id as the function perameter which i commented on in the catalogue page.
function addToCart(id) {
    //o is shorthand to reference the productsInArray. The find method 'executes a function for each of the array elements' - W3Schools
    //the find method executes a function to return the array object to which the id is bound to therefore the variable product stores that information for when the products ids match.
    const product = productInArray.find((o) => { return o["id"] === id })
    //this calls the numberInCart and total function once the addToCart function is executed
    numberInCart(product);
    total(product)
}    
 //i added the productArray as an argument for this function
function numberInCart(productInArray) {
    //using the localStorage saves user input even if the browser or tab was closed unlike sessionStorage
    let itemNumber = localStorage.getItem("number");
     //i used a walkthrough youtube video for making a shopping cart as a guide to add items to a cart. This video is very easy to understand and is the most simple one i came across. youtube channel: Telmo Sampaio at https://www.youtube.com/watch?v=PoTGs38DR9E
     //the string has to be changed into an integer
     itemNumber = parseInt(itemNumber);
     //the if statement states that if the item number exists already then it will add 1 on to the existing value in the storage otherwise it will start at 1. I looked in the applications where the local stoarge is to test it out
    if (itemNumber){
        //the updated number in cart is saved to the local storage
         localStorage.setItem("number", itemNumber + 1);
         //when an item has already been added to the cart the number will increase by 1
         document.querySelectorAll(".count")[0].textContent = itemNumber + 1;
     } else {
         localStorage.setItem("number", 1);
         //if the add to cart button is clicked for the first time, the number will update to 1 and is saved in the local storage
         document.querySelectorAll(".count")[0].textContent = 1;
     }
     //this calls the following function which is explained in the next few lines of code.
     itemClicked(productInArray);
 }

 function itemClicked(productInArray){
    //i used the same youtube video mentioned above for this and the following function.
    //when this function is called it will update the item in the cart to 1 and will save it to the local storage
    let itemInCart = localStorage.getItem("cartObjects");
    //we nedd to convert this into a javascript object
    itemInCart = JSON.parse(itemInCart)
    
    //i used the same youtube channel as a guide for this part. It is called JavaScript Shopping Cart Tutorial - Part 3/5 at https://www.youtube.com/watch?v=tEAl7L62GEw
   //this if statement states that if the variable does not equal null or that the cart is not empty then it will add another 1 onto the exsiting number already in the cart.
    if (itemInCart != null){
        //There is another if statement within this one because it only updates the specific product it was clicked on. If another product is clicked on, the console will log it as undefined therefore we nest the statement to say that if the it is undefined then the product will be added.
        if (itemInCart[productInArray.name] == undefined){
            itemInCart = {
                //rest operator to get whats in the itemInCart it allows a 'function to treat an indefinite number of arguments as an array' -w3Schools at https://www.w3schools.com/js/tryit.asp?filename=tryjs_rest
                ...itemInCart,
                [productInArray.name]: productInArray
            }
        }
        itemInCart[productInArray.name].inCart += 1;
    } else{
        //this means that of they aren't any items in the cart it will show 1 when it is clicked
        productInArray.inCart = 1;
        itemInCart = {
        //inside the object we are putting the productInArray
        [productInArray.name] : productInArray
        }
    }
    //the javascript object needs to be saved as a JSON string so that it saves in the local storage
    //when clicking on one of the add to cart buttons, it will show in the local storage with the productInArray inside the name
    localStorage.setItem("cartObjects", JSON.stringify(itemInCart));
}

function total(cost) {
    let cartTotal = localStorage.getItem("total")
    
    //if the cart does not = null then the cart is not empty therefore we can add the price of the new item to the cartTotal price of items that already exist in the cart
    if (cartTotal != null){
        cartTotal = parseInt(cartTotal)
        localStorage.setItem("total", cartTotal + cost.price)
    } else{
        //if the cart is empty it will show the lone price if the item just clicked and this is all saved to the local storage so that we can use the values when needed
        localStorage.setItem("total", cost.price)
    };
    //alerts current total in cart
    alert(cartTotal)
}

function cartContent(){
    // youtube video part 5/5 of the same youtube channel at https://www.youtube.com/watch?v=IY5UN82FZ2Q
    //here we get the itemInCart that was saved to the local storage in the itemClicked function
    let itemInCart = localStorage.getItem("cartObjects");
    //here we have to convert the saved string into a javascript object to get the values of the numbers
    itemInCart = JSON.parse(itemInCart);
    let cart = document.querySelector(".display");
    //this will work only if both conditions itemInCart and cart are met
    if (itemInCart && cart){
        Object.values(itemInCart).map(item =>{
            //mapping the objects in the array, for every item in cart thats been added it will display the following html content.The youtube video explained how to do this. I used backticks for the innerHTML so that i could add the values of the objects within it.
            //the number in the cart multiplied by the price of the item gives the subtotal
            cart.innerHTML += `<div class="inCart"><div class="cartContainer>
            <div class="product"><img src="images/${item.tag}.jpg" width="200px" height="200px"><p>${item.name}</p></div>
            <div class="price">R${item.price}</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">R${item.inCart * item.price}</div></div></div>`
        })
    }
}
//generate a random whole number using the math.random  and math.ceil method. the number is alerted in the dialogue box once the confirm button is clicked. I have used these maths methods in the past when going through freeCodeCamp
function confirmOrder() {
    let refNumber = Math.ceil(Math.random()*10000);
    alert("Your order was successfull. Reference No. is " + refNumber)
}
//this function allows users to click a delivery option and the value for that option is added to the total value 
function deliveryOption(){
    getCartTotals();
} 
function enterCouponCode() { 
//the syntax for binding the name to the input was explained to me by a friend
// the coupon variable is equal to the value of the name within the input in the html page of the cart which will be used to check if the coupon code is accepted or not
    let coupon = $('input[name="coupon"]').val();
    // this is if the coupon matched the entered code(Anime25). It will save into the local storage and the discount is added
    if(coupon == "Anime25") {
        //the discount is 25% on the subtotal which will be calculated in the total formula in the following function.
        localStorage.setItem("discount", 25);
        alert("Discount Code Accepted");
  } else {
        //if the coupon does not match the id then it will not add any discount
        localStorage.setItem("discount", 0);
        alert("Invalid Coupon Code");
  }
    //once the function is executed it will then execute the following function getCartTotals().
    getCartTotals()
}

function getCartTotals() {
    let total = 0;
    let discount = 0;
    let delivery = 0;
    let totalItemsValue = 0;

    //My friend helped me with this part
    let products = JSON.parse(localStorage.getItem("cartObjects"));
    //mapping through the array like in the cartContent function which my friend also showed me how to do for this
    Object.values(products).map(product =>{
        //getting the totalItemsValue for each product formula which is used to calculate the total.
        totalItemsValue = totalItemsValue + (product["inCart"] * product["price"]) 
    });
    // This is to get the delivery amount. This is to get the value of the radio button that was checked by the user using a forEach loop 
    document.getElementsByName("delivery-option")
    .forEach(radio => {
        if (radio.checked){
            //delivery equals the value of the radio button times one so that the value is only added once when clicking between the options
            delivery = radio.value * 1
        }
    });
    // This is to get Coupon discount if there is a discount coupon entered it will return and save the discount muiltiplied by one like the radio value
    if(localStorage.getItem("discount")) {
        discount = localStorage.getItem("discount") * 1
    }
    //I used this formula to determine the total not including the VAT yet
    total = totalItemsValue - (totalItemsValue * discount/100) + delivery;
    //My friend showed me how to do the follwing lines of code.
    //.html is more universal and easier to use. I added them onto the ids used in the cart page so that the prices are shown there. .tolocalestring method returns the language sensitive representation of the number and formats the currency. 'af' is the country and the minimumFractionDigits is set to 2 so that there are 2 decimals to show the cents
    $("#discount").html((totalItemsValue * discount/100).toLocaleString("af", { style: "currency", currency: "ZAR", currencyDisplay: "symbol", minimumFractionDigits: 2 }));
    $("#deliveryFee").html(delivery.toLocaleString("af", { style: "currency", currency: "ZAR", currencyDisplay: "symbol", minimumFractionDigits: 2 }));
    $("#subtotal").html((totalItemsValue).toLocaleString("af", { style: "currency", currency: "ZAR", currencyDisplay: "symbol", minimumFractionDigits: 2 }));
    //the vat is set to 15% therefore we multiply the total by 0.15
    $("#vat").html((total*0.15).toLocaleString("af", { style: "currency", currency: "ZAR", currencyDisplay: "symbol", minimumFractionDigits: 2 }));
   //the formula for the total does not include the vat so I added the vat to the total here.
    $("#total").html((total + (total * 0.15)).toLocaleString("af", { style: "currency", currency: "ZAR", currencyDisplay: "symbol", minimumFractionDigits: 2 }));
}

//this run the following code when the document has finished loading
$(document).ready(function(){
    //Load Items in cart on page load
    cartContent();
    //This will update the counter i the navbar for the cart. Because it is saved to the local storage the number will remain even when looking at the other pages
    $(".count").html(localStorage.getItem('number'));
    //jquery function for when the page loads. If the cart is empty when the page is loaded then the the forms and confirm button wont be visible until an item is added to the cart
    let itemInCart = localStorage.getItem("cartObjects");
    if (localStorage.getItem("cartObjects")===null){
        $(".cartForm").hide();
        $(".confirmBtn").hide();
        $(".finalTotal").hide();
    } 
    //better functionality to use .on event in the following code
    //for the option to deliver or collect, i wanted the the div where the delivery option and prices to disappear if the iuser clciked on the collection button
    $("#collect").on('click',function(){
        $("#delivery-options").hide();
        //square brackets to bind. my friend showed me prop which is a jquery method if the button is clicked it evaluates the checked to false
        $('input[name="delivery-option"]').prop('checked', false);
        getCartTotals();
    })
    //this will make the delivery options avaiable to the user if the user clicks on the delivery button instead of the collection button
    $("#deliver").on("click",function(){
        $("#delivery-options").show();
    });
    //animation effect to fade out the confirm button once it is clicked
    $(".confirmBtn").on("click", function(){
        $(".confirmBtn").fadeOut()
    });
    //when the redeem button is clicked it will execute the chained effects
    $(".couponBtn").on("click", function(){
         $("#coupon").css("background", "lightblue")
            .slideUp(1000)
            .slideDown(1000)
    });

    $(function(){ 
        //I used my dropdown menu from task 14
        //the div with the option-info class need to be hidden when the page is loaded therefore we hide it 
        $(".option-info").hide(); 
        //the mouseover event allows a user to hover over the headings to slide down the hidden content 
        $(".option").mouseover(function(){ 
        //the 'this' keyword is used to get the information for the option the user hovered over. The show event shows the content that was hidden 
        //the next method 'returns the next sibling element of the selected element' which is explained in W3Schools at https://www.w3schools.com/jquery/traversing_next.asp. sibling elements are elements with the same parent element. 
            $(this).next().show("slow").slideDown("slow"); 
        }) 
        //when the user is no longer hovering over an option the content will be hidden again until hovered over again using the mouseout event 
        $(".option").mouseout(function(){ 
            $(".option-info").hide(); 
        }); 
    });
    
    //i gave the img thumbnails a zoom in effect when hovered over
    $(".img-thumbnail").mouseover(function(){
        $(this).animate({
            width: "260px",
            height: "260px",
        });
    }) 
    getCartTotals();
})