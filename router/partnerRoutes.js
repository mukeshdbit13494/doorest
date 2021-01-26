import { mdiAccount, mdiAccountGroup, mdiCards, mdiClipboardFile, mdiHome, mdiTextBoxMultiple } from '@mdi/js';

export const routes = [
	{
		page: 'Home',
		url: '/partner',
		icon: mdiHome
	},
	{
		page: 'Leads',
		url: '/partner/leads',
		icon: mdiClipboardFile
	},
	{
		page: 'Complaints',
		url: '/partner/complaints',
		icon: mdiTextBoxMultiple
	},
	{
		page: 'Feedback',
		url: '/partner/feedback',
		icon: mdiCards
	},
	{
		page: 'Privacy',
		url: '/partner/privacy',
		icon: mdiAccountGroup
	}
];

export const menuOption = [
	{
		page: 'Profile',
		url: '/partner/profile',
		icon: mdiAccount
	}
];
