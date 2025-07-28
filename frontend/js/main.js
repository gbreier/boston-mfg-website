// Application controller
class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.setupRoutes();
    }

    setupRoutes() {
        // Home page
        router.addRoute('/', async () => {
            try {
                const data = await api.getHomeData();
                this.render(renderHomePage(data));
            } catch (error) {
                this.renderError('Failed to load home page');
            }
        });

        // About page
        router.addRoute('/about', async () => {
            try {
                const data = await api.getAboutData();
                this.render(renderAboutPage(data));
            } catch (error) {
                this.renderError('Failed to load about page');
            }
        });

        // Sourcing page
        router.addRoute('/sourcing', async () => {
            try {
                const data = await api.getSourcingData();
                this.render(renderSourcingPage(data));
            } catch (error) {
                this.renderError('Failed to load sourcing page');
            }
        });

        // Reports page
        router.addRoute('/reports', async () => {
            try {
                const data = await api.getReportsData();
                this.render(renderReportsPage(data));
            } catch (error) {
                this.renderError('Failed to load reports page');
            }
        });

        // Individual report pages
        router.addRoute('/reports/:reportId', async (params) => {
            try {
                const data = await api.getReportData(params.reportId);
                this.render(renderReportPage(data));
            } catch (error) {
                this.renderError('Failed to load report');
            }
        });
    }

    render(html) {
        this.appElement.innerHTML = html;
        
        // Handle smooth scrolling for anchor links
        this.setupSmoothScrolling();
    }

    renderError(message) {
        this.appElement.innerHTML = `
            <div class="min-h-screen bg-gray-50 flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
                    <p class="text-xl text-gray-600 mb-8">${message}</p>
                    <a href="/" class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-secondary transition">
                        Go Home
                    </a>
                </div>
            </div>
        `;
    }

    setupSmoothScrolling() {
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    start() {
        router.start();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
}); 