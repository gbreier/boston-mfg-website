class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });
        
        // Handle internal link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/"]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });
    }
    
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    navigate(path, pushState = true) {
        if (pushState) {
            history.pushState(null, null, path);
        }
        
        this.currentRoute = path;
        
        // Find matching route
        let handler = this.routes[path];
        
        // Check for dynamic routes (like /reports/:id)
        if (!handler) {
            for (const route in this.routes) {
                if (route.includes(':')) {
                    const routePattern = route.replace(/:([^/]+)/g, '([^/]+)');
                    const regex = new RegExp(`^${routePattern}$`);
                    const match = path.match(regex);
                    if (match) {
                        handler = this.routes[route];
                        // Extract parameters
                        const paramNames = route.match(/:([^/]+)/g)?.map(p => p.slice(1)) || [];
                        const params = {};
                        paramNames.forEach((name, index) => {
                            params[name] = match[index + 1];
                        });
                        return handler(params);
                    }
                }
            }
        }
        
        if (handler) {
            handler();
        } else {
            // 404 - redirect to home
            this.navigate('/', false);
        }
    }
    
    start() {
        this.navigate(window.location.pathname, false);
    }
}

const router = new Router(); 