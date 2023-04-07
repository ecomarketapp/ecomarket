export function formatLocation(name, state) {
    let reqlocation;
    if(!name || !state) {
        return reqlocation = "Not available";
    }
    return reqlocation = name + ', ' + state;
}

