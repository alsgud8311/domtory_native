import MessageList from "../../components/message/messageList";
import {View} from 'react-native';

export default function Message({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <MessageList navigation={navigation} />
        </View>
    );
};
