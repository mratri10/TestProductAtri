import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../redux';
import DateWidget from '../../widget/date/dateWidget';
import {formatDate} from '../../widget/date/format';
import IconApp from '../../widget/iconWidget';
import ImageWidget from '../../widget/imageWidget';

function InputProduct({onPressInput, mode}: TypeInputProduct) {
  const detailProduct: ProductsDetailEntity = useSelector(
    (state: ApplicationState) => state.detailReducer,
  );
  const data = detailProduct.data;
  const getTahun = parseInt(data?.expiredAt.substring(0, 4)!);
  const getBulan = parseInt(data?.expiredAt.substring(5, 7)!) - 1;
  const getTanggal = parseInt(data?.expiredAt.substring(8, 10)!);

  const [valueName, setValueName] = useState(
    mode == 'UPDATE' ? data?.name : '',
  );
  const [valueQTY, setValueQTY] = useState(mode == 'UPDATE' ? data?.qty : '');
  const [valueImage, setValueImage] = useState(
    mode == 'UPDATE' ? data?.picture : '',
  );
  const [valueDate, setValueDate] = useState<Date>(
    mode == 'UPDATE' ? new Date(getTahun, getBulan, getTanggal) : new Date(),
  );
  const [tanggal, setTanggal] = useState(false);
  const [activated, setActivated] = useState(
    mode == 'UPDATE' ? data?.name : false,
  );
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          width: '80%',
        }}>
        <TouchableOpacity
          onPress={() => onPressInput({onlyCLose: true} as TypeProductItem)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: -10,
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: 'white',
          }}>
          <IconApp name="times" size={20} color="red" />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Add Product
        </Text>

        <ImageWidget
          onPressImage={(v: string) => {
            setValueImage(v);
          }}
          value={valueImage}
        />
        <View style={{marginVertical: 20}}>
          <FormInput
            label="Name"
            onChangeText={text => setValueName(text)}
            value={valueName!}
          />

          <FormInput
            value={valueQTY!}
            label="QTY"
            onChangeText={text => setValueQTY(text)}
            numeric={true}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            onPress={() => {
              setTanggal(true);
            }}>
            <Text>Expired: {formatDate(valueDate)}</Text>
            <View style={{width: 10}} />
            <IconApp name="calendar" size={18} />
          </TouchableOpacity>
          {tanggal ? (
            <DateWidget
              onPressDate={(date: Date) => {
                setTanggal(false);
                setValueDate(new Date(date));
              }}
              value={valueDate}
            />
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text>Activated</Text>
          <TouchableOpacity
            onPress={() => setActivated(!activated)}
            style={{
              width: 100,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <View
              style={{width: 49, backgroundColor: activated ? 'white' : 'grey'}}
            />
            <View
              style={{
                width: 49,
                backgroundColor: activated ? 'orange' : 'white',
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: mode == 'UPDATE' ? 'blue' : 'green',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            marginTop: 30,
          }}
          onPress={() => {
            onPressInput({
              onlyCLose: false,
              name: valueName,
              qty: valueQTY,
              picture: valueImage,
              expiredAt: formatDate(valueDate),
              isActive: activated,
            } as TypeProductItem);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {mode == 'UPDATE' ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type FormType = {
  label: string;
  onChangeText: (text: string) => void;
  numeric?: boolean;
  value: string;
};
const FormInput = ({label, onChangeText, numeric = false, value}: FormType) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{flex: 1, fontSize: 12}}>{label}</Text>
      <Text>:</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={numeric ? 'numeric' : 'default'}
        style={{
          flex: 3,
          borderBottomWidth: 1,
          fontSize: 14,
          paddingVertical: 0,
        }}
      />
    </View>
  );
};

export default InputProduct;
