const isLive = false

let currentInputId = null

const onInputChange = (event) => {
  event.preventDefault()
  if (event.target.id === currentInputId) return

  currentInputId = event.target.id
  console.log({ event, currentInputId })
}

var dom = document.getElementById("chart-container")
const toggleAxisOne = document.getElementById("toggle-axis-1")
const toggleAxisTwo = document.getElementById("toggle-axis-2")

const serieTogglersRoot = document.getElementById("serie-togglers")

serieTogglersRoot.style.display = "flex"
serieTogglersRoot.style.width = "100%"

const scaleInputsForm = document.getElementById("scale-inputs")

const createLegendSelection = ({ metricsMeta, dataSource, isVisible }) => {
  return Object.fromEntries(
    dataSource.map((d) => [d.metricKey, metricsMeta[d.metricKey].visible])
  )
}

const createDate = (idx) => {
  const d = new Date(1589234400 + idx * 1000 * 60)
  return d
}

const incrementCycle = ({ size, index }) => {
  const newIndex = (index + 1) % size
  return {
    prevIndex: index,
    current: newIndex
  }
}

const createAxis = ({ meta, data, currentChannel, defaults, position }) => {
  return {
    ...defaults,
    id: data.metricKey,
    position,
    name: data.metricKey,
    show: currentChannel === data.metricKey,
    min: meta.min,
    max: meta.max,
    nameRotate: position === "left" ? 90 : 269,
    axisLine: commonYAxisLine,
    nameTextStyle: {
      color: meta.color,
      align: "center"
    }
  }
}

// dom.style.height = "80vh"

var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
  height: 400
})
var app = {}

/**
 * @description make global for debugging
 */
window.chart = myChart

const xAxisIndexesMap = {
  time: 0,
  volume: 1
}

let xAxisIndex = xAxisIndexesMap.time

const showAxis = {
  "0": true,
  "1": true
}

/**
 * @description Common configs
 */
const commonSerieOptions = {
  type: "line",
  animationDurationUpdate: 0,
  animationDuration: 50,
  large: true,
  sampling: "lttb",
  // symbol: false,
  showSymbol: false,
  selectedMode: "single",
  lineStyle: {
    width: 2
  },
  select: {
    lineStyle: {
      width: 4
    }
  },
  silent: false
}

const commonYAxisOptions = {
  axisTick: {
    show: true
  },
  type: "value",
  nameGap: 50,
  axisLabel: {
    fontSize: 12
  },
  splitLine: false,
  nameLocation: "middle",
  triggerEvent: true
}

const commonXAxisOptions = {
  type: "value",
  nameGap: 45,
  // max: 3000,
  // min: 0,
  position: "bottom",
  axisPointer: { snap: false },
  axisTick: {
    show: true,
    inside: true
  },
  nameTextStyle: {
    color: "blue"
    // padding: [15, 0, 0, 0]
  },
  nameLocation: "middle",
  triggerEvent: true,
  boundaryGap: true
}

const commonYAxisLine = {
  show: true, // show the axis line
  symbol: ["none"], // use an arrow at the end of the axis line
  symbolSize: [10, 15], // set the size of the arrow
  // symbolOffset: [0, 10], // set the offset of the arrow
  lineStyle: {
    color: "black", // set the color of the axis line
    width: 1, // set the width of the axis line
    type: "solid" // set the type of the axis line to dashed
  }
}

// STORE:
// Should be normalized to limit collection search operations count

const metricsMeta = {
  ch1: {
    key: "ch1",
    visible: false,
    color: "#1a8eed",
    min: -1500,
    max: 1500,
    index: 0
  },
  ch2: {
    key: "ch2",
    visible: false,
    color: "#7ced1a",
    min: -1500,
    max: 1500,
    index: 1
  },
  ch3: {
    key: "ch3",
    visible: true,
    color: "#efdc4c",
    min: -1500,
    max: 1500,
    index: 2
  },
  ch4: {
    key: "ch4",
    visible: true,
    color: "#c62de5",
    min: -1500,
    max: 1500,
    index: 3
  },
  ch5: {
    key: "ch5",
    visible: true,
    color: "#db7911",
    min: -1500,
    max: 1500,
    index: 4
  }
}

