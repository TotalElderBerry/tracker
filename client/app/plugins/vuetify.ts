import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg' 

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: "#735187",
                    "on-primary": "#ffffff",
                    secondary: "#c981e6",
                    "on-secondary": "#ffffff",
                    "surface": "#fff7fc",
                    "on-surface": "#1e1a20",
                    "background": "#fff7fc",
                    "on-background": "#1e1a20",
                    "on-error": "#ffffff",
                    "error": "#ba1a1a"
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: "#e1b8f5",
                    "on-primary": "#422255",
                    secondary: "#f1bcffff",
                    "on-secondary": "#382c3e",
                    "surface": "#161217",
                    "on-surface": "#f8e5f4ff",
                    "background": "#161217",
                    "on-background": "#e9e0e7",
                    "on-error": "#690005",
                    "error": "#ffb4ab",
                }
            }
        },
    }
  })
  
  app.vueApp.use(vuetify)
})