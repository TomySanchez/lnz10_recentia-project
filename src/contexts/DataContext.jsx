import { createContext, useContext, useEffect, useState } from 'react';
import {
  dataDetallesDeEntregas,
  dataDetallesDePagos,
  dataDirecciones,
  dataLocalidades,
  dataMetodosDePago,
  dataPrecios,
  dataProductos
} from '../data';
import { getClientes } from '../services/clientes';
import { getBarrios } from '../services/barrios';
import { getPedidos } from '../services/pedidos';
import { formatFecha } from '../utils/formatFecha';
import { MessageContext } from './MessageContext';
import { sortItemsArrayById } from '../utils/sortItemsArrayById';
import { getDiasSemana } from '../services/diasSemana';
import { getRecorridos } from '../services/recorridos';
import { getEntregas } from '../services/entregas';
import { getPagos } from '../services/pagos';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { messageApi } = useContext(MessageContext);

  const [barrios, setBarrios] = useState([]);
  const [loadingBarrios, setLoadingBarrios] = useState(false);
  const [clientes, setClientes] = useState([]); // Son todos los clientes, incluidos los desactivados
  const [activeClientes, setActiveClientes] = useState([]); // Solo los clientes activos
  const [inactiveClientes, setInactiveClientes] = useState([]); // Solo los clientes archivados
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [detallesDeEntregas, setDetallesDeEntregas] = useState([]);
  const [detallesDePagos, setDetallesDePagos] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [loadingDiasSemana, setLoadingDiasSemana] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loadingEntregas, setLoadingEntregas] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [metodosDePago, setMetodosDePago] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loadingPagos, setLoadingPagos] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recorridos, setRecorridos] = useState([]);
  const [loadingRecorridos, setLoadingRecorridos] = useState(false);

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

  async function fetchDiasSemana() {
    try {
      setLoadingDiasSemana(true);
      const res = await getDiasSemana();

      const sortedDiasSemana = sortItemsArrayById(
        res.data,
        'nroOrdenSemana',
        'asc'
      );

      setDiasSemana(sortedDiasSemana);
    } catch (err) {
      console.error(err);
      // messageApi.error('No se pudo cargar la lista de días de la semana');
    } finally {
      setLoadingDiasSemana(false);
    }
  }

  async function fetchEntregas() {
    try {
      setLoadingEntregas(true);

      const res = await getEntregas();

      const newData = res?.data?.map((entrega) => {
        const formattedFecha = formatFecha(entrega.fechaEntrega);
        return { ...entrega, fechaEntrega: formattedFecha };
      });

      const sortedEntregas = sortItemsArrayById(newData, 'id', 'desc');
      setEntregas(sortedEntregas);
    } catch (err) {
      console.error(err);
      messageApi.error('No se pudo cargar la lista de recorridos');
    } finally {
      setLoadingEntregas(false);
    }
  }

  async function fetchPagos() {
    try {
      setLoadingPagos(true);

      const res = await getPagos();

      const newData = res?.data?.map((pago) => {
        const formattedFecha = formatFecha(pago.fechaPago);
        return { ...pago, fechaPago: formattedFecha };
      });

      const sortedPagos = sortItemsArrayById(newData, 'id', 'desc');
      setEntregas(sortedPagos);
    } catch (err) {
      console.error(err);
      messageApi.error('No se pudo cargar la lista de recorridos');
    } finally {
      setLoadingPagos(false);
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

  async function fetchRecorridos() {
    try {
      setLoadingRecorridos(true);

      const res = await getRecorridos();

      const newData = res?.data?.map((recorrido) => {
        const formattedFecha = formatFecha(recorrido.fecha);
        return { ...recorrido, fecha: formattedFecha };
      });

      const sortedRecorridos = sortItemsArrayById(newData, 'id', 'desc');
      setRecorridos(sortedRecorridos);
    } catch (err) {
      console.error(err);
      messageApi.error('No se pudo cargar la lista de recorridos');
    } finally {
      setLoadingRecorridos(false);
    }
  }

  useEffect(() => {
    fetchBarrios();
    fetchClientes();
    fetchDiasSemana();
    fetchEntregas();
    fetchPagos();
    fetchPedidos();
    fetchRecorridos();

    setDetallesDeEntregas(dataDetallesDeEntregas);
    setDetallesDePagos(dataDetallesDePagos);
    setDirecciones(dataDirecciones);
    setLocalidades(dataLocalidades);
    setMetodosDePago(dataMetodosDePago);
    setPrecios(dataPrecios);
    setProductos(dataProductos);
  }, []);

  useEffect(() => {
    const newData = clientes.filter((cliente) => cliente.activo == 1);

    setActiveClientes(newData);
  }, [clientes]);

  useEffect(() => {
    const newData = clientes.filter((cliente) => cliente.activo == 0);

    setInactiveClientes(newData);
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
        inactiveClientes,
        setInactiveClientes,
        loadingClientes,
        setLoadingClientes,
        detallesDeEntregas,
        setDetallesDeEntregas,
        detallesDePagos,
        setDetallesDePagos,
        diasSemana,
        setDiasSemana,
        loadingDiasSemana,
        setLoadingDiasSemana,
        direcciones,
        setDirecciones,
        entregas,
        setEntregas,
        loadingEntregas,
        setLoadingEntregas,
        localidades,
        setLocalidades,
        metodosDePago,
        setMetodosDePago,
        pagos,
        setPagos,
        loadingPagos,
        setLoadingPagos,
        pedidos,
        setPedidos,
        loadingPedidos,
        setLoadingPedidos,
        precios,
        setPrecios,
        productos,
        setProductos,
        recorridos,
        setRecorridos,
        loadingRecorridos,
        setLoadingRecorridos
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
