
import dayjs from "dayjs";
import { useEffect, useRef} from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { getCalendarColumns, ITEM_WIDTH } from "./src/util";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hook/use-calendar";
import { useTodoList } from "./src/hook/use-todo-list";
import { Image } from "react-native";
import Calendar from "./src/Calendar";
import Margin from "./src/Margin";
import { statusBarHeight } from "./src/util";
import {Ionicons} from '@expo/vector-icons'
import AddTodoInput from "./src/AddTodoInput";



export default function App() {
  const now = dayjs();

  const {
    selectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
    setSelectedDate,
  } = useCalendar(now);

  const { 
    todoList,
    filteredTodoList,
    input,
    setInput,
    toggleTodo,
    removeTodo,
    addTodo,

    resetInput } = useTodoList(selectedDate);
  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => (
    <View>
    <Calendar
        todoList={todoList}
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
       <Margin height={15}/>
      <View 
      style={{
        width: 4, 
        height: 4, 
        borderRadius: 4 / 2, 
        backgroundColor: "#a3a3a3",
        alignSelf: "center",
        }}/>
       <Margin height={15}/>
      </View>
  )
    
  

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    return (
      <View style={{
      flexDirection: "row", 
      width: ITEM_WIDTH, 
      // backgroundColor: todo.id % 2 === 0  ? "pink": "lightblue",
      paddingVertical: 10, 
      paddingHorizontal: 5, 
      borderBottomWidth: 0.2,
      borderColor: "#a6a6a6"
      }}>
      <Text style={{ flex: 1, fontSize: 14, color: "#595959"}}>{todo.content}</Text>
      <Ionicons 
      name="ios-checkmark" 
      size={17}
      color={isSuccess? "#595959": "#bfbfbf"}/>
    </View>
    )
   
  }

  useEffect(() => {
    // console.log('columns', columns);
  });

  useEffect(() => {
    console.log(
      "change selectedDate?",
      dayjs(selectedDate).format("YYYY.MM.DD")
    );
  }, [selectedDate]);
  return (
    <View style={styles.container}>
      <Image
        source={{
          // 출처: https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <FlatList
        data={todoList}
        contentContainerStyle={{ paddingTop: statusBarHeight }}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
      <AddTodoInput 
      value={input}
      onChangeText={setInput}
      placeholder={`${dayjs(selectedDate).format('MM.D')}`}에 추가할 투두/>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
