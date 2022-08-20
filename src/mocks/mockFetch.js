const response = {
    sum: 333,
};

export default async function mockFetch(url) {
    switch (url) {
        case "/api/calculate/add": {
            return {
                ok: true,
                status: 200,
                json: async () => response,
            };
        }
        case "/api/calculate/somethingrandom": {
            return {
                ok: false,
                status: 400,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}