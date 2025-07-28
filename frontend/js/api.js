class API {
    constructor(baseURL = 'http://localhost:8000') {
        this.baseURL = baseURL;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async getHomeData() {
        return this.fetchData('/api/home');
    }

    async getAboutData() {
        return this.fetchData('/api/about');
    }

    async getSourcingData() {
        return this.fetchData('/api/sourcing');
    }

    async getReportsData() {
        return this.fetchData('/api/reports');
    }

    async getReportData(reportId) {
        return this.fetchData(`/api/reports/${reportId}`);
    }
}

const api = new API(); 