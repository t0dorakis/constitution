import { openModal } from '../../components/modal'
// Function to fetch new content and append it to the container
export const pictureAppend = async (filename, clickedElement, container) => {
    openModal(document.querySelector('#app'), {
        type: 'image',
        image: `images/${filename}`,
        width: 400,
        height: 436,
    })
}
