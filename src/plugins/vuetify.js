// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const customTheme = {
    dark: false,
    fontFamily: 'Sofia Sans Condensed',
    colors: {
        background: '#173b61',
        surface: '#0b2744',
        primary: '#0C99E3',
    }
}
export default createVuetify({
        theme: {
            defaultTheme: 'customTheme',
            themes: {
                customTheme,
            }
        }
    }
)
