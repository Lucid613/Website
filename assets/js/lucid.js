transparent = true;
minWidth = 50;

function checkout(){
  var items = [];
  var name, size, color, price, quantity, subTotal;
  simpleCart.each(function( item , x ){
    items.push ({"name": item.get('name'), "size": item.get('size'), "colour": item.get('colour'), "price": item.get('price'), "quantity": item.get('quantity'), "subTotal": item.get('total')});
  });
  emailjs.send("gmail", "receipt", {
    to_email: document.getElementById("email").value,
    fullName: document.getElementById("fullName").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    address1: document.getElementById("address1").value,
    address2: document.getElementById("address2").value,
    city: document.getElementById("city").value,
    province: document.getElementById("province").value,
    postalCode: document.getElementById("postalCode").value,
    grandTotal: simpleCart.grandTotal(),
    cart: items
  }).then(function(response) {
    $('.alert-success').show();
    $('#checkoutModal').modal('hide');
    simpleCart.empty();
  }, function(err) {
    $('.alert-warning').show();
  });
};

$(function() {
  $('.dropdown').on({
    "click": function(event) {
      if ($(event.target).closest('.dropdown-toggle').length) {
        $(this).data('closable', true);
      } else {
        $(this).data('closable', false);
      }
    },
    "hide.bs.dropdown": function(event) {
      hide = $(this).data('closable');
      $(this).data('closable', true);
      return hide;
    }
  });
});

$('.navbar').on('show.bs.collapse', function (e) {
  if( $(document).scrollTop() < 260 ) {
    $('img[role="logo"]').removeClass('img-large');
    $(".brand").css("max-width", minWidth );
  }
})

$('.navbar').on('hidden.bs.collapse', function (e) {
  if( $(document).scrollTop() < 260 ) {
    $('img[role="logo"]').addClass('img-large');
    $(".brand").css("max-width", '100%' );
  }
})

$(document).scroll(function() {
  oVal = ($(window).scrollTop() / 170);
  wVal = (550 - ($(window).scrollTop()));
  $(".blur").css("opacity", oVal);
  if (wVal < 0 || $('.navbar-collapse').hasClass('in')) {
    $(".brand").css("max-width", minWidth );
  }
  else if (wVal > 0){
    $(".brand").css("max-width", wVal );
  }
  if( $(this).scrollTop() > 260 ) {
    if(transparent) {
      transparent = false;
      $('nav[role="navigation"]').removeClass('navbar-transparent');
      $('img[role="logo"]').removeClass('img-large');
    }
  } else {
    if( !transparent ) {
      transparent = true;
      $('nav[role="navigation"]').addClass('navbar-transparent');
      if (!$('.navbar-collapse').hasClass('in')) {
        $('img[role="logo"]').addClass('img-large');
      }
    }
  }
});

simpleCart({
  cartColumns: [
    { attr: "name" , label: "Name" },
    { attr: "size" , label: "Size" },
    { attr: "colour" , label: "Colour" },
    { attr: "price" , label: "Price", view: 'currency' },
    { attr: "quantity" , label: "Qty" },
    { view: "decrement" , label: false },
    { view: "increment" , label: false },
    { attr: "total" , label: "SubTotal", view: 'currency' },
    { view: "remove" , text: "Remove" , label: false }
  ],
  cartStyle: "table",
  checkout: {
    type: "Manual" ,
    email: "gui.beauchesne@gmail.com"
  },
  currency: "CAD",
  data: { name: "", email: "", address: "" },
  language: "english-us",
  excludeFromCheckout: [],
  shippingCustom: null,
  shippingFlatRate: 0,
  shippingQuantityRate: 0,
  shippingTotalRate: 0,
  taxRate: 0,
  taxShipping: false,
  beforeAdd				: null,
  afterAdd				: null,
  load					: null,
  beforeSave				: null,
  afterSave				: null,
  update					: null,
  ready					: null,
  checkoutSuccess				: null,
  checkoutFail				: null,
  beforeCheckout				: null
});
