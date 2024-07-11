import { openModal } from '../../components/modal'
// Function to fetch new content and append it to the container
export const videoAppend = async (filename, clickedElement, container) => {
    openModal(document.querySelector('#app'), {
        type: 'video',
        image: `videos/${filename}`,
        width: 400,
        height: 436,
    })
}
