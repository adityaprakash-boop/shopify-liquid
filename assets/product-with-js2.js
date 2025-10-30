document.addEventListener('DOMContentLoaded',function(){
       document.querySelector('.shopify-product-form').addEventListener('input', (evt) => {
       const variants= JSON.parse(document.querySelector('.product-varient-json').innerText); 
       let current_variant_id = null;
       if(evt.target.id != 'current-varient'){
        console.log('option parameter changed');
        const option1 = this.querySelector('select[name="option1"]')?.value || null;
        const option2 = this.querySelector('select[name="option2"]')?.value || null;
        const option3 = this.querySelector('select[name="option3"]')?.value || null;
        
        const variant_from_options = variants.find(varient => 
            varient.option1 == option1 &&
            varient.option2 == option2 &&
            varient.option3 == option3

        )
         current_variant_id = variant_from_options.id;
        document.querySelector('#current-varient').value= current_variant_id;
       } 

       
       const current_varient= variants.find(variant => variant.id==current_variant_id);
    //    console.log(current_varient);
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