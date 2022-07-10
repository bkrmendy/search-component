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
