import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    iconContainer: {
        marginTop: 1,
        backgroundColor: '#F5F5F5',
        flex: 2
    },
    dateText: {
        color: 'white',
        marginLeft: 20,
        marginTop: 22,
        fontSize: 34
    },
    backGround: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%'
    },
    title: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    },
    dateContainer: {
        borderRadius: 25,
        backgroundColor: '#0c31b6',
        height: 150,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 25/2
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    }
})