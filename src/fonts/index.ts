import localFont from "next/font/local";

const centuryGothic = localFont({
  src: [
    {
      path: './CenturyRegular.ttf', 
      style: 'normal'
    },
    {
      path: './CenturyItalic.ttf',
      style: 'italic'
    },
    {
      path: './CenturyBold.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: './CenturyBoldItalic.ttf',
      weight: '900',
      style: 'italic'
    }
  ]
})

export {
  centuryGothic
}