// Function to fetch new content and append it to the container
export const pictureAppend = async (filename, clickedElement, container) => {
    // the id is the name of the image file located in the public/images folder
    const image = document.createElement('img')
    image.src = `images/${filename}`
    image.alt = 'picture'
    image.classList.add('picture')

    // randomize the position of the image
    const rect = clickedElement.getBoundingClientRect()
    image.style.position = 'absolute'

    // position the image in the center of the clicked element
    image.style.left = `${rect.x + rect.width / 2}px`
    image.style.top = `${rect.y + rect.height / 2}px`

    // image.style.zIndex = -1
    image.style.width = '400px'
    image.style.height = '400px'

    // absoultuely position somewhere in the document
    document.body.appendChild(image)
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0

    // make the element grabbable so it can be dragged around and left in the document
    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        image.style.top = image.offsetTop - pos2 + 'px'
        image.style.left = image.offsetLeft - pos1 + 'px'
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
    }

    image.addEventListener('mousedown', dragMouseDown)
}
