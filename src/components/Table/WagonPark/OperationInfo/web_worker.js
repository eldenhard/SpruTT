import api from "@/api/wagonPark"

import api from '@/axiosConfig';

self.onmessage = async (event) => {
    try {
        let response = await api.get('/wagons');
        self.postMessage(response.data);
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};
