// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const customTheme = {
    dark: false,
    colors: {
        background: '#121212',
        surface: '#212121',
        primary: '#0C99E3',
    }
}
export default createVuetify({
        // theme: {
        //     defaultTheme: 'dark'
        // },
        theme: {
            defaultTheme: 'customTheme',
            themes: {
                customTheme,
            }
        }
    }
)
