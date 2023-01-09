// testing format functions with jest

import {
  getFormattedDate,
  getFormattedTime,
  formatPhone,
  shortenText,
  capitalize,
} from "../format";

describe("format functions", () => {
  describe("getFormattedDate", () => {
    it("should return the date in short format", () => {
      const date = "2020-05-01T12:00:00.000Z";
      const result = getFormattedDate(date, "short");
      expect(result).toBe("May 1");
    });
    it("should return the date in long format", () => {
      const date = "2020-05-01T12:00:00.000Z";
      const result = getFormattedDate(date, "long");
      expect(result).toBe("Fri, May 1, 2020");
    });
    it("should say invalid date if the date is invalid", () => {
      const date = "2020-05-01666";
      const result = getFormattedDate(date, "long");
      expect(result).toBe("Invalid Date");
    });
  });

  describe("getFormattedTime", () => {
    it("should return the time in short format", () => {
      const date = "2020-05-01T12:00:00.000Z";
      const result = getFormattedTime(date);
      expect(result).toBe("2:00 PM");
    });
    it("should say invalid date if the time is invalid", () => {
      const date = "2020-05-01666";
      const result = getFormattedTime(date);
      expect(result).toBe("Invalid Date");
    });
  });

  describe("formatPhone", () => {
    it("should return the phone number in short format", () => {
      const phone = "1234567890";
      const result = formatPhone(phone);
      expect(result).toBe("12 34 56 78 90");
    });

    it("should return the phone number in long format", () => {
      const phone = "12345678901";
      const result = formatPhone(phone);
      expect(result).toBe("+12 34 56 78 901");
    });

    it("should return the phone number in long format", () => {
      const phone = "123456789012";
      const result = formatPhone(phone);
      expect(result).toBe("12 3 45 67 89 012");
    });

    it("invalid phone number", () => {
      const phone = "sdfsqfds";
      const result = formatPhone(phone);
      expect(result).toBe(undefined);
    });
  });

  describe("shortenText", () => {
    it("should return the text in short format", () => {
      const text = "Hello World";
      const result = shortenText(text, 5);
      expect(result).toBe("Hello...");
    });

    it("should return the text in short format", () => {
      const text = "Hello World";
      const result = shortenText(text, 15);
      expect(result).toBe("Hello World");
    });
  });
});
