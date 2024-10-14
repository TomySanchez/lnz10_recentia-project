import { createContext, useContext, useEffect, useState } from 'react';
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
import { MessageContext } from './MessageContext';
import { sortItemsArrayById } from '../utils/sortItemsArrayById';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { messageApi } = useContext(MessageContext);

  const [barrios, setBarrios] = useState([]);
  const [loadingBarrios, setLoadingBarrios] = useState(false);
  const [clientes, setClientes] = useState([]); // Son todos los clientes, incluidos los desactivados
  const [activeClientes, setActiveClientes] = useState([]); // Solo los clientes activos
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

  console.log('clientes:', clientes);
  console.log('pedidos:', pedidos);
  console.log('barrios:', barrios);

  async function fetchBarrios() {
    try {
      setLoadingBarrios(true);
      const res = await getBarrios();

      const sortedBarrios = sortItemsArrayById(res.data, 'nombre', 'asc');
      setBarrios(sortedBarrios);
    } catch (err) {
      console.error(err);
      messageApi.error('No se pudo cargar la lista de barrios');
    } finally {
      setLoadingBarrios(false);
    }
  }

  async function fetchClientes() {
    try {
      setLoadingClientes(true);
      const res = await getClientes();

      const sortedClientes = sortItemsArrayById(res.data, 'id', 'desc');
      setClientes(sortedClientes);
    } catch (err) {
      console.error(err);
      messageApi.error('No se pudo cargar la lista de clientes');
    } finally {
      setLoadingClientes(false);
    }
  }

  async function fetchPedidos() {
    try {
      setLoadingPedidos(true);
      const res = await getPedidos();
      const filteredPedidos = res.data?.filter((pedido) => pedido.activo == 1);
      const newData = filteredPedidos?.map((pedido) => {
        const formattedFecha = formatFecha(pedido.fechaRegistro);
        return { ...pedido, fechaRegistro: formattedFecha };
      });

      const sortedPedidos = sortItemsArrayById(newData, 'id', 'desc');
      setPedidos(sortedPedidos);
    } catch (err) {
      console.error(err);
      messageApi.error('No se pudo cargar la lista de pedidos');
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

  useEffect(() => {
    const newData = clientes.filter((cliente) => cliente.activo == 1);

    setActiveClientes(newData);
  }, [clientes]);

  return (
    <DataContext.Provider
      value={{
        barrios,
        setBarrios,
        loadingBarrios,
        setLoadingBarrios,
        clientes,
        setClientes,
        activeClientes,
        setActiveClientes,
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
