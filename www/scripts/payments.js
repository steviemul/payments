window.tryGoodCheckout = function() {
  if(window.PaymentRequest) {
    console.info("payments api supported");
  
    const supportedPaymentMethods = [
      {
        supportedMethods: 'basic-card',
      }
    ];
    const paymentDetails = {
      total: {
        label: 'Total',
        amount:{
          currency: 'USD',
          value: 0
        }
      },
      shippingOptions : [
        {
          id: 'shipping1',
          label: 'My first shipping option',
          amount: {currency: 'GBP', value: 0.0},
          selected: true
        },
        {
          id: 'shipping2',
          label: 'A random second shipping options',
          amount: {currency: 'GBP', value: 0.0},
          selected: false
        }
      ]
    };
    // Options isn't required.
    const options = {
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: true,
      requestShipping:true
    };
    
    const request = new PaymentRequest(
      supportedPaymentMethods,
      paymentDetails,
      options
    );
  
    request.show()
    .then( (response) => {
      document.getElementById('details').innerHTML = JSON.stringify(response, null, 2);
      return response.complete('success');
    })
    .catch((error) => {
      document.getElementById('details').innerHTML = JSON.stringify(error, null, 2);
    });
  } else {
    // Fallback to traditional checkout
    window.location.href = '/checkout/traditional';
  }
}
