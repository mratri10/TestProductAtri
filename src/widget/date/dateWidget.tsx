import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import React, {useEffect} from 'react';
import {View} from 'react-native';

function DateWidget({onPressDate, value}: DateType) {
  return (
    <View>
      <RNDateTimePicker
        value={new Date()}
        maximumDate={new Date(2050, 12, 31)}
        minimumDate={new Date(2000, 1, 1)}
        onChange={date => onPressDate(date.nativeEvent.timestamp)}
        placeholderText="Pilih Tanggal"
        mode="date"
      />
    </View>
  );
}

export default DateWidget;
