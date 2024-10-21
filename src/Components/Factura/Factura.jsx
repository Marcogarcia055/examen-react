import React, { useState, useEffect } from 'react';
import { AddFactura, GetByFecha } from '../../Service/FacturaService';
import { Button } from 'antd';
import { GetAllCliente } from '../../Service/ClienteService';

export const Factura = () => {
    const [factura, setFactura] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [fecha, setFecha] = useState({
        FechaInicio: "",
        FechaFin: ""
    });
    const [factura2, setFactura2] = useState({
        Folio: "",
        idCliente: "",
        FechaRegistro: new Date().toISOString().split("T")[0],
        Concepto: "",
        Cantidad: "",
        Total: ""
    });

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const data = await GetAllCliente();
                setCliente(data);
            } catch (error) {
                console.error(error)
            }
        };
        fetchCliente();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await GetByFecha(fecha.FechaInicio, fecha.FechaFin);
            setFactura(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFecha((prev) => ({ ...prev, [name]: value }));
    };

    const borrar = () => {
        setFactura2({
            Folio: "",
            idCliente: "",
            FechaRegistro: new Date().toISOString().split("T")[0],
            Concepto: "",
            Cantidad: "",
            Total: ""
        });
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const data = await AddFactura(factura2);
            console.log(factura2)
            setFactura2(data);
            borrar();
        } catch (error) {
            console.error(error);
        }
    };

    const calcularTotal = (cantidad) => {
        const cantidadNum = parseFloat(cantidad);
        return isNaN(cantidadNum) ? "0.00" : (cantidadNum * 1.16).toFixed(2);
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;

        setFactura2((prev) => {
            const newValues = { ...prev, [name]: value };
            if (name === "Cantidad") {
                newValues.Total = calcularTotal(value);
            }
            return newValues;
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>FECHA INICIO </label>
                    <input
                        type="date"
                        name="FechaInicio"
                        value={fecha.FechaInicio}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>FECHA FIN </label>
                    <input
                        type="date"
                        name="FechaFin"
                        value={fecha.FechaFin}
                        onChange={handleChange}
                    />
                </div>
                <Button type='primary' htmlType='submit'>BUSCAR</Button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>FOLIO</th>
                        <th>CANTIDAD</th>
                        <th>FECHAREGISTRO</th>
                    </tr>
                </thead>
                <tbody>
                    {factura.map((factura, index) => (
                        <tr key={index}>
                            <td>{factura.nombreCliente}</td>
                            <td>{factura.folio}</td>
                            <td>{factura.cantidad}</td>
                            <td>{factura.fechaRegistro.split(' ')[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <form onSubmit={handleSubmit2}>
                    <div>
                        <label>CLIENTE </label>
                        <select
                            name="idCliente"
                            value={factura2.idCliente}
                            onChange={handleChange2}
                        >
                            <option value="">Cliente</option> {}
                            {cliente.map(cliente => (
                                <option key={cliente.idCliente} value={cliente.idCliente}>
                                    {cliente.nombreCliente}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>FOLIO </label>
                        <input
                            type="text"
                            name="Folio"
                            value={factura2.Folio}
                            onChange={handleChange2}
                        />
                    </div>
                    <div>
                        <label>FECHA REGISTRO </label>
                        <input
                            type="date"
                            name="FechaRegistro"
                            value={factura2.FechaRegistro}
                            onChange={handleChange2}
                        />
                    </div>
                    <div>
                        <label>CONCEPTO </label>
                        <input
                            type="text"
                            name="Concepto"
                            value={factura2.Concepto}
                            onChange={handleChange2}
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <label>CANTIDAD </label>
                        <input
                            type="number"
                            name="Cantidad"
                            value={factura2.Cantidad}
                            onChange={e => {
                                const cantidad = e.target.value;
                                setFactura2(prev => ({
                                    ...prev,
                                    Cantidad: cantidad,
                                    Total: calcularTotal(cantidad)
                                }));
                            }}
                            onBlur={e => setFactura2(prev => ({
                                ...prev,
                                Cantidad: (parseFloat(e.target.value) || 0).toFixed(2),
                                Total: calcularTotal((parseFloat(e.target.value) || 0).toFixed(2))
                            }))}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div>
                        <label>TOTAL/IVA </label>
                        <input
                            type="text"
                            name="Total"
                            value={factura2.Total}
                            readOnly
                        />
                    </div>

                    <Button type='primary' htmlType='submit'>GUARDAR</Button>
                    <Button type='primary' onClick={() =>{borrar();}}>CANCELAR</Button>

                </form>
            </div>
        </div>
    );
};

export default Factura;
