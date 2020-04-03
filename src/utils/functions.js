export function handleTitle(title) {
    return title.toLowerCase()
}

export function createMarkup(markUp) {
    return { __html: `${markUp}` };
}