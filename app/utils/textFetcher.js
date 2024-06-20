export const fetchTextByUrl = async (url) => {
    try {
        const response = await fetch(url)
        const text = await response.text()
        return text
    } catch (error) {
        console.log(error)
    }
}
