import React from "react";
import Board from "../../../components/board/board";

export default function Popular({ navigation }) {
    return (
        <Board boardId={'popular'} navigation={navigation} />
    );
}
