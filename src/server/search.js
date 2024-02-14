import { AxiosResponse } from "axios";
import { apiBe } from ".";


export const getSearhedData = async (input) => {
    const config = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3OTI3MTY5LCJpYXQiOjE3MDc5MjUzNjksImp0aSI6Ijg1ZTliNzgxMWMyYjQ2NTRhMmVjMzYyY2RlNjU5NDIyIiwidXNlcl9pZCI6MTN9.mWSQCLOZFDJUslncBTt2gFQiNbegmSOG9B1QQMlFrnc',
        }
    };

    const { data } = await apiBe.post(`/board/post/search/0/`, {input}, config);

    return data;
};