let currentChannel = Object.keys(metricsMeta)[0]

/**
 * @description data for series
 */
const metricsData = [
  {
    metricKey: "ch1",
    data: [
      [0, -1047],
      [100, -1376],
      [200, -1238],
      [300, -1202],
      [400, -1094],
      [500, -1139],
      [600, -1063],
      [700, -1189],
      [800, -1121],
      [900, -1011],
      [1000, -1087],
      [1100, -1146],
      [1200, -1219],
      [1300, -1113],
      [1400, -1058],
      [1500, -1035],
      [1600, -1024],
      [1700, -1092],
      [1800, -1117],
      [1900, -1046],
      [2000, -1074],
      [2100, -1152],
      [2200, -1138],
      [2300, -1089],
      [2400, -1065],
      [2500, -1037],
      [2600, -1018],
      [2700, -1093],
      [2800, -1056],
      [2900, -1021]
    ]
  },
  {
    metricKey: "ch2",
    data: [
      [0, -1317],
      [100, -1256],
      [200, -1289],
      [300, -1334],
      [400, -1298],
      [500, -1273],
      [600, -1237],
      [700, -1212],
      [800, -1186],
      [900, -1151],
      [1000, -1125],
      [1100, -1099],
      [1200, -1074],
      [1300, -1048],
      [1400, -1023],
      [1500, -997],
      [1600, -971],
      [1700, -946],
      [1800, -920],
      [1900, -895],
      [2000, -869],
      [2100, -843],
      [2200, -818],
      [2300, -792],
      [2400, -767],
      [2500, -741],
      [2600, -715],
      [2700, -690],
      [2800, -664],
      [2900, -639]
    ]
  },
  {
    metricKey: "ch3",
    data: [
      [0, -1499],
      [100, -1474],
      [200, -1448],
      [300, -1423],
      [400, -1397],
      [500, -1372],
      [600, -1346],
      [700, -1321],
      [800, -1295],
      [900, -1270],
      [1000, -1244],
      [1100, -1219],
      [1200, -1193],
      [1300, -1168],
      [1400, -1142],
      [1500, -1117],
      [1600, -1091],
      [1700, -1066],
      [1800, -1040],
      [1900, -1015],
      [2000, -989],
      [2100, -964],
      [2200, -938],
      [2300, -913],
      [2400, -887],
      [2500, -862],
      [2600, -836],
      [2700, -811],
      [2800, -785],
      [2900, -760]
    ]
  },
  {
    metricKey: "ch4",
    data: [
      [0, -1432],
      [100, -1407],
      [200, 581],
      [300, 356],
      [400, 330],
      [500, -305],
      [600, 279],
      [700, 254],
      [800, -228],
      [900, 1203],
      [1000, 177],
      [1100, -1152],
      [1200, -1126],
      [1300, -1101],
      [1400, -1075],
      [1500, -1050],
      [1600, -1024],
      [1700, -999],
      [1800, 73],
      [1900, -48],
      [2000, -22],
      [2100, -97],
      [2200, -871],
      [2300, -846],
      [2400, -820],
      [2500, -795],
      [2600, 69],
      [2700, -744],
      [2800, -718],
      [2900, -693]
    ]
  },
  {
    metricKey: "ch5",
    data: [
      [0, 47],
      [100, 376],
      [200, 238],
      [300, 502],
      [400, -10],
      [500, -39],
      [600, 63],
      [700, 189],
      [800, 121],
      [900, -11],
      [1000, 287],
      [1100, 346],
      [1200, 519],
      [1300, 113],
      [1400, -1058],
      [1500, -1035],
      [1600, -1024],
      [1700, -1092],
      [1800, -17],
      [1900, -446],
      [2000, -1074],
      [2100, -152],
      [2200, -138],
      [2300, -89],
      [2400, -65],
      [2500, -437],
      [2600, -218],
      [2700, -393],
      [2800, 156],
      [2900, -1021]
    ]
  }
]

