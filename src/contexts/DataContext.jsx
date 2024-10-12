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
  const [loadingBarrios, setLoadingBarrios] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [detallesDeEntregas, setDetallesDeEntregas] = useState([]);
  const [detallesDePagos, setDetallesDePagos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [metodosDePago, setMetodosDePago] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recorridos, setRecorridos] = useState([]);

  async function fetchBarrios() {
    try {
      setLoadingBarrios(true);
      const res = await getBarrios();
      setBarrios(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBarrios(false);
    }
  }

  async function fetchClientes() {
    try {
      setLoadingClientes(true);
      const res = await getClientes();
      setClientes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingClientes(false);
    }
  }

  async function fetchPedidos() {
    try {
      setLoadingPedidos(true);
      const res = await getPedidos();
      const newData = res.data?.map((pedido) => {
        const formattedFecha = formatFecha(pedido.fechaRegistro);
        return { ...pedido, fechaRegistro: formattedFecha };
      });
      setPedidos(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPedidos(false);
    }
  }

  useEffect(() => {
    fetchBarrios();
    fetchClientes();
    fetchPedidos();

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
        loadingBarrios,
        setLoadingBarrios,
        clientes,
        setClientes,
        loadingClientes,
        setLoadingClientes,
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
        loadingPedidos,
        setLoadingPedidos,
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
