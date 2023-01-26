import { SafeAreaView } from 'react-native';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getCalendarColumns } from './src/util';
import { View } from 'react-native';
import { getDayText, getDayColor } from './src/util';


const columnSize = 30;

const Column = ({text, color, opacity }) => {
  return (
    <View style={{width: columnSize, height: columnSize, justifyContent: "center", alignItems: "center" }}>
        <Text style={{color, opacity}}>{text}</Text>
      </View>
  )
}

export default function App() {
 
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const ListHeaderComponent = () => (
    <View style={{flexDirection: 'row'}}>
       {/* 일~토 */}
    {[0,1,2,3,4,5,6].map(day => {
      const dayText = getDayText(day);
      const color = getDayColor(day)
      return (
        <Column text={dayText} color={color} opacity={1}/>
      )
    })}
    </View>
   
  )
  const renderItem = ({ item : date}) => {
    const dateText = dayjs(date).get('date')
    const day = dayjs(date).get('day')
    const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
    const isCurrentMonth = dayjs(date).isSame(now, 'month');
    return (
      <Column text={dateText} color={color} opacity={isCurrentMonth ? 1: 0.4}/>
    
    )
  }

  useEffect(() => { 
    // console.log('columns', columns);
  })
  return (
    <SafeAreaView style={styles.container}>
     <FlatList
      data={columns}
      numColumns={7} 
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
