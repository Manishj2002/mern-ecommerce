const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Ac0EhHcUwmohRVF2vHwsy8wemsY1_B-zDNEVjwFTGBJtMc37cigrqxQAZOuaGydq4_0JJDCFtIf1S5SO",
  client_secret: "EIrv-TfEkogavFVDNxMM3WfjZXfjTnpaOiJ842Ir1zWFbvlaatpE6W0DZE5KgCi2lhk-2E9ZjTDjXFb0",
});

module.exports = paypal;
