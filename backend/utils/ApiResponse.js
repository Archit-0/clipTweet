class apiResponse {
    constructor(status, message = "sucess", data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

export const ApiResponse = apiResponse;