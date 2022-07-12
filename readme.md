# UnCaptcha Node Lib

A simple and free CAPTCHA solution easy to integrate and use by developers and non-developers alike.

## How to install

`npm i @adscore/uncaptcha`

## How to use

1. Go to uncaptcha https://uncaptcha.com/
2. Generate private and public seed.
3. Follow instructions on https://uncaptcha.com/ to implement captcha in the frontend
4. In node:

```js
try {
  const captcha = "<CAPTCHA_FROM_REQUEST>";
  const visitorUserAgent = "<OPTIONAL_VISITOR_USER_AGENT>";
  const visitorIp = "<OPTIONAL_VISITOR_IP>";
  const unCaptchaService = new UnCaptchaService("<PRIVATE_SEED>");
  await unCaptchaService.verify(captcha, visitorUserAgent, visitorIp);
} catch (error) {
  /**
   * Throws object:
   * {
   *   statusCode: 400,
   *   message: "Expired Request"
   * }
   */
  console.log(error);
}
```

## Possible errors:

### Request Failed

Something went wrong on our side, please create a issue in GitHub.

```js
{
  statusCode: 503,
  message: "Request Failed"
}
```

### Invalid Request

Something is wrong with the data, check if you sending captcha without
additional characters and if visitor IP and User Agent are correct.

It is also possible that visitor is trying to forge the request, this error will
be returned for this situation.

```js
{
  statusCode: 400,
  message: "Invalid Request"
}
```

### Expired Request

Captcha Expired, user need to use captcha again.

```js
{
  statusCode: 410,
  message: "Expired Request"
}
```
