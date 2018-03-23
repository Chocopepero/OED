/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { connect } from 'react-redux';
import * as _ from 'lodash';
import AdminComponent from '../components/AdminComponent';
import {
	updateDisplayTitle,
	updateDefaultChartToRender,
	toggleDefaultBarStacking,
	updateDefaultLanguage,
	submitPreferencesIfNeeded,
	updateSelectedMeter } from '../actions/admin';
import { Dispatch } from '../types/redux/actions';
import { State } from '../types/redux/state';
import { ChartTypes } from '../types/redux/graph';
import { LanguageTypes } from '../types/i18n';

function mapStateToProps(state: State) {
	let selectedMeter;
	if (state.admin.selectedMeter === null) {
		selectedMeter = null;
	} else {
		selectedMeter = { value: state.admin.selectedMeter, label: state.meters.byMeterID[state.admin.selectedMeter].name };
	}
	return {
		displayTitle: state.admin.displayTitle,
		defaultChartToRender: state.admin.defaultChartToRender,
		defaultBarStacking: state.admin.defaultBarStacking,
		defaultLanguage: state.admin.defaultLanguage,
		disableSubmitPreferences: state.admin.submitted,
		meters: _.sortBy(_.values(state.meters.byMeterID).map(meter => ({ value: meter.id, label: meter.name.trim() })), 'name'),
		selectedImportMeter: selectedMeter
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return {
		updateSelectedImportMeter: (meterID: number) => dispatch(updateSelectedMeter(meterID)),
		updateDisplayTitle: (displayTitle: string) => dispatch(updateDisplayTitle(displayTitle)),
		updateDefaultChartType: (defaultChartToRender: ChartTypes) => dispatch(updateDefaultChartToRender(defaultChartToRender)),
		updateDefaultLanguage: (defaultLangage: LanguageTypes) => dispatch(updateDefaultLanguage(defaultLangage)),
		toggleDefaultBarStacking: () => dispatch(toggleDefaultBarStacking()),
		submitPreferences: () => dispatch(submitPreferencesIfNeeded())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
