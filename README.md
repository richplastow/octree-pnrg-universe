# octree-pnrg-universe

**JavaScript and Rust library for building procedural, deterministic, multi-scale 3D worlds**

- Version: 0.0.1
- Created: 29th October 2025 by Rich Plastow
- Updated: 2nd November 2025 by Rich Plastow
- GitHub: <https://github.com/richplastow/octree-pnrg-universe>
- Live demo: <https://richplastow.com/octree-pnrg-universe/>

## What is it?

octree-pnrg-universe contains JavaScript and Rust utilities for procedurally
generating 3D worlds. It includes:

- **An octree data structure:**
  for rendering, collision detection and spatial queries
- **A reversible procedural random number generator (PRNG):**
  for deterministic content generation
- **A 'procedural plugin' system:**
  for defining how content is generated at different levels of detail and locations
- **Persistent storage support:**
  for setting and retrieving custom data at specific octree nodes ('octants')
- **WGSL shader examples:**
  which demonstrate how to render the generated worlds in the browser, using WebGPU
- **Multi-octree variants:**
  for creating more complex and varied environments, or for spanning even larger
  scale-ranges

The octree goes 40 levels deep, allowing your 3D world to be explored at a wide
range of scales. Here's some examples to give you an idea of possible scale ranges:

- Proton **(~1 fm)** → pinhead **(~1 mm)**
- Atomic nucleus (~5 fm) → pea (~5 mm)
- Hydrogen atom (~0.1 nm) → city block (~100 m)
- DNA double helix diameter (~2 nm) → long bridge span (~2 km)
- Transistor gate (~5 nm) → small city (~5 km)
- Virus (~100 nm) → edge of space altitude (~100 km)
- Bacterium (~1 µm) → country width (~1000 km)
- Large human cell (~13 µm) → Earth's diameter (~13,000 km)
- Human hair thickness (~80 µm) → Jupiter's radius (~80,000 km)
- Fine sand grain (~0.4 mm) → Earth–Moon distance (~385,000 km)
- Pinhead **(~1 mm)** → Sun's diameter **(~1.4 million km)**
- Tomato (~5 cm) → half Earth–Sun distance (~0.5 AU)
- Football (~22 cm) → near Mars's orbit (~1.6 AU)
- Person (~1.7 m) → between Saturn and Uranus (~13 AU)
- House (~10 m) → outer Kuiper Belt region (~73 AU)
- City block (~100 m) → far-edge of the Solar System, before the Oort Cloud (~735 AU)
- City (~10 km) → interstellar scale (~1 light-years)
- Country width (~1000 km) → local-neighbourhood scale (~100 light-years)
- Earth–Moon distance (~385,000 km) → dwarf-galaxy size (~40,000 light-years)
- **Sun's diameter (~1.4 million km)** → Milky-Way-sized galaxy **(~160,000 light-years)**
- Neptune's orbit radius (~30 AU) → Galaxy supercluster diameter (~160 Mpc)
- Inner Oort-cloud distance (~5000 AU) → Observable universe (~28,500 Mpc)
