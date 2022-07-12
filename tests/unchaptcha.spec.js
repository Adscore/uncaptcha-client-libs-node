const { UnCaptchaService } = require("../lib/index.js");

describe("UnCaptchaService", () => {
  let unCaptchaService;

  beforeEach(() => {
    unCaptchaService = new UnCaptchaService(
      "EF5580C1E3BACD5D1C1A8987BA5950435E7D53C9B3298C258245F7109F17F9D7"
    );
  });

  test("Should throw error when private seed is not provided", async () => {
    try {
      unCaptchaService = new UnCaptchaService();
      throw new Error("Did not throw exception");
    } catch (error) {
      expect(error).toStrictEqual({
        message: "Missing or invalid privateSeed param",
      });
    }
  });

  test("Should throw error when captcha is not provided", async () => {
    try {
      await unCaptchaService.verify();
      throw new Error("Did not throw exception");
    } catch (error) {
      expect(error).toStrictEqual({
        message: "Missing or invalid captcha param",
      });
    }
  });

  test("Should return correct error status and message with fake data", async () => {
    try {
      await unCaptchaService.verify("fakeCaptcha");
      throw new Error("Did not throw exception");
    } catch (error) {
      expect(error).toStrictEqual({
        statusCode: 400,
        message: "Invalid Request",
      });
    }
  });

  test("Should return correct error status and message with old data", async () => {
    try {
      await unCaptchaService.verify(
        "314ae59869ef54ab31e2f2e01d6e27f2daa831ebcf5fa55452bf53c9e0c26263.362e8ec8acdb01c11105c6bc172642267fefc2d87b1f8d8e542b84be53b54d9e.1657479248113"
      );
      throw new Error("Did not throw exception");
    } catch (error) {
      expect(error).toStrictEqual({
        statusCode: 410,
        message: "Expired Request",
      });
    }
  });

  /**
   * This test here to check valid captcha. As captcha is designed to prevent
   * robots, it need to be tested by hand. So to use this test:
   *
   * 1. Run `npm run fixture` and open http://localhost:8080/ in the browser;
   * 3. Paste in captcha variable below;
   * 4. Un-skip this test and run `npm test`.
   *
   * IMPORTANT: remember to skip this test after testing.
   */
  test.skip("Should validate correct request", async () => {
    const captcha =
      "5bf14fed5cd971f6e42ac9b1ace3d2cf801984fada851c6be940e3407e48135e.3bca69c4dfd81add89754cf8ba97a241b7ec6ad6d9f8d39e279f7ea5087df976.165756902081";

    expect(await unCaptchaService.verify(captcha)).toBeTruthy();
  });
});
