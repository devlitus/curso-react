const { response } = require('express');
const Event = require('../models/Event');

const getEvent = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name')
  res.json({
    ok: true,
    events
  });
}
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventDB = await event.save();
    return res.status(201).json({
      ok: true,
      event: eventDB,
      msg: "El evento se a guardado con éxito"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    })
  }
}
const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const existEvent = await Event.findById(eventId);
    if (!existEvent) {
      return res.status(404).json({
        ok: false,
        msg: "no se encrontro el evento"
      });
    }
    if (existEvent.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes perisos'
      });
    }
    const newEvent = {
      ...req.body,
      user: uid
    }
    const eventUpdate = await Event.findOneAndUpdate(eventId, newEvent, { new: true });
    return res.json({
      ok: true,
      msg: 'Evento actualizado con éxito',
      event: eventUpdate
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    })
  }

}
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const existEvent = await Event.findById(eventId);
    if (!existEvent) {
      return res.status(404).json({
        ok: false,
        msg: "no se encrontro el evento"
      });
    }
    if (existEvent.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes perisos'
      });
    }
    await Event.findOneAndDelete(eventId);
    return res.status(200).json({
      ok: true,
      msg: "Evento eliminado con éxito",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    })
  }
}

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}