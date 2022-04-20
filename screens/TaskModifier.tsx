import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useMemo } from "react";
import { View, Text, SafeAreaView, Image, Switch } from "react-native";
import { Avatar, Button } from "react-native-paper";
import store from "../storage/Store";
import { styles } from "../styles/styles";
import { Benefit, Task } from "../types";
import { TextInput } from "../components/TextInput";
import Title from "../components/Title";
import { LinearGradient } from 'expo-linear-gradient';
import { randomColor } from '../styles/styles'

export default function EditTask({ route, navigation }: any) {
    const { category, task, type } = route.params

    let benefits: Array<Benefit> = store.getState().benefits

    const [text, setText] = React.useState(
        type === 'Edit Task' ? task.name : ''
    )

    const [selectedBenefits, setSelectedBenefits] = useState(
        (type === 'Edit Task') ? (
            benefits.map((e: Benefit, i: number) => {
                if (task.benefits.findIndex((t: any) => t.name === e.name)! === -1) {
                    return true
                }
                else {
                    return false
                }
            })
        ) : (
            new Array(benefits.length).fill(false)
        )
    )

    const [error, setError] = React.useState(false)

    const [isEnabled, setIsEnabled] = useState(
        (type === 'Edit Task') ? (
            (task.date) ? true : false
        ) : (
            false
        )
    )

    const [date, setDate] = useState(
        (type === 'Edit Task') ? (
            task.date
        ) : (
            new Date()
        )
    )

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useMemo(() => {
        if (error) {
            setTimeout(() => setError(false), 3000)
        }
    }, [error])

    return (
        <SafeAreaView style={styles.backGround}>
            <Title
                LeftNav={{
                    nav: () => navigation.goBack(),
                    icon: require('../assets/icons/arrow-left.png'),
                    isImage: true
                }}
                title={type}
            />
            <TextInput
                text={text}
                setText={setText}
                title="Name Of Task"
                error={error}
            />
            <Text style={{ marginTop: 15, color: 'black', fontSize: 25, marginLeft: 24, marginBottom: 4 }}>
                Benefits
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginLeft: 10 }}>
                {benefits.map((e: Benefit, i: number) => {
                    return (
                        <View
                            key={i}
                            style={[{
                                backgroundColor: '#F5F5F5',
                                borderColor: selectedBenefits[i] ? 'black' : '#F5F5F5',
                                borderWidth: 5,
                                borderRadius: 30,
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 5,
                                marginLeft: 5,
                                alignContent: 'center'
                            }, styles.shadowProp]}
                            onTouchEnd={() => {
                                let prevSelec = selectedBenefits
                                console.log(prevSelec[i])
                                prevSelec[i] = !prevSelec[i]
                                setSelectedBenefits([...prevSelec])
                            }}
                        >
                            <Text style={{ fontSize: 20, color: 'black', padding: 15 }}>
                                {e.name}
                            </Text>
                        </View>
                    )
                })}
            </View >
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30, marginLeft: 5 }}>
                <Text style={{ color: 'black', fontSize: 25, marginLeft: 24, marginRight: 8, alignSelf: 'center' }}>
                    Due Date:
                </Text>
                <View style={{ marginLeft: 5, alignSelf: 'center' }}>
                    <Switch
                        trackColor={{ false: '#767577', true: 'rgb(52, 199, 89)' }}
                        thumbColor='white'
                        ios_backgroundColor="rgb(174, 174, 178)"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            {(isEnabled) ? (
                <RNDateTimePicker onChange={(event: any) => setDate(event)} value={date} display="spinner" mode="datetime" />
            ) : (<></>)}
            <Button
                icon="check"
                mode="text"
                style={{ marginTop: 24 }}
                labelStyle={{ fontSize: 45, color: 'black' }}
                onPress={() => {
                    if (text === '') {
                        setError(true)
                    }
                    else {
                        let newTask: Task = {
                            name: text,
                            completion: false,
                            benefits: selectedBenefits.map((e: boolean, i: number) => {
                                return {
                                    e,
                                    i
                                }
                            }).filter((e: any) => {
                                return !e.e
                            }).map((e: any) => {
                                return benefits[e.i]
                            })
                        }

                        if (isEnabled) {
                            newTask = {
                                ...newTask,
                                date: date
                            }
                        }

                        if (type === 'Edit Task') {
                            store.dispatch({
                                type: 'editTask',
                                payload: {
                                    catergoryName: category.name,
                                    newTask: newTask,
                                    oldTask: task
                                }
                            })
                        }
                        else {
                            store.dispatch({
                                type: 'addTask',
                                payload: {
                                    catergoryName: category.name,
                                    task: newTask
                                }
                            })
                        }

                        navigation.goBack()
                    }
                }}
            >
            </Button>
        </SafeAreaView >
    )
}