
import dayjs from "dayjs";
import { useEffect} from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { getCalendarColumns } from "./src/util";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hook/use-calendar";
import { useTodoList } from "./src/hook/use-todo-list";
import { Image } from "react-native";
import Calendar from "./src/Calendar";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const statusBarHeight = getStatusBarHeight(true);

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

  const { todoList } = useTodoList(selectedDate);
  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => {
    <Calendar
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
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
      scrollEnabled={false}
      data={columns}
      numColumns={7}
      
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(_, index) => `column-${index}`}
    />
     <Calendar 
      columns={columns}
      selectedDate={selectedDate}
      onPressLeftArrow={onPressLeftArrow}
      onPressHeaderDate={onPressHeaderDate}
      onPressRightArrow={onPressRightArrow}
      onPressDate={onPressDate}
    />
      <FlatList
        
        data={todoList}
        contentContainerStyle={{ paddingTop: statusBarHeight }}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item: todo }) => {
          return <Text>{todo.content}</Text>;
        }}
      />
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
