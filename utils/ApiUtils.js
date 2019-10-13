var ApiUtils = {
    checkStatus: function(response) {
        console.log(response.json());
        if (response.ok) {
            return response.json();
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
};
export default ApiUtils;
