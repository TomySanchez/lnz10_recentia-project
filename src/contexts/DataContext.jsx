import { createContext, useEffect, useState } from 'react';
import {
  dataBarrios,
  dataDetallesDeEntregas,
  dataDetallesDePagos,
  dataDetallesDePedidos,
  dataDirecciones,
  dataEntregas,
  dataLocalidades,
  dataMetodosDePago,
  dataPagos,
  dataPedidos,
  dataPrecios,
  dataProductos,
  dataRecorridos
} from '../data';
import { getClientes } from '../services/clientes';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [barrios, setBarrios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detallesDeEntregas, setDetallesDeEntregas] = useState([]);
  const [detallesDePagos, setDetallesDePagos] = useState([]);
  const [detallesDePedidos, setDetallesDePedidos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [metodosDePago, setMetodosDePago] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recorridos, setRecorridos] = useState([]);

  useEffect(() => {
    getClientes()
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => console.error(err));

    setBarrios(dataBarrios);
    setClientes();
    setDetallesDeEntregas(dataDetallesDeEntregas);
    setDetallesDePagos(dataDetallesDePagos);
    setDetallesDePedidos(dataDetallesDePedidos);
    setDirecciones(dataDirecciones);
    setEntregas(dataEntregas);
    setLocalidades(dataLocalidades);
    setMetodosDePago(dataMetodosDePago);
    setPagos(dataPagos);
    setPedidos(dataPedidos);
    setPrecios(dataPrecios);
    setProductos(dataProductos);
    setRecorridos(dataRecorridos);
  }, []);

  return (
    <DataContext.Provider
      value={{
        barrios,
        clientes,
        detallesDeEntregas,
        detallesDePagos,
        detallesDePedidos,
        direcciones,
        entregas,
        localidades,
        metodosDePago,
        pagos,
        pedidos,
        precios,
        productos,
        recorridos
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
