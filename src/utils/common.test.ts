import {
  capitalize,
  getAverageRating,
  getGenreName,
  getRecordTypeEmoji,
  getRecordTypeName,
  getTimeText,
} from "./common"

describe("getRecordTypeName() returns record type names based on record_id", () => {
  test("should return 'book' when type_id is 1", () => {
    expect(getRecordTypeName(1)).toBe("book")
  })

  test("should return 'drama' when type_id is 2", () => {
    expect(getRecordTypeName(2)).toBe("drama")
  })

  test("should return 'movie' when type_id is 3", () => {
    expect(getRecordTypeName(3)).toBe("movie")
  })

  test("should return empty string when type_id is not found", () => {
    expect(getRecordTypeName(99)).toBe("")
  })

  test("should return empty string when type_id is 0 or negative", () => {
    expect(getRecordTypeName(0)).toBe("")
    expect(getRecordTypeName(-1)).toBe("")
  })
})

describe("getRecordTypeEmoji() returns record emojis based on record_name", () => {
  test("should return 📕 when type_id is 1 (book)", () => {
    expect(getRecordTypeEmoji(1)).toBe("📕")
  })

  test("should return 📺 when type_id is 2 (drama)", () => {
    expect(getRecordTypeEmoji(2)).toBe("📺")
  })

  test("should return 🎥 when type_id is 3 (movie)", () => {
    expect(getRecordTypeEmoji(3)).toBe("🎥")
  })

  test("should return empty string when type_id is 999 (not found)", () => {
    expect(getRecordTypeEmoji(999)).toBe("")
  })
})

describe("getGenreName() returns genre names based on genre_id", () => {
  test("should return 'Comedy' when genre_id is 1", () => {
    expect(getGenreName(1)).toBe("Comedy")
  })

  test("should return 'Action' when genre_id is 9", () => {
    expect(getGenreName(9)).toBe("Action")
  })

  test("should return 'Fiction' when genre_id is 21", () => {
    expect(getGenreName(21)).toBe("Fiction")
  })

  test("should return an empty string when genre_id is not found", () => {
    expect(getGenreName(99)).toBe("")
  })

  test("should return an empty string when genre_id is 0 or negative", () => {
    expect(getGenreName(0)).toBe("")
    expect(getGenreName(-1)).toBe("")
  })
})

describe("getTimeText() returns a human-readable time string based on running_time in minutes", () => {
  test("should return '45 minutes' when running_time is less than 60", () => {
    expect(getTimeText(45)).toBe("45 minutes")
  })

  test("should return '1 hour' when running_time is 60", () => {
    expect(getTimeText(60)).toBe("1 hour")
  })

  test("should return '2 hours' when running_time is 120", () => {
    expect(getTimeText(120)).toBe("2 hours")
  })

  test("should return '2 hours 30 minutes' when running_time is 150", () => {
    expect(getTimeText(150)).toBe("2 hours 30 minutes")
  })

  test("should return '1 hour 1 minute' when running_time is 61", () => {
    expect(getTimeText(61)).toBe("1 hour 1 minute")
  })

  test("should return '0 minute' when running_time is 0", () => {
    expect(getTimeText(0)).toBe("0 minute")
  })
})

describe("capitalize() should return a string with the first letter capitalized", () => {
  test("should capitalize a lowercase word", () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  test("should return the same word if the first letter is already capitalized", () => {
    expect(capitalize("Hello")).toBe("Hello")
  })

  test("should capitalize a single-letter word", () => {
    expect(capitalize("a")).toBe("A")
  })

  test("should return an empty string if input is empty", () => {
    expect(capitalize("")).toBe("")
  })

  test("should not modify non-letter characters at the beginning", () => {
    expect(capitalize("123abc")).toBe("123abc")
    expect(capitalize("!wow")).toBe("!wow")
  })
})

describe("getAverageRating() should calculate average rating", () => {
  test("should return 0 when input is an empty array", () => {
    expect(getAverageRating([])).toBe(0)
  })

  test("should return correct average when ratings are present", () => {
    expect(
      getAverageRating([{ rating: 4 }, { rating: 2 }, { rating: 5 }])
    ).toBeCloseTo(3.67, 1)
    expect(
      getAverageRating([{ rating: 4 }, { rating: 4 }, { rating: 4 }])
    ).toBe(4)
  })

  test("should ignore records with rating 0", () => {
    expect(getAverageRating([{ rating: 5 }, { rating: 0 }])).toBe(5)
    expect(getAverageRating([{ rating: 0 }, { rating: 0 }])).toBe(0)
  })
})
