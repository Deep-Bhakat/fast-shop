
//for deleting a product without refreshing
const deleteProduct = (btn) =>{
   const proId= btn.parentNode.querySelector('[name=proId]').value;
   const csrfId= btn.parentNode.querySelector('[name=_csrf]').value;

   const productElement = btn.closest('div.col-sm-3');
   fetch('/admin/product/'+proId, {
      method: 'DELETE',
      headers: {
         'csrf-token' : csrfId
      }
   })
   .then(result =>{
       return result.json();
   })
   .then(data =>{
      productElement.remove();
      console.log(data);
   })
   .catch(err => console.log(err));
};