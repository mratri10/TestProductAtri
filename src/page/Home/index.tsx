import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getListProduct, postProduct, updateProduct} from '../../action';
import {ApplicationState} from '../../redux';
import ProductPage from '../Product';
import DetailProduct from '../Product/detail';
import InputProduct from '../Product/input';

function Home() {
  const dispatch: React.Dispatch<any> = useDispatch();
  const [inputShow, setInputShow] = useState<boolean>(false);
  const [req, setReq] = useState('');
  const detailProduct: ProductsDetailEntity = useSelector(
    (state: ApplicationState) => state.detailReducer,
  );
  const listProduct: ProductsListEntity = useSelector(
    (state: ApplicationState) => state.productReducer,
  );

  const postProductResult: ProductsPostEntity = useSelector(
    (state: ApplicationState) => state.postReducer,
  );
  const updateProductResult: ProductsUpdateEntity = useSelector(
    (state: ApplicationState) => state.updateReducer,
  );

  const updateData = async (data: TypeProductItem) => {
    data.id = detailProduct.data?.id;
    await dispatch(updateProduct(detailProduct.data?.id!, data));
  };
  const postData = async (data: TypeProductItem) => {
    await dispatch(postProduct(data));
  };

  useEffect(() => {
    console.log(JSON.stringify(updateProductResult));
    if (updateProductResult.isUpdate) {
      resetProductFunction();
    }
    if (postProductResult.isPost) {
      resetProductFunction();
    }
  }, [postProductResult, updateProductResult]);

  const resetProductFunction = async () => {
    await dispatch(getListProduct());
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}} testID="HomeID">
      {detailProduct.data ? (
        <DetailProduct
          item={detailProduct.data}
          index={detailProduct.data.id}
          update={() => {
            setInputShow(true);
            setReq('UPDATE');
          }}
        />
      ) : null}
      {listProduct.loading ? null : (
        <TouchableOpacity
          onPress={() => {
            setInputShow(true);
            setReq('ADD');
          }}
          style={[
            styleApp.buttonApp,
            {flex: 0, backgroundColor: 'green', margin: 20},
          ]}>
          <Text style={styleApp.textButton}>Add</Text>
        </TouchableOpacity>
      )}
      <DashBoard />
      <Modal visible={inputShow} transparent={true}>
        <InputProduct
          mode={req}
          onPressInput={({
            name,
            qty,
            picture,
            expiredAt,
            isActive,
            onlyCLose,
          }: TypeProductItem) => {
            setInputShow(false);
            if (!onlyCLose) {
              if (name == '') {
                Alert.alert('Nama harus diisi');
              } else if (qty == '') {
                Alert.alert('Kuantiti harus diisi');
              } else if (picture == '') {
                Alert.alert('Gambar harus diisi');
              } else if (expiredAt == '') {
                Alert.alert('Tanggal harus diisi');
              } else {
                if (req == 'ADD') {
                  postData({
                    name,
                    qty,
                    picture,
                    expiredAt,
                    isActive,
                    onlyCLose,
                  });
                } else {
                  updateData({
                    name,
                    qty,
                    picture,
                    expiredAt,
                    isActive,
                    onlyCLose,
                  });
                }
              }
            }
          }}
        />
      </Modal>
    </View>
  );
}

const DashBoard = () => {
  return (
    <View style={styleApp.app}>
      <View style={{flex: 1}}>
        <ProductPage />
      </View>
    </View>
  );
};

const styleApp = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  txtDashTitle: {
    fontSize: 14,
  },
  txtDashDesc: {
    fontSize: 12,
    fontWeight: '300',
  },
  txtDashMain: {
    fontSize: 26,
  },
  txtDashItem: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dashItem: {
    alignItems: 'center',
  },
  weather: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonApp: {
    flex: 1,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
