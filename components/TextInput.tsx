import { Avatar, TextInput as TextInputRn, Button, } from 'react-native-paper';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

export function TextInput({ title, text, setText, error }: { title: string, text: string, setText: any, error: boolean }) {
    return (
        <View>
            <TextInputRn
                mode='flat'
                underlineColor="blue"
                activeUnderlineColor='blue'
                selectionColor='blue'
                activeOutlineColor='blue'
                placeholderTextColor='blue'
                label={title}
                style={{
                    backgroundColor: '#F5F5F5',
                    margin: 10,
                    color: 'blue'
                }}
                autoComplete={true}
                error={error}
                value={text}
                onChangeText={(text) => { setText(text) }}
            />
        </View>
    )
}