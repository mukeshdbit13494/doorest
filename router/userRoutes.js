import { mdiAccount, mdiAccountGroup, mdiCards, mdiClipboardFile, mdiTextBoxMultiple, mdiHome } from '@mdi/js';

export const routes = [
	{
		page: 'Home',
		url: '/user',
		icon: mdiHome
	},
	{
		page: 'Service Details',
		url: '/user/services',
		icon: mdiClipboardFile
	},
	{
		page: 'Complaints',
		url: '/user/complaints',
		icon: mdiTextBoxMultiple
	},
	{
		page: 'Feedback',
		url: '/user/feedback',
		icon: mdiCards
	},
	{
		page: 'Privacy',
		url: '/user/privacy',
		icon: mdiAccountGroup
	}
];

export const menuOption = [
	{
		page: 'User Profile',
		url: '/user/profile',
		icon: mdiAccount
	}
];
