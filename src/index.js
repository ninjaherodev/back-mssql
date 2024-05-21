import { app } from './app.js'
import { styleText } from 'node:util'
const port = app.get('port')

app.listen(port, () => {
  console.log(
    styleText(
      ['bgMagenta', 'italic'],
      `Server Running in http://localhost/${port}`
    )
  )
})
