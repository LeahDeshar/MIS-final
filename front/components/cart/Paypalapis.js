let baseUrl = "https://api-m.sandbox.paypal.com";

let clientId =
  "ASrP5coOJk7u1Ah30LdYYZl5yxhiWdibiKw929SnKOYrvozqJBl6JYWMhTtw5p6pNEm42v5nl9paVRp_";
let secretKey =
  "EDVWMsnylHHDoNEvujjUDu7E-_QZ-_Vl2pMpwaq6D7b0rFchF9R_Ww-AGJ5oGlNH9zdcQnnjASlAjp_6";

let orderDetail = {
  intent: "CAPTURE",
  purchase_units: [
    {
      items: [
        {
          name: "T-Shirt",
          description: "Green XL",
          quantity: "1",
          unit_amount: {
            currency_code: "USD",
            value: "200.00",
          },
        },
      ],
      amount: {
        currency_code: "USD",
        value: "200.00",
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: "200.00",
          },
        },
      },
    },
  ],
  application_context: {
    return_url: "https://example.com/return",
    cancel_url: "https://example.com/cancel",
  },
};

const generateToken = () => {
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", "Basic " + clientId + secretKey);

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: "grant_type=client_credentials",
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v1/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result print", result);
        const { access_token } = JSON.parse(result);
        resolve(access_token);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

const createOrder = (token = "") => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v2/checkout/orders", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result print", result);
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

const capturePayment = (id, token = "") => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result print", result);
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
