const https = require("https");

class UnCaptchaService {
  server = "https://api.uncaptcha.com/validation";

  /**
   * @type string
   */
  privateSeed;

  constructor(privateSeed) {
    this.privateSeed = privateSeed;
  }

  /**
   * Verify if captcha is valid. Will return rejected promise if validation fails.
   * @param {string} captcha
   * @param {string} visitorUserAgent
   * @param {string} visitorIp
   * @returns Promise
   */
  verify(captcha, visitorUserAgent = undefined, visitorIp = undefined) {
    return new Promise((resolve, reject) => {
      const data = {
        "uncaptcha-token": captcha,
        ua: visitorUserAgent,
        ip: visitorIp,
      };

      const requestBody = Object.entries(data)
        .map(([key, value]) => {
          if (value != null) {
            return `${key}=${encodeURI(value)}`;
          }
        })
        .filter((x) => x != null)
        .join("&");

      const options = {
        hostname: "api.uncaptcha.com",
        port: 443,
        path: "/validation",
        method: "POST",
        headers: {
          "X-PRIVKEY": this.privateSeed,
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      };

      const req = https.request(options, (res) => {
        res.on("data", (dataResponse) => {
          const result = dataResponse.toString();

          if (res.statusCode === 200 && result === "true") {
            resolve(true);
            return;
          }

          reject({
            statusCode: res.statusCode,
            message: result,
          });
        });
      });

      req.on("error", (error) => {
        reject({
          message: error.message,
        });
      });

      req.write(requestBody);
      req.end();
    });
  }
}

module.exports = { UnCaptchaService };
