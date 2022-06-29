import { isAlphaNumeric } from "./Utils";

export function tokenizeInput(input: string): string[] {
    const results: string[] = [];
    let currentResult = "";

    for (const c of input) {
        if (isAlphaNumeric(c)) {
            currentResult += c;
        } else if (currentResult.length > 0) {
            results.push(currentResult);
            currentResult = "";
        }
    }

    if (currentResult.length > 0) {
        results.push(currentResult);
        currentResult = "";
    }

    return results;
}

export function userInfoMatchesSearchTerm(searchTerm: string, userName: string) {
    if (searchTerm === "") {
        return false;
    }

    searchTerm = searchTerm.toLowerCase();

    const nameParts = userName
        .split(" ")
        .map(part => part.trim().toLowerCase());
    return nameParts.some(part => part.startsWith(searchTerm));
}
