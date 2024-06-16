// router.js

class Router {
    constructor(routes) {
        this.routes = routes
        this.init()
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute())
        document.addEventListener('DOMContentLoaded', () => {
            document.body.addEventListener('click', (e) => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault()
                    this.navigate(e.target.href)
                }
            })
            this.handleRoute()
        })
    }

    navigate(url) {
        history.pushState(null, null, url)
        this.handleRoute()
    }

    handleRoute() {
        const path = window.location.pathname
        const route = this.routes[path] || this.routes['/404']
        if (typeof route.ref === 'function') {
            route.ref()
        } else {
            document.getElementById('app').innerHTML = route.ref
        }
    }
}

// Initialize the router with routes returning functions
export const routes = {
    '/': {
        name: 'Home',
        ref: () => {
            import('./page.js').then((module) => {
                module.default()
            })
        },
    },
    '/404': {
        name: 'Not found',
        ref: '<h1>404</h1><p>Page not found.</p>',
    },
}

// Initialize the router
const router = new Router(routes)

export { router }
