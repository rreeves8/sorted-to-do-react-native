import { ImageURISource, Image, ImageSourcePropType, GestureResponderEvent, View } from "react-native"
import { Avatar } from "react-native-paper"

export const Icon = ({ icon, onPress }: { icon: ImageURISource, onPress: (event: GestureResponderEvent) => void }) => (
    <Avatar.Icon
        style={{ backgroundColor: '#F5F5F5' }}
        size={55}
        icon={({ size, color }: any) => (
            <Image
                source={icon as ImageURISource}
                style={{ width: size, height: size, tintColor: color }}
            />
        )}
        color="black"
        onTouchEnd={onPress}
    />
)

