import React from 'react'

const Test = () => {
    fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    console.log('Kullanıcının IP adresi:', data.ip);
    // Bu IP'yi backend'e gönderebilirsin
  });

  return (
        <form className="bg-red-400" action="https://www.paytr.com/odeme" method="post">
    Kart Sahibi Adı: <input type="text" name="cc_owner" value="TEST KARTI"/><br/>
    Kart Numarası: <input type="text" name="card_number" value="9792030394440796"/><br/>
    Kart Son Kullanma Ay: <input type="text" name="expiry_month" value="12"/><br/>
    Kart Son Kullanma Yıl: <input type="text" name="expiry_year" value="99"/><br/>
    Kart Güvenlik Kodu: <input type="text" name="cvv" value="000"/><br/>

    <input type="hidden" name="merchant_id" value="601755"/>
    <input type="hidden" name="merchant_salt" value="H2x7K2ufqTMr63yZ"/>
    <input type="hidden" name="merchant_key" value="e8hTPsnJCpNn4wj2"/>
    <input type="hidden" name="user_ip" value="176.42.143.74"/>
    <input type="hidden" name="merchant_oid" value="ORDER123456"/>
    <input type="hidden" name="email" value="info@siteniz.com"/>
    <input type="hidden" name="payment_type" value="card"/>
    <input type="hidden" name="payment_amount" value="10099"/>
    <input type="hidden" name="currency" value="TL"/>
    <input type="hidden" name="test_mode" value="1"/>
    <input type="hidden" name="non_3d" value="0"/>
    <input type="hidden" name="merchant_ok_url" value="http://siteniz.com/Success"/>
    <input type="hidden" name="merchant_fail_url" value="http://siteniz.com/Failed"/>
    <input type="hidden" name="user_name" value="Ahmet Test"/>
    <input type="hidden" name="user_address" value="Test Mah. No:1 İstanbul"/>
    <input type="hidden" name="user_phone" value="05554443322"/>
    <input type="hidden" name="user_basket" value={'[[\"\Ür\ün 1\",\"100.00\",1],[\"\Ür\ün 2\",\"200.00\",2]]'}/>
    <input type="hidden" name="debug_on" value="1"/>
    <input type="hidden" name="paytr_token" value="9RKp51l6cS2PbjsnT5Tphx3XpBYJadruJ+Oq3fKTFJM=" />
    <input type="hidden" name="non3d_test_failed" value="0"/>
    <input type="hidden" name="installment_count" value="0"/>
    <input type="hidden" name="no_installment" value="1"/>
    <input type="hidden" name="max_installment" value="0"/>
    <input type="hidden" name="min_installment" value="0"/>
    <input type="hidden" name="lang" value="tr"/>
    <input type="hidden" name="card_type" value="bonus"/>
    <input type="submit" value="Submit"/>
</form>
  )
}

export default Test