const dataForTimeSeries = metricsData.map((d) => {
  return {
    ...d,
    yAxisIndex: metricsMeta[d.metricKey].index,
    name: d.metricKey,
    data: d.data.map((p) => [p[0], createDate(p[0]), p[1]])
  }
})

// =====================================================

var option

/**
 * @description options setup
 */
option = {
  animation: isLive,
  title: {
    text: "Line chart"
  },
  tooltip: {
    trigger: "axis",
    formatter: (params) => {
      // console.log("Formatter params:", params)
      return params
        .map((p) => {
          const createColorSquare = (text) => `
          <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 16px; height: 16px; border-radius: 3px; background-color: ${p.color};"></div>
              <span> ${text}</span>
          </div>

          `
          return createColorSquare(
            `<strong>${p.name} - ${p.seriesName}:</strong> ${p.value[1]}`
          )
        })
        .join("")
    }
  },
  legend: {
    show: false,
    /**
     * @description
     * hide series for the x-volume.
     * used to display only specific x-axis series
     * If x-axis for "time" then show only series with "time" values
     * If x-axis for "volume" then show only series with "volume" values
     */
    selected: createLegendSelection({
      metricsMeta,
      dataSource: metricsData
    })
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "8%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: [
    {
      ...commonXAxisOptions,
      type: "time",
      id: "time",
      show: xAxisIndex === 0,
      name: "time (ms)",
      axisLabel: {
        formatter: "{d}-{M}-{yyyy} {HH}:{ss}"
      }
      // min: Date.now() - 1000 * 3600 * 2
    },
    {
      ...commonXAxisOptions,
      type: "value",
      id: "volume",
      show: xAxisIndex === 1,
      name: "volume (ml)"
    }
  ],
  yAxis: metricsData.map((md) => {
    return createAxis({
      position: "left",
      meta: metricsMeta[md.metricKey],
      data: md,
      currentChannel,
      defaults: commonYAxisOptions
    })
  }),
  // yAxis: {},
  series: [
    ...dataForTimeSeries.map(({ metricKey, ...item }) => ({
      ...item,
      ...commonSerieOptions,
      lineStyle: {
        ...commonSerieOptions.lineStyle,
        color: metricsMeta[metricKey].color
      },
      id: metricKey,
      dimensions: ["volume", "time", "value"],
      encode: {
        x: "time",
        y: "value"
      }
    }))
  ]
}

/**
 * ============ Set event handlers: =============
 */

/**
 * @description yAxis name click
 */
myChart.on("click", (params) => {
  if (!(params.componentType === "yAxis" && params.targetType === "axisName"))
    return

  const { current: yAxisIndexRes } = incrementCycle({
    size: metricsData.length,
    index: metricsMeta[currentChannel].index
  })

  currentChannel = metricsData[yAxisIndexRes].metricKey

  const nextAxis = option.yAxis[yAxisIndexRes]

  // console.log({ params, yAxisIndexRes, currentChannel })

  const oldOpts = myChart.getOption()

  const o = {
    yAxis: oldOpts.yAxis.map((a) => ({
      id: a.id,
      show: a.id === nextAxis.id
    }))
  }
  myChart.setOption(o)
})

/**
 * @description xAxis name click
 */
myChart.on("click", (params) => {
  if (!(params.componentType === "xAxis" && params.targetType === "axisName"))
    return

  const { current: xAxisIndexRes } = incrementCycle({
    size: option.xAxis.length,
    index: params.xAxisIndex
  })

  const oldOpts = myChart.getOption()

  xAxisIndex = xAxisIndexRes

  const nextAxis = option.xAxis[xAxisIndexRes]

  /**
   * @description toggle visibility between previous and next axis
   */
  const o = {
    series: oldOpts.series.map((s) => ({
      id: s.id,
      encode: { x: nextAxis.id === "time" ? "time" : "volume" },
      xAxisIndex: xAxisIndexRes
    })),
    xAxis: option.xAxis.map((xa) => ({
      id: xa.id,
      show: xa.id === nextAxis.id
    }))
  }
  myChart.setOption(o)
})

