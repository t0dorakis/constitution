import './global.css'
import { router } from './router'

document.querySelector('#root').innerHTML = `
    <div id="app"></div>
`

router.init()
