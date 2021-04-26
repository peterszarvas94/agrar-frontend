import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
  } from 'react-router-dom';

import './font/fontello.css';
import Fields from './pages/main/Fields';
import Operations from './pages/main/Operations';
import Entries from './pages/main/Entries';
import Operators from './pages/main/Operators';

import FieldFormNew from './pages/forms/FieldFormNew';
import FieldFormEdit from './pages/forms/FieldFormEdit';
import OperationFormNew from './pages/forms/OperationFormNew';
import OperationFormEdit from './pages/forms/OperationFormEdit';
import RecordFormNew from './pages/forms/RecordFormNew';
import RecordFormEdit from './pages/forms/RecordFormEdit';
import CategoryFormNew from './pages/forms/CategoryFormNew';
import CategoryFormEdit from './pages/forms/CategoryFormEdit';
import EntrieFormNew from './pages/forms/EntrieFormNew';
import EntrieFormEdit from './pages/forms/EntrieFormEdit';
import OperatorFormNew from './pages/forms/OperatorFormNew';
import OperatorFormEdit from './pages/forms/OperatorFormEdit';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Fields />
				</Route>

				<Route
					path='/field/new'
					exact
					component={FieldFormNew}
				/>

				<Route
					path='/field/edit'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs földterület kiválaszva</div>
						} else {
							return <FieldFormEdit {...props}/>
						}
					}}
				/>

				<Route
					path='/field/more'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs földterület kiválaszva</div>
						} else {
							return <Operations {...props}/>
						}
					}}
				/>

				<Route
					path='/operation/new'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs föld kiválaszva</div>
						} else {
							return <OperationFormNew {...props}/>
						}
					}}	
				>
				</Route>

				<Route
					path='/operations/edit'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs művelet kiválaszva</div>
						} else {
							return <OperationFormEdit {...props}/>
						}
					}}	
				>
				</Route>

				<Route
					path='/record/new'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs tétel kiválaszva</div>
						} else {
							return <RecordFormNew {...props}/>
						}
					}}
				/>

				<Route
					path='/record/edit'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs tétel kiválasztva</div>
						} else {
							return <RecordFormEdit {...props}/>
						}
					}}
				/>

				<Route
					path='/entries'
					exact
					component={Entries}
				/>

				<Route
					path='/category/new'
					exact
					component={CategoryFormNew}
				/>

				<Route
					path='/category/edit'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs kategória kiválasztva</div>
						} else {
							return <CategoryFormEdit {...props}/>
						}
					}}
				/>

				<Route
					path='/entrie/new'
					exact
					component={EntrieFormNew}
				/>

				<Route
					path='/entrie/edit'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs művelet kiválasztva</div>
						} else {
							return <EntrieFormEdit {...props}/>
						}
					}}
				/>

				<Route
					path='/operators'
					exact
					component={Operators}
				/>

				<Route
					path='/operator/new'
					exact
					component={OperatorFormNew}
				/>

				<Route
					path='/operator/edit'
					exact
					render={(props) => {
						if(props.history.location.state === undefined) {
							return <div>Nincs kezelő kiválasztva</div>
						} else {
							return <OperatorFormEdit {...props}/>
						}
					}}
				/>

				<Redirect to='/' /> 
			</Switch>
		</Router>
	);
}

export default App;
