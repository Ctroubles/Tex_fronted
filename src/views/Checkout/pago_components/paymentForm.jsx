import React from 'react';

const PaymentForm = () => {
  const scriptCode = `
    var script = document.createElement('script');
    script.src = 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true';
    script.setAttribute('data-sessiontoken', '123456ABCD789');
    script.setAttribute('data-channel', 'web');
    script.setAttribute('data-merchantid', '123456789');
    script.setAttribute('data-merchantlogo', 'https://res.cloudinary.com/dmv0gnlcu/image/upload/v1682365638/Tex_logos/LOGO_INV_MIN_qxigan.png');
    script.setAttribute('data-formbuttoncolor', '#D80000');
    script.setAttribute('data-purchasenumber', '123');
    script.setAttribute('data-amount', '20.98');
    script.setAttribute('data-expirationminutes', '5');
    script.setAttribute('data-timeouturl', 'timeout.html');
    document.body.appendChild(script);
  `;

  return (
    <form action="http://localhost:3000/finalizar/checkou" method="post">
      <script dangerouslySetInnerHTML={{ __html: scriptCode }} />
      <button></button>
    </form>
  );
};

export default PaymentForm;