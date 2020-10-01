const { response } = require('express');
const vehiculoModel = require('../models/vehiculo');

const createVehiculo = async (req, res = response) => {
  const entity = new vehiculoModel(req.body);
  try {
    const entitySaved = await entity.save();

    return res.status(201).json({
      ok: true,
      data: entitySaved,
    });
  } catch (error) {
    console.log(error);
    const { code, keyValue } = error;
    if (code === 11000) {
      return res.status(400).json({
        ok: false,
        data: { mensaje: `Duplicidad placa: ${keyValue.placa}` },
      });
    }

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const getVehiculo = async (req, res = response) => {
  try {
    const entities = await vehiculoModel.find();

    return res.status(200).json({
      ok: true,
      data: entities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const getOneVehiculo = async (req, res = response) => {
  const { id } = req.params;
  try {
    if (id.length <= 10) {
      return res.status(400).json({
        ok: false,
        data: { message: 'Invalido codigo interno de busqueda' },
      });
    }

    const entity = await vehiculoModel.findById(id);
    return res.status(200).json({
      ok: true,
      data: entity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const getPlacaVehiculo = async (req, res = response) => {
  const { placa } = req.params;
  try {
    if (placa.length <= 2) {
      return res.status(404).json({
        ok: false,
        data: { message: 'Invalida placa' },
      });
    }

    const entity = await vehiculoModel.findOne({ placa });
    if (!entity) {
      return res.status(404).json({
        ok: false,
        data: { message: `Placa ${placa} no localizada` },
      });
    }

    res.status(200).json({
      ok: true,
      data: entity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const updateVehiculo = async (req, res = response) => {
  const vehiculoId = req.params.id;
  try {
    const entityFind = await vehiculoModel.findById(vehiculoId);
    if (!entityFind) {
      return res.status(404).json({
        ok: false,
        data: { message: 'Invalido codigo interno de busqueda' },
      });
    }
    console.log(vehiculoId);
    const entity = { ...req.body };

    const entityUpdated = await vehiculoModel.findByIdAndUpdate(vehiculoId, entity, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      data: entityUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const deleteVehiculo = async (req, res = response) => {
  const vehiculoId = req.params.id;
  if (vehiculoId.length <= 20) {
    return res.status(404).json({
      ok: false,
      data: { message: 'Invalido codigo interno de busqueda' },
    });
  }

  try {
    const entityFind = await vehiculoModel.findById(id);
    if (!entityFind) {
      return res.status(404).json({
        ok: false,
        data: { message: 'Invalido codigo interno de busqueda.' },
      });
    }

    console.log(vehiculoId);
    await vehiculoModel.findByIdAndDelete(vehiculoId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

module.exports = {
  createVehiculo,
  getVehiculo,
  getOneVehiculo,
  getPlacaVehiculo,
  updateVehiculo,
  deleteVehiculo,
};