document.addEventListener('DOMContentLoaded',function(){
       document.querySelector('.shopify-product-form').addEventListener('input', (evt) => {
       const variants= JSON.parse(document.querySelector('.product-varient-json').innerText);
       const current_variant_id= document.querySelector('#current-varient').value;
       const current_varient= variants.find(variant => variant.id==current_variant_id);
       console.log(current_varient);
       document.querySelector('.product-price').innerText = Shopify.formatMoney(current_varient.price);
       document.querySelector('.product-image').src = current_varient.featured_image.src;

       const atc_button= document.querySelector('#atc-button');
       if(current_varient.available){
        atc_button.removeAttribute('disabled');
        atc_button.innerText="Add to cart";
       }
       else{
        atc_button.setAttribute('disabled', '');
        atc_button.innerText="Sold out";
       }
       const product_handle= document.querySelector('#current-varient').getAttribute('data-product-handle');
       window.history.replaceState({}, '', `/products/${product_handle}?variant=${current_variant_id}`);
       });


});