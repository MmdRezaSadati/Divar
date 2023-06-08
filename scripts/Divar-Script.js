var DivarGrid = document.querySelector(".DivarGrid");
var Content = document.getElementById("Content");
window.onload = ()=>{showContent()}
function showContent(){
    DivarContent.className="showLoading";
    setTimeout(()=>{
        Content.className = "Content";
        DivarContent.className="";
    },2500)
    
}
function showPSPage(){
    ProductSinglePage.classList.remove('show');
    closePSPage.className = "none";
    ProductSinglePage.classList.add('showLoading');
    Content.className = "Show-PSPage";
    setTimeout(()=>{
        console.log("mmd321")
        ProductSinglePage.classList.remove('showLoading');
        closePSPage.className = "block";
        Content.className = "Show-PSPage";
        ProductSinglePage.classList.add('show');
    },2500)
}
function showPSPageModal(ProductID){
    showPSPage()
    var product = DivarProduct.findIndex(MyProduct=>{return MyProduct.id == ProductID });
    if(DivarProduct[product].PrPrice =="پرداخت توافقی"){
        price =  DivarProduct[product].PrPrice;
        PRPrice.innerHTML = price;
    }else if(DivarProduct[product].PrPrice >= 0){
        intPrice =  DivarProduct[product].PrPrice.toString();
        PRPrice.innerHTML = (intPrice.slice(0,3)+","+intPrice.slice(3,6)) +" تومان";
    }
    namePSPage.innerHTML = DivarProduct[product].PrName;
    timePSPage.innerHTML = DivarProduct[product].PrTime;
    PRName.innerHTML = DivarProduct[product].PrName;
    PRCategory.innerHTML = DivarProduct[product].category;
    PRTime.innerHTML = DivarProduct[product].PrTime;
    CationPSPage.innerHTML = DivarProduct[product].PrCaption;
    categoryPSPage.innerHTML = DivarProduct[product].category;
    BigImagePSPage.src ="./images/"+ DivarProduct[product].PrPicture[0];
    addGallery(product);
}
function addGallery(product){
    for(element in DivarProduct[product].PrPicture){
        let productPicture = document.createElement("img");
        productPicture.src = "./images/"+ DivarProduct[product].PrPicture[element];
        productPicture.addEventListener("click", ()=> {
            BigImagePSPage.src = productPicture.src;
        })
        galleryPSPage.appendChild(productPicture);
    }
}
function creatProducts(jsonDataProduct){
    var product = document.createElement("div");
    product.className = "DivarProduct";
    product.addEventListener("click", ()=>{showPSPageModal(jsonDataProduct.id)})
    var DivarProductLeft =document.createElement("div");
    DivarProductLeft.className = "DivarProductLeft";
        var productPicture = document.createElement("img");
        productPicture.className = "productPicture";
        productPicture.src = "./images/"+ jsonDataProduct.PrPicture[0];
        var chatIcon = document.createElement("img");
        chatIcon.className = "chatIcon";
        chatIcon.src ="./images/Icons/Chat.png";
    DivarProductLeft.appendChild(productPicture);
    DivarProductLeft.appendChild(chatIcon);
    var DivarProductRight =document.createElement("div");
    DivarProductRight.className = "DivarProductRight";
        var productName =  document.createElement("h4");
        productName.innerHTML = jsonDataProduct.PrName;
        var DivarPrRightCaption =document.createElement("div");
        DivarPrRightCaption.className ="DivarPrRightCaption";
            var PrRightCaptionFoori = document.createElement("span");
            PrRightCaptionFoori.className = "Forii";
            PrRightCaptionFoori.innerHTML = jsonDataProduct.PrStatus;
            var PrRightCaptionPrice = document.createElement("p");
            if(jsonDataProduct.PrPrice =="پرداخت توافقی"){
                price =  jsonDataProduct.PrPrice;
                PrRightCaptionPrice.innerHTML = price;
            }else if(jsonDataProduct.PrPrice >= 0){
                intPrice =  jsonDataProduct.PrPrice.toString();
                PrRightCaptionPrice.innerHTML = (intPrice.slice(0,3)+","+intPrice.slice(3,6)) +" تومان";
            }
            var PrRightCaptionTime = document.createElement("p");
            PrRightCaptionTime.innerHTML = jsonDataProduct.PrTime;
        DivarProductRight.appendChild(productName);
            DivarPrRightCaption.appendChild(PrRightCaptionFoori);
            DivarPrRightCaption.appendChild(PrRightCaptionPrice);
            DivarPrRightCaption.appendChild(PrRightCaptionTime);
        DivarProductRight.appendChild(DivarPrRightCaption);
    product.appendChild(DivarProductLeft);
    product.appendChild(DivarProductRight);
    if(jsonDataProduct.PrStatus == ""){
        PrRightCaptionFoori.remove();
    }
    return product;
}
divarGrid(DivarProduct);
function fillterData(){
    var allCategory = true ;
    var realStateValue ="";
    var CarValue ="";
    var DigitalValue ="";
    var homeValue ="";
    var ServiceValue ="";
    var WatchValue ="";
    var GamesValue ="";
    var FriendsValue ="";
    var ChairValue ="";
    var ChamedonValue ="";
    if(realState.checked){
    realStateValue ="املاک";
    allCategory = false ;
    } if(Car.checked){
    CarValue ="وسایل نقلیه";
    allCategory = false ;
    } if(Digital.checked){
    allCategory = false ;
    DigitalValue ="کالای دیجیتال";
    } if(home.checked){
    allCategory = false ;
    homeValue ="خانه و آشپزخانه";
    } if(Service.checked){
    allCategory = false ;
    ServiceValue ="خدمات";
    } if(Watch.checked){
    allCategory = false ;
    WatchValue ="وسایل شخصی";
    } if(Games.checked){
    allCategory = false ;
    GamesValue ="سرگرمی و فراغت";
    } if(Friends.checked){
    allCategory = false ;
    FriendsValue ="اجتماعی";
    } if(Chair.checked){
    allCategory = false ;
    ChairValue ="تجهیزات و صنعتی";
    }if(Chamedon.checked){
    allCategory = false ;
    ChamedonValue ="استخدام و کاریابی";
    }
	var fillteredData = DivarProduct.filter(function(Product) {
										    return (Product.category == realStateValue || Product.category == CarValue ||Product.category == DigitalValue || Product.category == homeValue ||
                                            Product.category == ServiceValue || Product.category == WatchValue || Product.category == GamesValue || Product.category == FriendsValue ||
                                            Product.category == ChairValue || Product.category == ChamedonValue || allCategory)&&Product.PrName.indexOf(SearchBoxAjax.value) !=-1
										});
    divarGrid(fillteredData);
}
function searchAjax(){
	fillteredData = DivarProduct.filter(function(Product) {
        return Product.PrName.indexOf(SearchBoxAjax.value) !=-1
    });
    divarGrid(fillteredData);
}
function linkProduct(jsonData,i){
    let product = creatProducts(jsonData[i]);
    DivarGrid.appendChild(product);
}
function divarGrid(jsonData){
	DivarGrid.innerHTML = "";
	for(i in jsonData){
        linkProduct(jsonData,i);
	}
}