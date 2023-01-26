import { SafeAreaView } from 'react-native';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getCalendarColumns } from './src/util';
import { View } from 'react-native';


const columnSize = 30;

const renderItem = ({ item : date}) => {
  const dateText = dayjs(date).get('date')
  const day = dayjs(date).get('day')
  const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
  return (
    <View style={{width: columnSize, height: columnSize, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color}}>{dateText}</Text>
    </View>
    
  )
}

export default function App() {
  console.log('hi')
  const now = dayjs();
  const columns = getCalendarColumns(now);

  useEffect(() => { 
    console.log('columns', columns);
  })
  return (
    <SafeAreaView style={styles.container}>
     <FlatList
      data={columns}
      numColumns={7} 
      renderItem={renderItem}
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