const serieTogglers = Object.values(metricsMeta).map((m) => {
  const toggleMetricBtn = document.createElement("button")
  toggleMetricBtn.textContent = `Toggle ${m.key}${
    !m.visible ? " :(initially hidden)" : ""
  }`
  toggleMetricBtn.style.backgroundColor = `black`
  toggleMetricBtn.style.paddingBlock = `4px`
  toggleMetricBtn.style.paddingInline = `8px`
  toggleMetricBtn.style.color = m.color

  toggleMetricBtn.addEventListener("click", function () {
    myChart.dispatchAction({
      type: "legendToggleSelect",
      name: m.key
    })
  })

  return toggleMetricBtn
})

/**
 * @description yAxis toggle buttons
 */
;[toggleAxisOne, toggleAxisTwo].forEach((btn) => {
  btn.onclick = (event) => {
    const yAxisList = option.yAxis.slice()

    const index = event.target.dataset.id
    showAxis[index] = !showAxis[index]

    const o = {
      yAxis: [
        {
          ...yAxisList[index],
          show: showAxis[index]
        }
      ]
    }
    myChart.setOption(o)
  }
})

/**
 * @description Set current chart line width to bigger on click
 */
myChart.on("click", function (params) {
  // console.log(params)
  let udpatedSeries = null
  const _o = myChart.getOption()

  if (!(params.seriesType === "line")) {
    return
  }

  if (!(params.componentType === "series")) {
    udpatedSeries = _o.series.map((s, idx) => {
      return { ...s, lineStyle: { ...s.lineStyle, width: 2 } }
    })
  } else {
    udpatedSeries = _o.series.map((s, idx) => {
      if (params.seriesIndex === idx)
        return { ...s, lineStyle: { ...s.lineStyle, width: 4 } }
      return { ...s, lineStyle: { ...s.lineStyle, width: 2 } }
    })
  }

  myChart.setOption({
    series: udpatedSeries
  })

  myChart.dispatchAction({
    type: "select",
    seriesName: params.seriesName
  })
})

const scaleInputs = Object.values(metricsMeta).map((m) => {
  const inputMin = document.createElement("input")
  const inputMax = document.createElement("input")
  const inputsRow = document.createElement("div")

  const setupInput = ({ input, container, value, name, id }) => {
    const label = document.createElement("label")
    input.type = "number"
    input.value = value
    input.id = id
    input.name = name
    input.style.width = "50px"
    input.addEventListener("change", onInputChange, false)

    label.textContent = name.split("/").join(" / ")
    label.style.color = m.color
    label.style.backgroundColor = "black"
    label.append(input)

    container.append(label)
  }

  ;[
    {
      id: `${m.key}/min`,
      input: inputMin,
      container: inputsRow,
      value: m.min,
      name: `${m.key}/min`
    },
    {
      id: `${m.key}/max`,
      input: inputMax,
      container: inputsRow,
      value: m.max,
      name: `${m.key}/max`
    }
  ].forEach(setupInput)

  return inputsRow
})

/**
 * @description Init:
 */
serieTogglersRoot.append(...serieTogglers)
scaleInputsForm.append(...scaleInputs)

scaleInputsForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const [metricKey, prop] = currentInputId.split("/")

  const newData = {
    [prop]: Number(formData.get(currentInputId))
  }
  const yAxisList = myChart.getOption().yAxis

  const o = {
    yAxis: yAxisList.map((a) => {
      if (a.id !== metricKey) return a

      return {
        id: a.id,
        ...newData
      }
    })
  }

  myChart.setOption(o)

  const newOption = myChart.getOption()
  console.log({
    currentInputId,
    newData,
    o,
    series: newOption.series,
    yAxis: newOption.yAxis
  })
})

if (option && typeof option === "object") {
  myChart.setOption(option)
}

window.addEventListener("resize", myChart.resize)
