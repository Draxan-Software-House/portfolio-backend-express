import {fakerEN} from '@faker-js/faker';
import Category from '../../models/Category.js';
import {randomize} from '../../helpers/file.js';

const gadgetRand = [
  "NeuroLink Pro",  "AeroSync Mini", "VoltEdge X2", "LumaPod Air",
  "EchoLite Beam", "NanoView S1", "PulseTrack Fit", "FlexCharge Duo",
  "SpectraCam 360", "GlidePad Neo", "SmartCube Alpha", "HoloBand One",
  "AquaTune Go", "OptiGrip Max", "SonicWear Z", "DataDock Prime",
  "ZenCharge Air", "RoverCam Mini", "CoreSync Hub", "LiteBeam Ultra",
  "OmniPad V3", "TrackEase Clip", "PowerNest Edge", "LumeWatch X",
  "VibePod Air", "EchoGrip Neo", "FlowBand Pro", "PulseLite Mini",
  "SoundSphere One", "AirSnap Fold", "HoloCast Beam", "MagniView Edge",
  "VoltMate Flex", "NanoDock S", "AeroLens Pro", "TimeLink Smart",
  "EchoCharge Go", "LunaTrack Fit", "CoreCam Max", "OptiSound Pulse",
  "RiftPad Lite", "SonicBeam X1", "GlideLens 360", "DataLink Core",
  "NeonCharge S", "AeroCube Prime", "EchoFit Band", "VoltX Portable",
  "PulseWatch Air", "NanoGrip One", "SmartBeam Hub", "CoreCast Ultra",
  "LumeDock Edge", "OmniView Flex", "TrackPad Air", "PowerPod Mini",
  "VibeSound Go", "EchoTag Pro", "FlowCam 360", "PulseTrack Neo",
  "SoundLite Flex", "AirLens Go", "HoloWear Max", "MagniDock Air",
  "VoltPad Neo", "NanoFit Pro", "AeroLink X", "TimeCast S1",
  "EchoDock Edge", "LunaBand One", "CoreSync Air", "OptiView 360",
  "RiftSound Go", "SonicTag Mini", "GlideCam Pro", "DataCharge Hub",
  "NeonPod Flex", "AeroWatch X2", "EchoMate Air", "VoltBeam Edge",
  "PulseSense Neo", "NanoTrack Lite", "SmartDock Core", "CoreView S"
];

// Helper: random item from list
export async function seed(knex) {
  await knex("products").del();
  fakerEN.seed(30);
  const categories = await Category.query();
  if (categories.length === 0) {
    throw new Error("No categories found. Seed categories first.");
  }
  const products = [];
  for (let i = 0; i < 30; i++) {
    const index = randomize(categories.length);
    const cat = categories[index];
    products.push({
      name: gadgetRand[randomize(gadgetRand.length)],
      price: fakerEN.number.int({ min: 10000, max: 999999 }),
      description: fakerEN.lorem.sentence(5),
      stock: fakerEN.number.int({ min: 1, max: 100 }),
      category_id: cat.id
    });
  }
  await knex("products").insert(products);
}