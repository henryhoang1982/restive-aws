// app.test.ts

describe("Unit tests for app", () => {
    // Should call RestiveCli constructor
    it("should call RestiveCli constructor", () => {
        // Mock RestiveCli constructor
        const RestiveCli = jest.fn();

        // Call RestiveCli constructor
        new RestiveCli();

        // Expect RestiveCli  constructor to be called
        expect(RestiveCli).toHaveBeenCalled();

        // Expect RestiveCli constructor to be called with new keyword
        expect(RestiveCli).toHaveBeenCalledWith();
    });
});