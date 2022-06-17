import { Inter_200ExtraLight } from "@expo-google-fonts/inter";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar } from "react-native-paper";
import { AnimateStyle } from "react-native-reanimated";
import { Picker, PickerInstance, PickerItem } from "react-native-woodpicker";
import store from "../storage/Store";
import { iosColors } from "../styles/styles";
import { Benefit, Category, Task } from "../types";
import TaskNode from "./TaskNode";

type TaskNodeADT = {
    task: Task;
    category: Category;
};

function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const SortedTask = ({ sortType, taskList, nav }: { sortType: number; taskList: Array<{ task: Task; category: Category }>; nav: any }) => {
    //@ts-ignore
    let unBindedTaskList: Array<TaskNodeADT> = [].concat(taskList);

    if (sortType) {
        switch (sortType) {
            case 1:
                //@ts-ignore
                unBindedTaskList.sort((a: TaskNodeADT, b: TaskNodeADT): number => {
                    if (a.task.date && !b.task.date) {
                        return -1;
                    }
                    if (!a.task.date && b.task.date) {
                        return 1;
                    }
                    if (!a.task.date && !b.task.date) {
                        return 0;
                    } else {
                        return b.task.date!.getTime() - a.task.date!.getTime();
                    }
                });
            case 2:
                unBindedTaskList.sort((a: TaskNodeADT, b: TaskNodeADT): number => {
                    let aSize = (() => {
                        let size = 0;
                        a.task.benefits.forEach((e: Benefit) => {
                            size += e.ranking;
                        });
                        return size;
                    })();

                    let bSize = (() => {
                        let size = 0;
                        b.task.benefits.forEach((e: Benefit) => {
                            size += e.ranking;
                        });
                        return size;
                    })();

                    return aSize - bSize;
                });
            case 3:
                unBindedTaskList.sort((a: TaskNodeADT, b: TaskNodeADT): number => {
                    return b.task.benefits.length - a.task.benefits.length;
                });
        }
    } else {
        shuffleArray(unBindedTaskList);
    }

    return (
        <>
            {unBindedTaskList.map((t: { task: Task; category: Category }, i: number) => {
                return <TaskNode key={i} category={t.category} task={t.task} nav={nav} />;
            })}
        </>
    );
};

export default function SortableTasks({ navigation }: any) {
    const [categories, setCategories] = useState(store.getState().categories);

    const [pickedData, setPickedData] = useState<PickerItem>({
        label: "Benefits Quantity",
        value: 3,
    });

    React.useMemo(() => {
        store.dispatch({
            type: "setCategories",
            payload: categories,
        });
    }, [categories]);

    React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCategories(store.getState().categories);
        });

        return unsubscribe;
    }, []);

    const pickerRef = React.useRef<PickerInstance | null>(null);

    const data: Array<PickerItem> = [
        { label: "Due Date", value: 1 },
        { label: "Benefits Importance Sum", value: 2 },
        { label: "Benefits Quantity", value: 3 },
        { label: "Benefits Quantity and Sum", value: 4 },
    ];

    useEffect(() => {}, [pickedData]);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <View
                style={{
                    flex: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ marginLeft: 20, fontSize: 20 }}> Sorted Tasks </Text>
                <View
                    style={{
                        marginRight: 20,
                        alignSelf: "flex-end",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap-reverse",
                    }}
                >
                    <Picker
                        InputComponent={() => (
                            <Avatar.Icon
                                style={{
                                    backgroundColor: "transparent",
                                    position: "relative",
                                    top: -15,
                                    transform: [{ rotateY: "180deg" }],
                                }}
                                size={55}
                                icon={require("../assets/icons/sort_change.png")}
                                color="black"
                                onTouchEnd={() => {
                                    pickerRef.current?.open();
                                }}
                            />
                        )}
                        iosCustomProps={{
                            style: {
                                backgroundColor: iosColors.System.gray3.light,
                                fontFamily: "SF-Pro",
                            },
                        }}
                        itemColor={iosColors.System.gray6.dark}
                        textInputStyle={{
                            color: iosColors.Blue.light,
                            fontFamily: "SF-Pro",
                        }}
                        ref={pickerRef}
                        items={data}
                        onItemChange={setPickedData}
                        isNullable={true}
                    />
                </View>
            </View>
            <ScrollView
                style={{
                    height: "100%",
                    position: "relative",
                    top: -17,
                    width: "100%",
                }}
            >
                {(() => {
                    let allTasks: Array<{ task: Task; category: Category }> = [];

                    categories.forEach((e: Category, i: number) => {
                        e.tasks.forEach((t: Task) => {
                            allTasks.push({
                                task: t,
                                category: e,
                            });
                        });
                    });

                    return allTasks.length === 0 ? (
                        <Text
                            style={{
                                alignSelf: "center",
                            }}
                        >
                            No Tasks, add a task using the cateroies section
                        </Text>
                    ) : (
                        <SortedTask taskList={allTasks} nav={navigation} sortType={pickedData?.value} />
                    );
                })()}
                <View
                    style={{
                        borderRadius: 5,
                        height: 100,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 25 / 2,
                    }}
                />
            </ScrollView>
        </View>
    );
}
