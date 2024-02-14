import { AxiosResponse } from "axios";
import { apiBe } from ".";


export const getSearhedData = async (board_id) => {
    const config = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3OTIxMjA3LCJpYXQiOjE3MDc5MTk0MDcsImp0aSI6IjZhZGNkNWU5ZDU1NDQzN2U4MDllMDZlODBjNTFiZmFkIiwidXNlcl9pZCI6MTN9.WHwbw5suk9mww5FmsLDrh5KtcceZ7ABKZLxFdjbv9ks',
        }
    };

    const { data } = await apiBe.post(`/board/search/${board_id}/`, {
        "word_list" : ["뭐"]
    }, config);

    return data;
};
