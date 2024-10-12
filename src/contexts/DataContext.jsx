import { createContext, useEffect, useState } from 'react';
import {
  dataDetallesDeEntregas,
  dataDetallesDePagos,
  dataDirecciones,
  dataEntregas,
  dataLocalidades,
  dataMetodosDePago,
  dataPagos,
  dataPrecios,
  dataProductos,
  dataRecorridos
} from '../data';
import { getClientes } from '../services/clientes';
import { getBarrios } from '../services/barrios';
import { getPedidos } from '../services/pedidos';
import { formatFecha } from '../utils/formatFecha';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [barrios, setBarrios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detallesDeEntregas, setDetallesDeEntregas] = useState([]);
  const [detallesDePagos, setDetallesDePagos] = useState([]);
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
    getBarrios()
      .then((res) => {
        setBarrios(res.data);
      })
      .catch((err) => console.error(err));

    getClientes()
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => console.error(err));

    getPedidos()
      .then((res) => {
        const newData = res.data?.map((pedido) => {
          const formattedFecha = formatFecha(pedido.fechaRegistro);

          return {
            ...pedido,
            fechaRegistro: formattedFecha
          };
        });

        setPedidos(newData);
      })
      .catch((err) => console.error(err));

    setDetallesDeEntregas(dataDetallesDeEntregas);
    setDetallesDePagos(dataDetallesDePagos);
    setDirecciones(dataDirecciones);
    setEntregas(dataEntregas);
    setLocalidades(dataLocalidades);
    setMetodosDePago(dataMetodosDePago);
    setPagos(dataPagos);
    setPrecios(dataPrecios);
    setProductos(dataProductos);
    setRecorridos(dataRecorridos);
  }, []);

  return (
    <DataContext.Provider
      value={{
        barrios,
        setBarrios,
        clientes,
        setClientes,
        detallesDeEntregas,
        setDetallesDeEntregas,
        detallesDePagos,
        setDetallesDePagos,
        direcciones,
        setDirecciones,
        entregas,
        setEntregas,
        localidades,
        setLocalidades,
        metodosDePago,
        setMetodosDePago,
        pagos,
        setPagos,
        pedidos,
        setPedidos,
        precios,
        setPrecios,
        productos,
        setProductos,
        recorridos,
        setRecorridos
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
