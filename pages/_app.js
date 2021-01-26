import { createMuiTheme, NoSsr, ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AuthProvider } from '../auth/useAuth';
import mainReducer from '../store/reducers/mainReducer';
import '../styles/globals.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#773aaf', //Blue (Header Color)
			light: '#f6f0e2', //Light Grey
			background: '#AE0000', // Red(Mehroon)
			grey: '#656565' //Grey,
		},
		secondary: {
			main: '#EAD373', //Yellow
			// white: "#ffffff",  //White
			light: '#14A884', //Teal
			grey: '#a9a9a9' //Grey
		}
	},
	typography: {
		h1: {
			fontFamily: '"Hind Madurai"',
			fontWeight: 500,
			fontSize: 24
		},
		body2: {
			fontFamily: 'ABeeZee',
			fontSize: 16
		},
		subtitle1: {
			fontFamily: '"Hind Madurai"',
			fontWeight: 300
		}
	}
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(mainReducer, composedEnhancer);

function MyApp({ Component, pageProps }) {
	return (
		<NoSsr>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<Provider store={store}>
						<Component {...pageProps} />
					</Provider>
				</AuthProvider>
			</ThemeProvider>
		</NoSsr>
	);
}

export default MyApp;
