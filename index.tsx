import React from "react"
import { grid } from "@tscircuit/math-utils"
import { Key } from "@tsci/Heinrich-XIAO.Key"
import { XiaoReceiver } from "@tscircuit/common@0.0.27"

export default () => {
  const rows = 3
  const cols = 5
  const spacing = 19.05

  const cells = grid({
    rows,
    cols,
    xSpacing: spacing,
    ySpacing: spacing,
    centered: true,
    offsetX: 0,
    offsetY: 19.05,
  })

  const colNets = Array.from({ length: cols }, (_, i) => `COL${i}`)
  const rowNets = Array.from({ length: rows }, (_, i) => `ROW${i}`)

  return (
    <board height={`100mm`} width={100}>
      <XiaoReceiver name="U1" pcbRotation={90} pcbX={-39.5} pcbY={-20}/>
      <trace from=".U1 > .pin11" to="net.ROW0" />
      <trace from=".U1 > .pin10" to="net.ROW1" />
      <trace from=".U1 > .pin9" to="net.ROW2" />
      <trace from=".U1 > .pin8" to="net.ROW3" />
      <trace from=".U1 > .pin7" to="net.ROW4" />

      <trace from=".U1 > .pin2" to="net.COL0" />
      <trace from=".U1 > .pin3" to="net.COL1" />
      <trace from=".U1 > .pin4" to="net.COL2" />
      <trace from=".U1 > .pin5" to="net.COL3" />
      <trace from=".U1 > .pin6" to="net.COL4" />
      {colNets.map((n) => (
        <net key={n} name={n} />
      ))}
      {rowNets.map((n) => (
        <net key={n} name={n} />
      ))}

      {cells.map((cell) => {
        const r = cell.row
        const c = cell.col
        const name = `S_R${r}C${c}`
        const colNet = `COL${c}`
        const rowNet = `ROW${r}`

        return (
          <>
            <Key
              key={name}
              name={name}
              schX={cell.center.x}
              schY={cell.center.y}
              pcbX={cell.center.x}
              pcbY={cell.center.y}
              connections={{
                pin1: `net.ROW${r}`,
                pin2: `net.D_${r}_${c}_IN`,
              }}
            />
            <diode
              key={`D_${r}_${c}`}
              name={`D_${r}_${c}`}
              connections={{
                anode: `net.D_${r}_${c}_IN`,
                cathode: `net.COL${c}`,
              }}
              footprint="axial_p0.2in"
              schX={cell.center.x}
              schY={cell.center.y}
              pcbX={cell.center.x}
              pcbY={cell.center.y+9}
            />
          </>
        )
      })}
    </board>
  )
}
