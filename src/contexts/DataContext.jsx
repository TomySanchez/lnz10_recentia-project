import { createContext, useEffect, useState } from 'react';
import {
  dataBarrios,
  dataClientes,
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
    setBarrios(dataBarrios);
    setClientes(
      transformClientes(
        dataClientes,
        dataDirecciones,
        dataBarrios,
        dataLocalidades
      )
    );
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

  function transformClientes(clientes, direcciones, barrios, localidades) {
    return clientes.map((cliente) => {
      const direccion = direcciones.find(
        (direccion) => direccion.id === cliente.idDireccion
      );
      const barrio = direccion
        ? barrios.find((barrio) => barrio.id === direccion.idBarrio)
        : null;
      const localidad = barrio
        ? localidades.find((localidad) => localidad.id === barrio.idLocalidad)
        : null;

      return {
        ...cliente,
        direccion: { ...direccion },
        barrio: { ...barrio },
        localidad: { ...localidad }
      };
    });
  }

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
