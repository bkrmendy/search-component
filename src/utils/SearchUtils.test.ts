import { userInfoMatchesSearchTerm } from "./SearchUtils";

describe("userInfoMatchesSearchTerm", () => {
    it("happy path", () => {
        {
            const result = userInfoMatchesSearchTerm("john", "John Smith");
            expect(result).toEqual(true);
        }
        {
            const result = userInfoMatchesSearchTerm("smith", "John Smith");
            expect(result).toEqual(true);
        }
        {
            const result = userInfoMatchesSearchTerm("jon", "Jonathan");
            expect(result).toEqual(true);
        }
    });

    it("search term is an empty string", () => {
        const result = userInfoMatchesSearchTerm("", "Elizabeth Holmes");
        expect(result).toEqual(false);
    });

    it("search term in the middle of a name", () => {
        {
            const result = userInfoMatchesSearchTerm("Man", "Milton Friedman");
            expect(result).toEqual(false);
        }
        {
            const result = userInfoMatchesSearchTerm("beth", "Elizabeth Smith");
            expect(result).toEqual(false);
        }
    });

    it("search term overlapping word parts", () => {
        const result = userInfoMatchesSearchTerm("ed over", "A quick fox jumped over the brown dog");
        expect(result).toEqual(false);
    });

});
